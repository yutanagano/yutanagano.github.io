const clickMe = document.getElementById('peekaboo');
const goodLuck = document.getElementById('surprise');

clickMe.addEventListener('click', event => {
    clickMe.style.background = 'url("/resources/images/penguin.jpg")';
    clickMe.style.backgroundSize = 'cover';
    clickMe.style.backgroundPosition = 'center';
    clickMe.style.color = 'black';
    clickMe.innerHTML = '';
    goodLuck.style.opacity = '1';
});