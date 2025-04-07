document.addEventListener('DOMContentLoaded', function() {
    // Links for keyboard navigation
    const links = {
        'i': 'https://www.linkedin.com/in/jacob-lontoc', // Replace with your LinkedIn URL
        'g': 'https://github.com/jacoblontoc', // Replace with your GitHub URL
    };

    // Sections to show/hide
    const aboutSection = document.getElementById('about-section');
    const terminal = document.querySelector('.terminal');

    // Function to handle keydown events
    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();

        // Handle navigation keys
        if (links.hasOwnProperty(key)) {
            window.open(links[key], '_blank');
        }
        
        // About section
        if (key === 'a') {
            terminal.style.display = 'none';
            aboutSection.style.display = 'flex';
            aboutSection.classList.add('fade-in');
        }
        
        // Close sections / return to dashboard
        if (key === 'escape' || key === 'q') {
            closeAllSections();
        }
    });

    // Add click event listeners to keybinding items
    document.querySelectorAll('.keybinding-item').forEach(item => {
        item.addEventListener('click', function() {
            const keyText = this.querySelector('.key').textContent;
            simulateKeyPress(keyText);
        });
    });

    function simulateKeyPress(key) {
        key = key.toLowerCase();
        
        if (links.hasOwnProperty(key)) {
            window.open(links[key], '_blank');
        } else if (key === 'a') {
            terminal.style.display = 'none';
            aboutSection.style.display = 'flex';
            aboutSection.classList.add('fade-in');
        } else if (key === 'q') {
            closeAllSections();
        }
    }

    function closeAllSections() {
        // Hide all sections and show terminal
        aboutSection.style.display = 'none';
        terminal.style.display = 'block';
    }
});
