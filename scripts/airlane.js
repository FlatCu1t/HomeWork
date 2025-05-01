import { Functions } from "./functions.js";
const functions = new Functions();

const tickets = [];

$('#searchBtn').on('click', function() {
    alert('Здесь могла бы быть логика поиска доступных мест');
});

$('#bookBtn').on('click', function() {
    const direction = $('#direction').val();
    const date = $('#tripDate').val();
    let seats = [];

    if (!date) {
        alert('Пожалуйста, выберите дату.');
        return;
    }

    const $checkedSeats = $('.seat:checked');
        if ($checkedSeats.length === 0) {
        alert('Выберите хотя бы одно место.');
        return;
    }

    $checkedSeats.each(function() {
        const seatNum = $(this).val();
        seats.push(seatNum);
    });

    const ticket = {
        direction: direction,
        date: date,
        seat: seats
    };

    tickets.push(ticket);

    $('#ticketsTable tbody').append(
        `<tr>
            <td>${ticket.direction}</td>
            <td>${ticket.date}</td>
            <td>${ticket.seat}</td>
        </tr>`
    );

    $(this).prop('checked', false);
});