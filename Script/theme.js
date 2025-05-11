// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon
    if (theme === 'light') {
        themeIcon.setAttribute('data-lucide', 'moon');
    } else {
        themeIcon.setAttribute('data-lucide', 'sun');
    }
    // Re-render the icon
    lucide.createIcons();
}

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
}); 