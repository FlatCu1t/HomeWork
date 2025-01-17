document.querySelector('.HoverMe').addEventListener('click', function (event) {
  const tooltip = document.querySelector('.HoverMe_tooltip');
  tooltip.style.display = tooltip.style.display === 'flex' ? 'none' : 'flex';
});