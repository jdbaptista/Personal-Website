const lightColorScheme = {
    backgroundColor: "#ffffff",
    mainColor: "#4A7856",
    boldColor: "#074B35",
    accentColor: "#D8CF6F",
    textColor: "#000000",
    buttonImgSrc: "content/weather-moon-full-svgrepo-com.svg"
}

const darkColorScheme = {
    backgroundColor: "#252526",
    mainColor: "#4A7856",
    boldColor: "#074B35",
    accentColor: "#D8CF6F",
    textColor: "#ffffff",
    buttonImgSrc: "content/weather-moon-svgrepo-com.svg"
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