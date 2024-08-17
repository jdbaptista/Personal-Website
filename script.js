const lightColorScheme = {
    backgroundColor: "#ffffff",
    mainColor: "#4A7856",
    boldColor: "#074B35",
    accentColor: "#D8CF6F",
    textColor: "#000000",
    buttonImgSrc: "weather-moon-full-svgrepo-com.svg"
}

const darkColorScheme = {
    backgroundColor: "#252526",
    mainColor: "#4A7856",
    boldColor: "#074B35",
    accentColor: "#D8CF6F",
    textColor: "#ffffff",
    buttonImgSrc: "weather-moon-svgrepo-com.svg"
}

function useColorScheme(scheme) {
    var root = document.querySelector(':root');
    root.style.setProperty('--background-color', scheme.backgroundColor);
    root.style.setProperty('--main-color', scheme.mainColor);
    root.style.setProperty('--bold-color', scheme.boldColor);
    root.style.setProperty('--accent-color', scheme.accentColor);
    root.style.setProperty('--text-color', scheme.textColor);
    var buttonImg = document.querySelector('#dark-mode-button-img');
    buttonImg.src = scheme.buttonImgSrc;
}

var currentTheme = localStorage.getItem("theme");
// use correct theme on startup
if (currentTheme == "dark") {
    useColorScheme(darkColorScheme);
} else {
    useColorScheme(lightColorScheme);
}

function toggleDarkMode() {
    if (currentTheme == "dark") {
        localStorage.removeItem("theme");
        currentTheme = "light";
        useColorScheme(lightColorScheme);
    } else {
        currentTheme = "dark";
        localStorage.setItem("theme", currentTheme);
        useColorScheme(darkColorScheme);
    }
}

function navbarTransitionEnd(ev) {
    var navbar = document.querySelector('nav');
    navbar.style.position = 'sticky';
    navbar.style.top = '0px';
    navbar.style.transform = 'none';
    navbar.style.transition = 'none';
}

function navbarTransitionEndStatic(ev) {
    var navbar = document.querySelector('nav');
    navbar.style.position = 'static';
    navbar.style.transform = 'none';
    navbar.style.transition = 'none';
}

function stickNavbar() {
    var navbar = document.querySelector('nav');
    navbar.style.position = 'sticky';
    navbar.style.top = '-' + navbar.offsetHeight.toString() + 'px';
    navbar.style.transform = 'translateY(' + navbar.offsetHeight.toString() + 'px)';
    navbar.style.transition = 'transform 0.3s';
}

function unstickNavbar() {
    var navbar = document.querySelector('nav');
    navbar.style.position = 'sticky';
    navbar.style.transform = 'translateY(-' + navbar.offsetHeight.toString() + 'px)';
    navbar.style.transition = 'transform 0.3s';
}

var lastScrollUp = false;
var oldScroll = window.scrollY;

window.onscroll = function(event) {
    var navbar = document.querySelector('nav');
    if (this.scrollY <= navbar.offsetHeight) {
        if (oldScroll > this.scrollY) {
            navbar.removeEventListener("transitionend", navbarTransitionEnd);
            navbar.removeEventListener("transitionend", navbarTransitionEndStatic);
            navbar.style.position = 'sticky';
            navbar.style.top = '0px';
            navbar.style.transform = 'none';
            navbar.style.transition = 'none';
            lastScrollUp = true;
        } else {
            navbar.style.position = 'static';
            navbar.style.transform = 'none';
            navbar.style.transition = 'none';
            lastScrollUp = false;
        }
    } else if (oldScroll > this.scrollY && !lastScrollUp) {
        stickNavbar();
        navbar.removeEventListener("transitionend", navbarTransitionEndStatic);
        navbar.addEventListener("transitionend", navbarTransitionEnd);
        lastScrollUp = true;
    } else if (lastScrollUp && oldScroll < this.scrollY) {
        unstickNavbar();
        navbar.removeEventListener("transitionend", navbarTransitionEnd);
        navbar.addEventListener("transitionend", navbarTransitionEndStatic);
        lastScrollUp = false;
    }
    oldScroll = this.scrollY;
}