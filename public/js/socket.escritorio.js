// Comando para establecer la conexion.
var socket = io();

// Para capturar lo que venga en el url.
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    // El throw funciona muy Similar a return, si falla, no sigue.
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
// Referencia directa =, ya que la utilizaremos varias veces.
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

// Creamos el listener del boton.

$('button').on('click', function() {
    // Sintacticamente igual a atenderTicket del archivo socket.js en client.on('atenderTicket', (data, callback).
    // Funcion que va a recibir la respuesta.
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tikets por atender') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});