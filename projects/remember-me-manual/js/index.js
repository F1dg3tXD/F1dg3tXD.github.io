document.addEventListener("DOMContentLoaded", function() {
    // Function to detect if the user is on a mobile device
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Redirect to mobile page if user is on a mobile device
    if (isMobile()) {
        window.location.href = "https://f1dg3txd.github.io/projects/remember-me-manual/pdf/RememberMe_G2%20Manual_Interactive.pdf"; // Replace "mobile.html" with your mobile version URL
    }
});
