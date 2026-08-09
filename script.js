const hero = document.querySelector(".hero");

const images = [
    "images/hero1.jpg",
    "images/hero2.jpg",
    "images/hero3.jpg"
];

let current = 0;

// First image
hero.style.backgroundImage =
    "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('" + images[0] + "')";

// Change image every 5 seconds
setInterval(function () {

    current++;

    if (current >= images.length) {
        current = 0;
    }

    hero.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('" + images[current] + "')";

}, 5000);
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const filter = button.getAttribute("data-filter");

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        projectCards.forEach(function(card) {

            if (filter === "all") {
                card.style.display = "block";
            } 
            else if (card.classList.contains(filter)) {
                card.style.display = "block";
            } 
            else {
                card.style.display = "none";
            }

        });

    });

});
// Image Popup

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

const projectImages = document.querySelectorAll(".project-card img");

projectImages.forEach(function(image) {

    image.addEventListener("click", function() {

        imageModal.style.display = "flex";
        modalImage.src = image.src;

    });

});

closeModal.addEventListener("click", function() {

    imageModal.style.display = "none";

});

imageModal.addEventListener("click", function(event) {

    if (event.target === imageModal) {
        imageModal.style.display = "none";
    }

});
// Mobile Menu
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle && navMenu) {

    menuToggle.onclick = function () {
        navMenu.classList.toggle("show");
    };

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {
        link.onclick = function () {
            navMenu.classList.remove("show");
        };
    });
}
const scrollElements = document.querySelectorAll(
    ".about, .services, .projects, .contact, .profile-card, .card, .project-card, .contact-box"
);

const scrollObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){
            entry.target.classList.add("scroll-reveal");
            
            setTimeout(function(){
                entry.target.classList.add("show");
            }, 50);
        }

    });

}, {
    threshold:0.15
});

scrollElements.forEach(function(element){
    element.classList.add("scroll-reveal");
    scrollObserver.observe(element);
});
function sendToWhatsApp() {

    const name = document.getElementById("visitorName").value.trim();
    const phone = document.getElementById("visitorPhone").value.trim();
    const message = document.getElementById("visitorMessage").value.trim();

    if (name === "" || phone === "" || message === "") {
        alert("Please fill all the details.");
        return;
    }

    const whatsappNumber = "918667632394";

    const whatsappMessage =
        "New Enquiry - RC Design Hub%0A%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Phone: " + encodeURIComponent(phone) + "%0A" +
        "Requirement: " + encodeURIComponent(message);

    const whatsappURL =
        "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;

    window.open(whatsappURL, "_blank");
}