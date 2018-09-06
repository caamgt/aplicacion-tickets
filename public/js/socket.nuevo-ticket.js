// Comando para establecer la conexion.
var socket = io();

// Hacemos referencia directa al span donde ingresaremos el numero de ticket en la pagina "nuevo ticket.html"
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos la conexion con el servidor');
});


// Mostrar el ticket actual en pantalla.
socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});

$('button').on('click', function() {
    // La funcion siguienteTicket es para mostrar en pantalla el siguiente ticket. pagina "nuevo-ticket"
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});