var savedColorScheme = {
    backgroundColor: "#1F2020",
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