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
const profileCard = document.querySelector('.profile-card');

const profileObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            profileCard.classList.add('show');
        }
    });
}, {
    threshold: 0.2
});

if (profileCard) {
    profileObserver.observe(profileCard);
}
function calculateQuote() {

    const sqft = parseFloat(document.getElementById("sqft").value);
    const designType = document.getElementById("designType").value;
    const result = document.getElementById("quoteResult");

    if (!sqft || sqft <= 0 || !designType) {
        result.innerHTML = "⚠️ Please enter your area and select a design type.";
        return;
    }

    let rate = 0;
    let designName = "";

    if (designType === "2d") {
        rate = 1.5;
        designName = "2D Floor Plan";
    } 
    else if (designType === "3d") {
        rate = 3;
        designName = "3D Elevation";
    } 
    else if (designType === "both") {
        rate = 3.5;
        designName = "2D + 3D Elevation";
    }

    const originalCost = sqft * rate;

    let minDiscount;
    let maxDiscount;

    if (sqft < 1000) {
        minDiscount = 2;
        maxDiscount = 6;
    } 
    else if (sqft < 1500) {
        minDiscount = 5;
        maxDiscount = 10;
    } 
    else if (sqft < 2000) {
        minDiscount = 8;
        maxDiscount = 15;
    } 
    else if (sqft < 2500) {
        minDiscount = 10;
        maxDiscount = 18;
    } 
    else {
        minDiscount = 12;
        maxDiscount = 20;
    }

    const discountPercent =
        Math.floor(Math.random() * (maxDiscount - minDiscount + 1)) + minDiscount;

    const discountAmount = originalCost * discountPercent / 100;
    const finalCost = originalCost - discountAmount;

    result.innerHTML = `
        <h3>🎉 Your Estimate</h3>

        <p><strong>Area:</strong> ${sqft} sq.ft</p>

        <p><strong>Design:</strong> ${designName}</p>

        <p><strong>Original Cost:</strong>
        ₹${originalCost.toLocaleString("en-IN")}</p>

        <p>🎁 <strong>Special Discount:
        ${discountPercent}% OFF</strong></p>

        <p><strong>You Save:</strong>
        ₹${discountAmount.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        })}</p>

        <h2>
        Estimated Cost:
        ₹${finalCost.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        })}
        </h2>

        <button
            type="button"
            class="whatsapp-quote-btn"
            onclick="sendQuoteToWhatsApp(${sqft}, '${designName}', ${originalCost}, ${discountPercent}, ${discountAmount}, ${finalCost})">
            📲 Get This Quote on WhatsApp
        </button>
    `;
}


function sendQuoteToWhatsApp(
    sqft,
    designName,
    originalCost,
    discountPercent,
    discountAmount,
    finalCost
) {

    const phoneNumber = "918667632394";

    const message =
`Hello RC Design Hub 👋

I would like to enquire about a design quotation.

📐 Area: ${sqft} sq.ft
🏠 Design: ${designName}

💰 Original Cost: ₹${originalCost.toLocaleString("en-IN")}
🎁 Discount: ${discountPercent}%
💵 You Save: ₹${discountAmount.toLocaleString("en-IN")}
✅ Estimated Cost: ₹${finalCost.toLocaleString("en-IN")}

Please provide more details about the project.`;

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}
/* ===== PRICING CARD SCROLL ANIMATION ===== */

const priceCards = document.querySelectorAll(".price-card");

const pricingObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2
    }
);

priceCards.forEach((card) => {
    pricingObserver.observe(card);
});
