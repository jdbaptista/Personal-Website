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