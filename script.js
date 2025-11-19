document.addEventListener('DOMContentLoaded', function() {
    // Links for keyboard navigation
    const links = {
        'i': 'https://www.linkedin.com/in/jacob-lontoc',
        'g': 'https://github.com/jacoblontoc'
    };

    // Sections to show/hide
    const aboutSection = document.getElementById('about-section');
    const terminal = document.querySelector('.terminal');

    // Restore previous state on page load
    const savedState = localStorage.getItem('currentPage');
    if (savedState === 'about') {
        terminal.style.display = 'none';
        aboutSection.style.display = 'flex';
        aboutSection.classList.add('fade-in');
    }

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
            localStorage.setItem('currentPage', 'about');
        }
        
        // Close sections / return to dashboard (only Escape key)
        if (key === 'escape') {
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
            localStorage.setItem('currentPage', 'about');
        }
    }

    function closeAllSections() {
        // Fade out about section
        aboutSection.style.opacity = '0';
        
        // Wait for fade out, then hide about section and show terminal with fade in
        setTimeout(() => {
            aboutSection.style.display = 'none';
            aboutSection.style.opacity = '1';
            terminal.style.opacity = '0';
            terminal.style.display = 'block';
            
            // Trigger fade in
            setTimeout(() => {
                terminal.style.opacity = '1';
            }, 10);
        }, 300);
        
        localStorage.setItem('currentPage', 'dashboard');
    }

    // Make closeAllSections globally accessible for the close hint button
    window.closeAllSections = closeAllSections;
});
