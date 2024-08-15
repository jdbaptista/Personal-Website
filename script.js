var savedColorScheme = {
    backgroundColor: "#252526",
    mainColor: "#4A7856",
    boldColor: "#074B35",
    accentColor: "#D8CF6F",
    textColor: "#ffffff",
    buttonImgSrc: "weather-sun-svgrepo-com.svg"
}

function toggleDarkMode(caller) {
    var root = document.querySelector(':root');
    var rs = getComputedStyle(root);
    var buttonImg = document.querySelector('#dark-mode-button-img');
    // retrieve current color scheme
    var tempColorScheme = {
        backgroundColor: rs.getPropertyValue('--background-color'),
        mainColor: rs.getPropertyValue('--main-color'),
        boldColor: rs.getPropertyValue('--bold-color'),
        accentColor: rs.getPropertyValue('--accent-color'),
        textColor: rs.getPropertyValue('--text-color'),
        buttonImgSrc: buttonImg.src,
    };
    // switch to alternate color scheme
    root.style.setProperty('--background-color', savedColorScheme.backgroundColor);
    root.style.setProperty('--main-color', savedColorScheme.mainColor);
    root.style.setProperty('--bold-color', savedColorScheme.boldColor);
    root.style.setProperty('--accent-color', savedColorScheme.accentColor);
    root.style.setProperty('--text-color', savedColorScheme.textColor);
    buttonImg.src = savedColorScheme.buttonImgSrc;
    // save previous color scheme
    savedColorScheme.backgroundColor = tempColorScheme.backgroundColor;
    savedColorScheme.mainColor = tempColorScheme.mainColor;
    savedColorScheme.boldColor = tempColorScheme.boldColor;
    savedColorScheme.accentColor = tempColorScheme.accentColor;
    savedColorScheme.textColor = tempColorScheme.textColor;
    savedColorScheme.buttonImgSrc = tempColorScheme.buttonImgSrc;
}

function navbarTransitionEnd(ev) {
    console.log("running navbarTransitionEnd");
    var navbar = document.querySelector('nav');
    navbar.style.position = 'sticky';
    navbar.style.top = '0px';
    navbar.style.transform = 'none';
    navbar.style.transition = 'none';

    navbar.removeEventListener("transitionend", navbarTransitionEnd);
}

function navbarTransitionEndStatic(ev) {
    console.log("running navbarTransitionEndStatic");
    var navbar = document.querySelector('nav');
    navbar.style.position = 'static';
    navbar.style.transform = 'none';
    navbar.style.transition = 'none';
}

function stickNavbar() {
    console.log("sticking navbar");
    var navbar = document.querySelector('nav');
    navbar.style.position = 'sticky';
    navbar.style.top = '-6vh';
    navbar.style.transform = 'translateY(6vh)';
    navbar.style.transition = 'transform 0.2s';
}

function unstickNavbar() {
    console.log("unsticking navbar");
    var navbar = document.querySelector('nav');
    navbar.style.position = 'sticky';
    navbar.style.transform = 'translateY(-6vh)';
    navbar.style.transition = 'transform 0.2s';
}

var lastScrollUp = false;
var oldScroll = window.scrollY;

window.onscroll = function(event) {
    var navbar = document.querySelector('nav');
    if (this.scrollY <= navbar.offsetHeight) {
        navbar.removeEventListener("transitionend", navbarTransitionEnd);
        navbar.removeEventListener("transitionend", navbarTransitionEndStatic);
        navbar.style.position = 'static';
        navbar.style.transform = 'none';
        navbar.style.transition = 'none';
        lastScrollUp = false;
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