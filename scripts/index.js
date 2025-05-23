import { Functions } from "./functions.js";
const functions = new Functions();

import { getUserInfo } from './userInfo.js';
import { add, subtract, multiply, divide } from './baseOperations.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = getUserInfo();
  document.getElementById('user-info').textContent = JSON.stringify(user, null, 2);

  const form = document.getElementById('calc-form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const op = document.getElementById('op').value;

    let result;
    try {
      switch (op) {
        case 'add':
          result = add(a, b);
          break;
        case 'subtract':
          result = subtract(a, b);
          break;
        case 'multiply':
          result = multiply(a, b);
          break;
        case 'divide':
          result = divide(a, b);
          break;
        default:
          throw new Error('Неизвестная операция');
      }
      document.getElementById('result').textContent = result;
    } catch (err) {
      document.getElementById('result').textContent = 'Ошибка: ' + err.message;
    }
  });
});