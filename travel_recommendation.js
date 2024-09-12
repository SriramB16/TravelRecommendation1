// Function to check the scroll position and toggle search bar visibility
window.addEventListener('scroll', function () {
    const searchBar = document.getElementById('searchBar');
    const homeSection = document.getElementById('home-section');
    const aboutUsSection = document.getElementById('abt-us-section');

    // Get the top position of the home and about sections
    const homeSectionTop = homeSection.getBoundingClientRect().top;
    const aboutUsSectionTop = aboutUsSection.getBoundingClientRect().top;

    // If the scroll position is in the home section, show the search bar
    if (homeSectionTop >= 0 && aboutUsSectionTop > window.innerHeight) {
        searchBar.classList.remove('hidden');
    } else {
        // Otherwise, hide the search bar
        searchBar.classList.add('hidden');
    }
});
