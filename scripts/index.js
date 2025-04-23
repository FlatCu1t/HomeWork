import { Functions } from "./functions.js";
const functions = new Functions();

import { array } from "./data.js";

const categorySelect = document.getElementById('categorySelect');
const subcategorySelect = document.getElementById('subcategorySelect');
const minPriceInput = document.getElementById('minPriceInput');
const maxPriceInput = document.getElementById('maxPriceInput');
const searchBtn = document.querySelector('.firstSection_searchBtn');
const flexContainer = document.querySelector('.items_container');
const section = document.querySelector('.secondSection');
const categoryText = section.querySelector('h2');

const uniqueCategories = [...new Set(array.map(item => item.category))];
uniqueCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.append(opt);
});

categorySelect.addEventListener('change', () => {
    const selCat = categorySelect.value;
    subcategorySelect.innerHTML = '';

    if (!selCat) {
        subcategorySelect.disabled = true;
        subcategorySelect.innerHTML = '<option value="">— сначала выберите категорию —</option>';
        return;
    }

    const optAll = document.createElement('option');
    optAll.value = '';                    
    optAll.textContent = '— все подкатегории —';
    subcategorySelect.append(optAll);

    const subs = [...new Set(array.filter(item => item.category === selCat).map(item => item.subcategory))];

    subs.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub;
        opt.textContent = sub;
        subcategorySelect.append(opt);
    });

    subcategorySelect.disabled = false;
});

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const minP = parseInt(minPriceInput.value, 10) || 0;
        const maxP = parseInt(maxPriceInput.value, 10) || 9999999;
        const selCat = categorySelect.value;
        const selSub = subcategorySelect.value;

        flexContainer.innerHTML = '';
        let count = 0;

        array.forEach(el => {
            if (selCat && el.category !== selCat) return;
            if (selSub && el.subcategory !== selSub) return;

            if (el.price < minP || el.price > maxP) return;

            const itemDiv = document.createElement('div');
            const itemImgSection = document.createElement('div');
            const itemNameP = document.createElement('p');
            const itemPriceP = document.createElement('p');

            itemDiv.classList.add('item');
            itemImgSection.classList.add('imgSection');
            itemImgSection.style.backgroundImage = 'url(/images/sofa.png)';

            itemNameP.textContent  = el.name;
            itemPriceP.classList.add('priceText');
            itemPriceP.textContent = `(${functions.utils.ssp(el.price)}$)`;

            itemDiv.append(itemImgSection, itemNameP, itemPriceP);
            flexContainer.append(itemDiv);
            count++;
        });

        categoryText.textContent = `Category (${count})`;
        const containerHeight = flexContainer.offsetHeight;
        section.style.height   = `${containerHeight + 100}px`;
    });
}