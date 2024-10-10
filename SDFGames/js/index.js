document.addEventListener('DOMContentLoaded', function() {
    const xmlFile = 'https://raw.githubusercontent.com/F1dg3tXD/F1dg3tXD.github.io/refs/heads/main/SDFGames/files.xml'; // Replace with the path to your XML file

    fetch(xmlFile)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const files = data.querySelectorAll('file');
            const container = document.getElementById('download-buttons');

            files.forEach(file => {
                const name = file.getAttribute('name');
                const url = file.getAttribute('url');
                
                const button = document.createElement('button');
                button.textContent = `Download ${name}`;
                button.onclick = () => window.location.href = url;
                container.appendChild(button);
            });
        })
        .catch(error => console.error('Error loading XML:', error));
});
