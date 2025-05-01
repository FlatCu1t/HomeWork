import { Functions } from "./functions.js";
const functions = new Functions();

const generateBtn = $("#generateBtn");

const charSets = {
    digits: '0123456789',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz'
};

if (generateBtn) {
    generateBtn.on("click", function() {
        let length = parseInt($('#charLength').val(), 10);

        if (isNaN(length) || length < 1) {
            alert('Пожалуйста, введите корректную длину (число ≥ 1).');
            return;
        }

        let availableChars = '';
        if ($('#digits').is(':checked')) {
          availableChars += charSets.digits;
        }
        if ($('#upper').is(':checked')) {
          availableChars += charSets.upper;
        }
        if ($('#lower').is(':checked')) {
          availableChars += charSets.lower;
        }

        if (availableChars.length === 0) {
          alert('Пожалуйста, выберите хотя бы один тип символов.');
          return;
        }

        let result = '';
        for (let i = 0; i < length; i++) {
          let idx = Math.floor(Math.random() * availableChars.length);
          result += availableChars[idx];
        }

        $('#result').val(result);
    });
};