// -----------------------------
// SELECT ELEMENTS
// -----------------------------
const form = document.getElementById("registrationForm");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");
const message = document.getElementById("message");
const charCount = document.getElementById("charCount");
const registrationList = document.getElementById("registrationList");

// -----------------------------
// CHARACTER COUNT FOR TEXTAREA
// -----------------------------
message.addEventListener("input", () => {
    const length = message.value.length;
    charCount.textContent = `${length} / 10`;
});

// -----------------------------
// LOAD REGISTRATIONS FROM localStorage
// -----------------------------
function loadRegistrations() {
    registrationList.innerHTML = "";
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    registrations.forEach((reg, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${reg.name} | ${reg.email} | ${reg.phone} | ${reg.course} | ${reg.level} | Hours: ${reg.hours} | Message: ${reg.message}
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        registrationList.appendChild(li);
    });
}
loadRegistrations();

// -----------------------------
// DELETE REGISTRATION
// -----------------------------
registrationList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
        registrations.splice(index, 1);
        localStorage.setItem("registrations", JSON.stringify(registrations));
        loadRegistrations();
    }
});

// -----------------------------
// FORM SUBMISSION VALIDATION
// -----------------------------
form.addEventListener("submit", function(event) {
    event.preventDefault();
    errorMsg.textContent = "";
    successMsg.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value;
    const level = document.getElementById("level").value.trim();
    const msg = message.value.trim();
    const hours = document.getElementById("hours").value;

    // VALIDATION
    if (name.length < 3) {
        errorMsg.textContent = "Name must be at least 3 characters.";
        document.getElementById("name").focus();
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        errorMsg.textContent = "Enter a valid email address.";
        document.getElementById("email").focus();
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        errorMsg.textContent = "Phone must be 10 digits.";
        document.getElementById("phone").focus();
        return;
    }

    if (course === "") {
        errorMsg.textContent = "Please select a course.";
        document.getElementById("course").focus();
        return;
    }

    if (level === "") {
        errorMsg.textContent = "Please enter your skill level.";
        document.getElementById("level").focus();
        return;
    }

    if (msg.length < 10) {
        errorMsg.textContent = "Message must contain at least 10 characters.";
        message.focus();
        return;
    }

    // CREATE REGISTRATION OBJECT
    const registration = { name, email, phone, course, level, hours, message: msg };

    // SAVE TO localStorage
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    registrations.push(registration);
    localStorage.setItem("registrations", JSON.stringify(registrations));

    // UPDATE LIST
    loadRegistrations();

    // SUCCESS MESSAGE & RESET FORM
    successMsg.textContent = "✅ Registration Successful!";
    form.reset();
    document.getElementById("result").value = 20; // reset range
    charCount.textContent = "0 / 10";
});