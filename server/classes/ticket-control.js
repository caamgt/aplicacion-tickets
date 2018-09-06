const fs = require('fs');

// Manejar los tickets pendientes, creamos la clase Ticket
// Esta clase no la exportamos, ya que solo la utilizaremos en este archivo.
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {
    // Toda clase tiene que llevar un constructor.
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        // Este arreglo tendra todos los tickets pendientes.
        this.tickets = [];
        // Ultimos 4 tickets
        this.ultimos4 = [];

        // Para leer datos de un archivo json.
        // Aqui ya tenemos el objeto data.
        let data = require('../data/data.json');

        // Para empezar cada dia en 0 tickets.
        // Si en el sistema de ticket es hoy y en archivo json es hoy, para continuar con la cola de tickets.
        // Si son diferntes fecha, reiniciar todo para empezar de cero.
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            // Si estamos en el mismo dia de hoy this.tickets es igual a lo que este en la data.tickets
            this.tickets = data.tickets;
            // Ultimos 4 tickets.
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        // Incrementar en 1 el ultimo ticket.
        this.ultimo += 1;

        // Creamos una nueva instancia de un nuevo ticket.
        // 'null', ya que no lo estan atendiendo en ningun escritotio.
        let ticket = new Ticket(this.ultimo, null);
        // Agregamos el nuevo ticket al arreglo.
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        // retornamos el ultimo ticket.
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        // retornamos el ultimo ticket.
        return this.ultimos4;
    }

    // Argumento 'escritorio' es quien atendera el ticket.
    atenderTicket(escritorio) {
        // Si no hay tickets pendientes, no se hace nada.
        if (this.tickets.length === 0) {
            return 'No hay tikets por atender';
        }
        // tomar el primer ticket que esta enpendiente.
        // Tomamos la primera posicion y tomaos solo el numero.
        let numeroTicket = this.tickets[0].numero;
        // Ya que tengo el primero ticket del arreglo, lo borramos de este.
        this.tickets.shift();

        // Nueva instancia de un nuevo ticket, el cual se atendera.
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // Ponemos este ticket al inicio del arreglo.
        this.ultimos4.unshift(atenderTicket);

        // Cuando el arreglo tenga mas de 4 tickets.
        if (this.ultimos4.length > 4) {
            // Borrar el ultimo elemento del arreglo.
            this.ultimos4.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);

        // grabamos el archivo json.
        this.grabarArchivo();

        // Retorna el ticket a atender.
        return atenderTicket;
    }

    reiniciarConteo() {
        // Para el arreglo.
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    // Funcion dedicada a grabar en el archivo.
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            // Grabar todo el arreglo de tickets pendientes.
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        // Lo mandamos como un string.
        let jsonDataString = JSON.stringify(jsonData);
        // Lo grabamos en el archivo.
        // writeFileSync para que lograbe de forma asincrona.
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}


module.exports = {
    TicketControl,
}