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
// =========================================
// WELCOME SCREEN + FEMALE VOICE
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const welcomeScreen = document.getElementById("welcomeScreen");
    const enterWebsite = document.getElementById("enterWebsite");

    // Check whether welcome screen exists
    if (!welcomeScreen || !enterWebsite) {
        console.log("Welcome screen elements not found.");
        return;
    }

    // Welcome audio
    const welcomeAudio = new Audio("audio/welcome.mp3");

    welcomeAudio.volume = 1.0;

// =========================================
// WELCOME SCREEN + CONTACT + GOOGLE SHEET
// =========================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxZ2kiAy1zcxYzU7W-7maAL19nofWsaPBeRUFSs_jYG1LSddcehKDNi1_wcJbp-4SDd/exec";

const contactInput = document.getElementById("visitorContact");

// Enable / Disable ENTER WEBSITE button
if (contactInput && enterWebsite) {

    enterWebsite.disabled = true;

    contactInput.addEventListener("input", function () {

        const contact = contactInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[6-9]\d{9}$/;

if (
    emailPattern.test(contact) ||
    mobilePattern.test(contact)
) {
    enterWebsite.disabled = false;
} else {
    enterWebsite.disabled = true;
}

    });

}


// ENTER WEBSITE button
enterWebsite.addEventListener("click", async function () {

    const contact = contactInput.value.trim();

    if (contact === "") {
        alert("Please enter your Email or Mobile Number.");
        return;
    }

    // Prevent multiple clicks
    enterWebsite.disabled = true;
    enterWebsite.innerText = "Please wait...";

    try {

        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                contact: contact,
                source: "Welcome Page"
            })
        });

        // Play welcome voice
        welcomeAudio.currentTime = 0;

        welcomeAudio.play()
            .then(function () {
                console.log("Welcome audio playing.");
            })
            .catch(function (error) {
                console.log("Audio playback failed:", error);
            });

        // Hide welcome screen
        welcomeScreen.classList.add("hide");
        document.querySelector(".hero-content").classList.add("animate");

    } catch (error) {

        console.error("Google Sheet error:", error);

        alert("Something went wrong. Please try again.");

        enterWebsite.disabled = false;
        enterWebsite.innerText = "ENTER WEBSITE";
    }

});
});
/* =========================================
   RC DESIGN HUB
   VISIBLE FLUID INK EFFECT
   ========================================= */

(function () {

    const welcome = document.getElementById("welcomeScreen");

    if (!welcome) {
        return;
    }

    const canvas = document.createElement("canvas");

    canvas.id = "inkCanvas";

    welcome.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;

    function resize() {

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;
    }

    resize();

    window.addEventListener("resize", resize);


    const inks = [];

    for (let i = 0; i < 14; i++) {

        inks.push({

            x: Math.random() * width,

            y: Math.random() * height,

            radius: 30 + Math.random() * 70,

            angle: Math.random() * Math.PI * 2,

            speed: 0.001 + Math.random() * 0.003,

            drift: 0.3 + Math.random() * 0.7,

            alpha: 0.12 + Math.random() * 0.12

        });

    }


    function drawInk(ink) {

        ink.angle += ink.speed;

        ink.x += Math.cos(ink.angle) * ink.drift;

        ink.y += Math.sin(ink.angle) * ink.drift;


        if (ink.x < -150) {
            ink.x = width + 150;
        }

        if (ink.x > width + 150) {
            ink.x = -150;
        }

        if (ink.y < -150) {
            ink.y = height + 150;
        }

        if (ink.y > height + 150) {
            ink.y = -150;
        }


        const gradient = ctx.createRadialGradient(
            ink.x,
            ink.y,
            0,
            ink.x,
            ink.y,
            ink.radius
        );


        gradient.addColorStop(
            0,
            "rgba(212,175,55," + ink.alpha + ")"
        );

        gradient.addColorStop(
            0.25,
            "rgba(212,175,55," +
            (ink.alpha * 0.8) +
            ")"
        );

        gradient.addColorStop(
            0.55,
            "rgba(212,175,55," +
            (ink.alpha * 0.35) +
            ")"
        );

        gradient.addColorStop(
            1,
            "rgba(212,175,55,0)"
        );


        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
            ink.x,
            ink.y,
            ink.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        ctx.globalCompositeOperation = "screen";


        inks.forEach(function (ink) {

            drawInk(ink);

        });


        ctx.globalCompositeOperation = "source-over";


        requestAnimationFrame(animate);
    }


    animate();

})();
