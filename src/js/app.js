var UI = require('ui');
var vibrar = require('ui/vibe');
var ajax = require('ajax');
var url = "http://api.citybik.es/ecobici.json";
var Vector2 = require('vector2');

var apibiciResponse;
var ajaxResponseReceived = false;

var main = new UI.Card({
    title: 'Ecobici DF',
    subtitle: 'Panuco',
    body: 'Loading ...',
    scrollable: true
});

var wind = new UI.Window();

var windTitulo = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    font: 'gothic-18',
    text: ''
});

//navigator.geolocation.getCurrentPosition(function(pos) {
//  var Longitud = pos.coords.longitude;
//  var Latitud = pos.coords.latitude;
//});

function getStations(idx) {
    ajaxResponseReceived = false;
    apibiciResponse = null;

    ajax({
            url: url,
            type: 'json',
        },
        function(data) {
            vibrar.vibrate('short');
            console.log('Data recibida.');

            var bicisDisponibles = (data[idx].bikes);
            var nombreEstacion = (data[idx].name);
            //nombreEstacion = nombreEstacion.substr(0);
            var tiempoRefresco = (data[idx].timestamp);
            var aparcamientoLibre = (data[idx].free);
            var bicisLat = (data[idx].lat);
            var bicisLon = (data[idx].lng);

            var split = tiempoRefresco.split('T');
            //var Fecha = split[0];
            var Hora = split[1];
            var horaHoras = Hora.substr(0, 2);
            var horaMinseg = Hora.substr(2, 6);

            function zeroPad(num, places) {
                var zero = places - num.toString().length + 1;
                return Array(+(zero > 0 && zero)).join("0") + num;
            }
            horaHoras = zeroPad(horaHoras - 6, 2);
            wind.add(windTitulo);
            //windTitulo.text("Ecobici DF\n\n#" +numeroEstacion + ": " + nombreEstacion + "\nBicicletas: " + bicisDisponibles + "\nLugares: " + aparcamientoLibre + "\n\nHora: " + horaHoras + "" + horaMinseg);
            windTitulo.text("#" + nombreEstacion + "\nBicicletas: " + bicisDisponibles + "\nLugares: " + aparcamientoLibre + "\n\n" + bicisLat + "\n" + bicisLon + "\n\nHora: " + horaHoras + "" + horaMinseg);
            //main.title("Estacion " + numeroEstacion);
            //main.subtitle(nombreEstacion);
            //main.body(aparcamientoLibre + " lugares libres\n" + bicisDisponibles + " bicis disponibles\n" + "Hora: " + horaHoras + "" + horaMinseg);
        },
        function(err) {
            console.log("AJAX Error: " + err);
            main.body("Error obteniendo datos.");
        }
    );
}
//main.show();
wind.show();
getStations(422);

wind.on('click', 'up', function(e) {
    vibrar.vibrate('short'); getStations(411);
    //var items = Array(411); var random = items[Math.floor(Math.random()*items.length)]; getStations(random);
});

wind.on('click', 'select', function(e) {
    vibrar.vibrate('short'); getStations(422);
});

wind.on('click', 'down', function(e) {
    vibrar.vibrate('short'); getStations(421);
    //var items = Array(422); var random = items[Math.floor(Math.random()*items.length)]; getStations(random);
});