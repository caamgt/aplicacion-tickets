const { io } = require('../server');
// Importamos la clase
const { TicketControl } = require('../classes/ticket-control.js');

// Declaremos una nueva instancia del TicketControl.
// Con esto =, disparamos el constructor de la clase TicketControl.
const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        // Para mostrar el ticket siguiente en la pagina "nuevo-ticket.html"
        callback(siguiente);
    });

    // Emitir un evento llamado 'estadoActual' 

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // 'data' repsenta el escirtrio o si quiero enviar algo mas y el 'callback' es para notificar.
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'

            });
        }
        // El escritorio esta dentro de 'data'.
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        // En este punto, ya se que hay un escritorio atendiendo este ticket.
        callback(atenderTicket);

        // Actualizar/ Notificar cambios en los ULTIMOS 4.

        // Esto ayudara para emitir a todos los escritorios los cambios.
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4(),
        });

    });


});