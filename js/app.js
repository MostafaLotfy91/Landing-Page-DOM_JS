/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let navigationItems = document.querySelector("#navbar__list");
const secItems = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//these two lines of code for the header style and appearance

const headerStyle = document.querySelector('.page__header');
headerStyle.style.cssText='background: linear-gradient(0deg, rgba(136,203,171,1) 0%, rgba(0,13,60,1) 100%);padding:20px;padding-left:2px';


// this one is to find if the current section on the screen represents the dynamic style
//I get the info from this link (https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

function isOnScreen(element) {
    var bounding = element.getBoundingClientRect();

    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (1.3 * window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
// put class 'active' to sections when on screen
function styleOnScreenSection(section) {
    section.classList.add("your-active-class", "active");
}
//Function to remove onsceen classes
function notOnScreenSection() {
    for(let i = 0;i<secItems.length;i++){
        secItems[i].classList.remove("your-active-class", "active");
    }
}

// Scroll to anchor ID using scrollTO event
function scrollBevavior() {
    let a = document.querySelectorAll(".createdli");
    a.forEach((element) => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(element.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
        });
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
window.addEventListener('load', buildNavbar())
// Scroll to section on link click
scrollBevavior();
// Build menu
function buildNavbar() {
    secItems.forEach((section)=>{
        let ulChilds = document.createElement("li");
        ulChilds.classList.add("navbar__list__item");
        let secName = section.getAttribute("data-nav");
        let destination = section.getAttribute("id");
        ulChilds.innerHTML = `<a href="#${destination}" class="createdli">${secName}</a>`;
        navigationItems.appendChild(ulChilds);
    });
}

// Set sections as active
window.addEventListener('scroll', function (event) {
    event.preventDefault();
    
    secItems.forEach((section) => {
        if (isOnScreen(section)) {
            notOnScreenSection();
            styleOnScreenSection(section);
        } else if(window.scrollY===0) {
            notOnScreenSection();
        }
    }, false);
});

/**
 * End Main Functions
 * Begin Events
 * 
*/