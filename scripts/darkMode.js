const lightColorScheme = {
    backgroundColor: "#ffffff",
    shadowColor: "#ced9d1",
    mainColor: "#4A7856",
    boldColor: "#074B35",
    accentColor: "#D8CF6F",
    textColor: "#000000",
    buttonImgSrc: "/content/weather-moon-full-svgrepo-com.svg",
    githubImgSrc: "/content/github-mark.svg",
}

const darkColorScheme = {
    backgroundColor: "#252526",
    shadowColor: "#363638",
    mainColor: "#4A7856",
    boldColor: "#074B35",
    accentColor: "#D8CF6F",
    textColor: "#ffffff",
    buttonImgSrc: "/content/weather-moon-svgrepo-com.svg",
    githubImgSrc: "/content/github-mark-white.svg",
}

function useColorScheme(scheme) {
    var root = document.querySelector(':root');
    root.style.setProperty('--background-color', scheme.backgroundColor);
    root.style.setProperty('--shadow-color', scheme.shadowColor);
    root.style.setProperty('--main-color', scheme.mainColor);
    root.style.setProperty('--bold-color', scheme.boldColor);
    root.style.setProperty('--accent-color', scheme.accentColor);
    root.style.setProperty('--text-color', scheme.textColor);
    var buttonImg = document.querySelector('#dark-mode-button-img');
    buttonImg.src = scheme.buttonImgSrc;
    var githubImgs = document.querySelectorAll('.github-img');
    githubImgs.forEach((img) => {
        img.src = scheme.githubImgSrc;
    })
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