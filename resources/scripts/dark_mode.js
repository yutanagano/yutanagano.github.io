// Simple script to toggle dark mode on the webstie

const root = document.documentElement;
const logo = document.getElementById('logo').children[0];

function enableDarkMode() {
    root.style.setProperty('--bg-color', '#454545');
    root.style.setProperty('--content-color', 'white');

    root.style.setProperty('--g-high-contrast', '#e9e9e9');
    root.style.setProperty('--g-low-contrast', '#9d9d9d');

    root.style.setProperty('--p-main', '#996ad4');
    root.style.setProperty('--p-high-contrast', '#996ad4');
    root.style.setProperty('--p-low-contrast', '#642CA9');

    root.style.setProperty('--o-high-contrast', '#ff8f5c');
    root.style.setProperty('--o-low-contrast', '#883914');

    root.style.setProperty('--b-high-contrast', '#94d4ff');
    root.style.setProperty('--b-low-contrast', '#206491');

    root.style.setProperty('--shadow', 'rgba(0,0,0,0.5)');

    logo.src = './resources/images/yn_logo_white.svg';
}

function disableDarkMode() {
    root.style.setProperty('--bg-color', 'white');
    root.style.setProperty('--content-color', 'black');

    root.style.setProperty('--g-high-contrast', '#9d9d9d');
    root.style.setProperty('--g-low-contrast', '#e9e9e9');

    root.style.setProperty('--p-main', '#642CA9');
    root.style.setProperty('--p-high-contrast', '#320f5d');
    root.style.setProperty('--p-low-contrast', '#996ad4');

    root.style.setProperty('--o-high-contrast', '#883914');
    root.style.setProperty('--o-low-contrast', '#ff8f5c');

    root.style.setProperty('--b-high-contrast', '#206491');
    root.style.setProperty('--b-low-contrast', '#94d4ff');

    root.style.setProperty('--shadow', 'rgba(0,0,0,0.2)');

    logo.src = './resources/images/yn_logo_black.svg';
}

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode();
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        if (event.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
)