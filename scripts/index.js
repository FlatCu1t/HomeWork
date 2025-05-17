import { Functions } from "./functions.js";
const functions = new Functions();

$(document).ready(function() {
  $('#phone').inputmask('+998 99 999-99-99');

  $('#registrationForm').on('submit', function(e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const phoneEl = $('#phone');
    const phoneComplete = $('#phone').inputmask("isComplete");
    const password = $('#password').val().trim();
    const errors = [];

    if (!name) {
      errors.push('Поле "Имя" не заполнено.');
    }
    
    if (!phoneComplete) {
      errors.push('Телефон введен неверно.');
    }

    if (!password) {
      errors.push('Поле "Пароль" не заполнено.');
    }

    if (errors.length) {
      errors.forEach(function(msg) {
        toastr.error(msg, 'Ошибка');
      });
    } else {
      toastr.success('Успешная регистрация!', 'OK');
    }
  });
});