function updateLogo() {
    const zoomLevel = 1 / window.devicePixelRatio;
    const logo = document.getElementById("logo");

    if (zoomLevel >= 2) {
        logo.src = "img/LogoSmall.png";
    } else if (zoomLevel < 2 && zoomLevel >= 1.33) {
        logo.src = "img/LogoMain.png";
    } else if (zoomLevel < 1.33 && zoomLevel >= 1) {
        logo.src = "img/LogoLarge.png";
    } else if (zoomLevel < 1 && zoomLevel >= 0.75) {
        logo.src = "img/LogoExtraLarge.png";
    } else {
        logo.src = "img/LogoExtraLarge.png";  // Extra large for zoom levels above 90%
    }

    console.log("Current zoom level: ", zoomLevel); // For debugging purposes
}

// Update logo on load and resize (including zoom)
window.onload = updateLogo;
window.onresize = updateLogo;
