document.addEventListener('DOMContentLoaded', function() {
    const popups = ['popup1', 'shoutout-popup'];

    function getDownloadButtonPositions() {
        const positions = [];
        const buttons = document.querySelectorAll('#download-buttons button');
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            positions.push({
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom
            });
        });
        return positions;
    }

    function isOverlapping(popup, positions) {
        const rect = popup.getBoundingClientRect();
        return positions.some(pos => {
            return !(rect.right < pos.left || 
                     rect.left > pos.right || 
                     rect.bottom < pos.top || 
                     rect.top > pos.bottom);
        });
    }

    function showRandomPopup() {
        const randomPopup = popups[Math.floor(Math.random() * popups.length)];
        const popup = document.getElementById(randomPopup);
        if (popup) {
            const positions = getDownloadButtonPositions();
            let x, y, tries = 0;
            const maxTries = 50; // Prevent infinite loop
            
            do {
                // Randomize position while ensuring pop-up stays within viewport
                const maxX = window.innerWidth - popup.offsetWidth - 20; // 20px for padding
                const maxY = window.innerHeight - popup.offsetHeight - 20; // 20px for padding
                x = Math.random() * maxX;
                y = Math.random() * maxY;
                popup.style.left = `${x}px`;
                popup.style.top = `${y}px`;
                tries++;
            } while (isOverlapping(popup, positions) && tries < maxTries);

            if (tries < maxTries) {
                popup.style.display = 'block';
            }
        }
    }

    // Show a random popup every 5 seconds
    setInterval(showRandomPopup, 3000);

    // Close popups when close button is clicked
    document.querySelectorAll('.close-popup').forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });
});
