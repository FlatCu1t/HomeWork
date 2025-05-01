import { Functions } from "./functions.js";
const functions = new Functions();

$('#toggle').on('click', function() {
    $('#sidebar').toggleClass('collapsed');

    const isCollapsed = $('#sidebar').hasClass('collapsed');
    $('#toggle .arrow').html(isCollapsed ? '&gt;' : '&lt;');
});