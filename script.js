// ============================================================
// script.js - Youth Empowerment Hub
// Author: Leagilwe Motswasejane
// Student Number: ST10514516
// Subject: WEDE5020 - Part 3
// Description: Adds interactivity, form validation, dynamic
// content, search functionality, and a gallery lightbox to
// the Youth Empowerment Hub website.
// ============================================================


// ============================================================
// SECTION 1: ACTIVE NAVIGATION LINK
// Highlights the link in the navigation menu that matches
// the page the user is currently viewing.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
            link.classList.add("active-link");
        }
    });
});


// ============================================================
// SECTION 2: ACCORDION COMPONENT (FAQ)
// Converts the FAQ items on the contact page into a working
// accordion. Only one answer is open at a time, and clicking
// a question toggles it open and closed.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector("h4");
        const answer = item.querySelector("p");

        if (question && answer) {

            // Hide the answer by default and mark the question as clickable
            answer.style.maxHeight = "0";
            answer.style.overflow = "hidden";
            answer.style.transition = "max-height 0.35s ease";
            question.style.cursor = "pointer";
            question.setAttribute("role", "button");
            question.setAttribute("tabindex", "0");

            // Function that opens or closes the clicked FAQ answer
            function toggleAnswer() {

                const isOpen = item.classList.contains("faq-open");

                // Close every other open FAQ answer first
                faqItems.forEach(function (otherItem) {
                    otherItem.classList.remove("faq-open");
                    const otherAnswer = otherItem.querySelector("p");
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = "0";
                    }
                });

                // If it was closed, open this one
                if (!isOpen) {
                    item.classList.add("faq-open");
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }

            // Allow clicking and keyboard Enter key to toggle the accordion
            question.addEventListener("click", toggleAnswer);
            question.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleAnswer();
                }
            });
        }
    });
});


// ============================================================
// SECTION 3: TABS COMPONENT (PROGRAMS PAGE)
// Adds a tab filter above the programme detail sections on
// services.html, allowing the user to show only one
// programme category at a time, or show all of them.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const programSections = document.querySelectorAll(".program-detail");

    // Only run this code on the services page where program sections exist
    if (programSections.length > 0) {

        // Build the tab buttons dynamically and insert them before the first programme
        const tabWrapper = document.createElement("div");
        tabWrapper.className = "program-tabs";

        const tabLabels = ["All Programmes", "Tutoring", "Mentorship", "Workshops", "Career"];
        const tabFilters = ["all", "tutoring", "mentorship", "workshops", "career"];

        tabLabels.forEach(function (label, index) {
            const tabButton = document.createElement("button");
            tabButton.textContent = label;
            tabButton.className = "tab-btn";
            tabButton.setAttribute("data-filter", tabFilters[index]);
            if (index === 0) {
                tabButton.classList.add("tab-active");
            }
            tabWrapper.appendChild(tabButton);
        });

        // Give each programme section a data-category attribute matching the tabs
        const categories = ["tutoring", "mentorship", "workshops", "career"];
        programSections.forEach(function (section, index) {
            section.setAttribute("data-category", categories[index]);
        });

        // Insert the tab buttons just before the first programme section
        programSections[0].parentNode.insertBefore(tabWrapper, programSections[0]);

        // Add click behaviour to each tab button
        const tabButtons = document.querySelectorAll(".tab-btn");
        tabButtons.forEach(function (button) {
            button.addEventListener("click", function () {

                // Update which tab looks active
                tabButtons.forEach(function (btn) {
                    btn.classList.remove("tab-active");
                });
                button.classList.add("tab-active");

                const filter = button.getAttribute("data-filter");

                // Show or hide programme sections based on the selected tab
                programSections.forEach(function (section) {
                    if (filter === "all" || section.getAttribute("data-category") === filter) {
                        section.style.display = "flex";
                    } else {
                        section.style.display = "none";
                    }
                });
            });
        });
    }
});


// ============================================================
// SECTION 4: EVENT SEARCH AND FILTER (DYNAMIC CONTENT)
// Adds a live search box above the events section on the
// homepage that filters events by typing keywords, fulfilling
// the dynamic content and search functionality requirement.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const eventsList = document.querySelector(".events-list");

    if (eventsList) {

        // Build the search input box dynamically
        const searchWrapper = document.createElement("div");
        searchWrapper.className = "event-search-wrapper";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Search events by name or location...";
        searchInput.className = "event-search-input";
        searchInput.setAttribute("aria-label", "Search upcoming events");

        searchWrapper.appendChild(searchInput);
        eventsList.parentNode.insertBefore(searchWrapper, eventsList);

        const eventItems = document.querySelectorAll(".event-item");

        // Filter the events live as the user types
        searchInput.addEventListener("input", function () {

            const searchTerm = searchInput.value.toLowerCase();

            eventItems.forEach(function (event) {
                const eventText = event.textContent.toLowerCase();
                if (eventText.includes(searchTerm)) {
                    event.style.display = "flex";
                } else {
                    event.style.display = "none";
                }
            });
        });
    }
});


// ============================================================
// SECTION 5: GALLERY LIGHTBOX
// Allows any image with the class "lightbox-img" to open in
// a larger, full screen view when clicked. Includes a close
// button and the ability to close by clicking outside the image.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    // Mark all card, team and programme images as lightbox enabled
    const lightboxImages = document.querySelectorAll(
        ".card img, .team-member img, .program-image img, .about-image img, .hero-image img"
    );

    if (lightboxImages.length > 0) {

        // Build the lightbox overlay once and add it to the page
        const overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";

        const lightboxImg = document.createElement("img");
        lightboxImg.className = "lightbox-image";

        const closeBtn = document.createElement("span");
        closeBtn.className = "lightbox-close";
        closeBtn.innerHTML = "&times;";

        overlay.appendChild(closeBtn);
        overlay.appendChild(lightboxImg);
        document.body.appendChild(overlay);

        // Open the lightbox when any eligible image is clicked
        lightboxImages.forEach(function (img) {
            img.style.cursor = "zoom-in";
            img.addEventListener("click", function () {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                overlay.classList.add("lightbox-active");
            });
        });

        // Close the lightbox when the close button is clicked
        closeBtn.addEventListener("click", function () {
            overlay.classList.remove("lightbox-active");
        });

        // Close the lightbox when clicking the dark background
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                overlay.classList.remove("lightbox-active");
            }
        });

        // Close the lightbox when the Escape key is pressed
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                overlay.classList.remove("lightbox-active");
            }
        });
    }
});


// ============================================================
// SECTION 6: ENQUIRY FORM VALIDATION AND PROCESSED RESPONSE
// Validates every field on the enquiry form using JavaScript,
// displays clear error messages under invalid fields, and
// once valid, generates a relevant response message about
// cost or availability based on the selected programme.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const enquiryForm = document.querySelector(".enquiry-form");

    if (enquiryForm) {

        // Build a response box to display the processed result
        const responseBox = document.createElement("div");
        responseBox.className = "form-response-box";
        responseBox.style.display = "none";
        enquiryForm.parentNode.appendChild(responseBox);

        // Information used to generate a relevant response per programme
        const programmeInfo = {
            tutoring: { cost: "Free of charge", availability: "Mon-Fri 15:00-17:00 and Sat 09:00-12:00" },
            mentorship: { cost: "Free of charge", availability: "Monthly sessions, 6-month cycles" },
            workshops: { cost: "Free of charge", availability: "Monthly Saturday workshops, 09:00-13:00" },
            career: { cost: "Free of charge", availability: "By appointment, Tue and Thu, 10:00-15:00" },
            multiple: { cost: "Free of charge", availability: "Varies per programme - we will contact you" },
            "not-sure": { cost: "Free of charge", availability: "Our team will help you choose a programme" }
        };

        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;

            // Clear old error messages before validating again
            enquiryForm.querySelectorAll(".error-message").forEach(function (msg) {
                msg.remove();
            });
            enquiryForm.querySelectorAll(".input-error").forEach(function (field) {
                field.classList.remove("input-error");
            });

            // Helper function to show an error message under a field
            function showError(field, message) {
                isValid = false;
                field.classList.add("input-error");
                const error = document.createElement("span");
                error.className = "error-message";
                error.textContent = message;
                field.parentNode.appendChild(error);
            }

            // Validate full name - must contain only letters and spaces
            const fullName = document.getElementById("full-name");
            const namePattern = /^[A-Za-z\s]{2,50}$/;
            if (!namePattern.test(fullName.value.trim())) {
                showError(fullName, "Please enter a valid full name (letters only, 2-50 characters).");
            }

            // Validate email - must follow a standard email format
            const email = document.getElementById("email");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                showError(email, "Please enter a valid email address.");
            }

            // Validate phone number - must be 10 digits if provided
            const phone = document.getElementById("phone");
            const phonePattern = /^[0-9]{10}$/;
            if (phone.value.trim() !== "" && !phonePattern.test(phone.value.replace(/\s/g, ""))) {
                showError(phone, "Please enter a valid 10-digit phone number.");
            }

            // Validate age - must be between 13 and 80 if provided
            const age = document.getElementById("age");
            if (age.value.trim() !== "" && (age.value < 13 || age.value > 80)) {
                showError(age, "Age must be between 13 and 80.");
            }

            // Validate enquiry type - must be selected
            const enquiryType = document.getElementById("enquiry-type");
            if (enquiryType.value === "") {
                showError(enquiryType, "Please select the type of enquiry.");
            }

            // Validate message - must be at least 10 characters
            const message = document.getElementById("message");
            if (message.value.trim().length < 10) {
                showError(message, "Your message must be at least 10 characters long.");
            }

            // Validate consent checkbox - must be checked
            const consent = document.getElementById("consent");
            if (!consent.checked) {
                showError(consent, "You must agree to be contacted before submitting.");
            }

            // If every field passed validation, process and display the response
            if (isValid) {

                const programmeValue = document.getElementById("programme").value;
                const info = programmeInfo[programmeValue] || {
                    cost: "Free of charge",
                    availability: "Our team will confirm availability with you directly"
                };

                responseBox.innerHTML =
                    "<strong>Thank you, " + fullName.value.trim() + "!</strong><br>" +
                    "Your enquiry has been received. Based on your selection:<br>" +
                    "Cost: " + info.cost + "<br>" +
                    "Availability: " + info.availability + "<br>" +
                    "We will email you at " + email.value.trim() + " within 2 business days.";

                responseBox.style.display = "block";
                responseBox.classList.add("response-success");
                enquiryForm.reset();
            } else {
                responseBox.style.display = "none";
            }
        });
    }
});


// ============================================================
// SECTION 7: CONTACT FORM VALIDATION AND EMAIL COMPILATION
// Validates the contact form fields and, once valid, compiles
// the message into a formatted email using a mailto link so
// the user can send the message directly to the organisation.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        const responseBox = document.createElement("div");
        responseBox.className = "form-response-box";
        responseBox.style.display = "none";
        contactForm.parentNode.appendChild(responseBox);

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;

            contactForm.querySelectorAll(".error-message").forEach(function (msg) {
                msg.remove();
            });
            contactForm.querySelectorAll(".input-error").forEach(function (field) {
                field.classList.remove("input-error");
            });

            function showError(field, message) {
                isValid = false;
                field.classList.add("input-error");
                const error = document.createElement("span");
                error.className = "error-message";
                error.textContent = message;
                field.parentNode.appendChild(error);
            }

            // Validate contact name
            const name = document.getElementById("contact-name");
            const namePattern = /^[A-Za-z\s]{2,50}$/;
            if (!namePattern.test(name.value.trim())) {
                showError(name, "Please enter a valid full name (letters only, 2-50 characters).");
            }

            // Validate contact email
            const email = document.getElementById("contact-email");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                showError(email, "Please enter a valid email address.");
            }

            // Validate contact phone if provided
            const phone = document.getElementById("contact-phone");
            const phonePattern = /^[0-9]{10}$/;
            if (phone.value.trim() !== "" && !phonePattern.test(phone.value.replace(/\s/g, ""))) {
                showError(phone, "Please enter a valid 10-digit phone number.");
            }

            // Validate subject
            const subject = document.getElementById("contact-subject");
            if (subject.value.trim().length < 3) {
                showError(subject, "Subject must be at least 3 characters long.");
            }

            // Validate message
            const message = document.getElementById("contact-message");
            if (message.value.trim().length < 10) {
                showError(message, "Your message must be at least 10 characters long.");
            }

            // If everything is valid, compile the email and offer it to the user
            if (isValid) {

                const officeValue = document.getElementById("contact-office").value;
                const recipientEmail = officeValue === "soweto"
                    ? "soweto@youthempowermenthub.org"
                    : "info@youthempowermenthub.org";

                const emailSubject = encodeURIComponent(subject.value.trim());
                const emailBody = encodeURIComponent(
                    "Name: " + name.value.trim() + "\n" +
                    "Email: " + email.value.trim() + "\n" +
                    "Phone: " + (phone.value.trim() || "Not provided") + "\n\n" +
                    "Message:\n" + message.value.trim()
                );

                const mailtoLink = "mailto:" + recipientEmail + "?subject=" + emailSubject + "&body=" + emailBody;

                responseBox.innerHTML =
                    "<strong>Thank you, " + name.value.trim() + "!</strong><br>" +
                    "Your message has been compiled successfully. " +
                    "<a href='" + mailtoLink + "' class='btn-secondary'>Click here to send your email</a>";

                responseBox.style.display = "block";
                responseBox.classList.add("response-success");
                contactForm.reset();
            } else {
                responseBox.style.display = "none";
            }
        });
    }
});


// ============================================================
// SECTION 8: SCROLL TO TOP BUTTON
// Displays a button once the user scrolls down the page,
// which smoothly returns them to the top when clicked.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = "&#8679;";
    scrollBtn.title = "Back to top";
    scrollBtn.className = "scroll-top-btn";

    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});


// ============================================================
// SECTION 9: SMOOTH SCROLLING FOR ANCHOR LINKS
// Makes any link starting with # scroll smoothly to its
// target section instead of jumping instantly.
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                event.preventDefault();
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});