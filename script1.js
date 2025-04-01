document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validateForm();
    });

    function validateForm() {
        let isValid = true;

        const firstName = document.getElementById("firstname");
        const lastName = document.getElementById("lastname");
        const mobile = document.getElementById("mobile");

        // if (firstName.value.trim() === "") {
        //     alert("First name is required");
        //     isValid = false;
        // }

        const namePattern = /^[A-Za-z]{3,25}$/;
        if (!namePattern.test(firstName.value.trim())) {
            alert("First name must be 3-25 letters only, no numbers or special characters");
            isValid = false;
        }

        if (!namePattern.test(lastName.value.trim())) {
            alert("Last name must be 3-25 letters only, no numbers or special characters");
            isValid = false;
        }

        // if (lastName.value.trim() === "") {
        //     alert("Last name is required");
        //     isValid = false;
        // }

        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile.value.trim())) {
            alert("Invalid mobile number (10 digits required), no letters or special characters allowed");
            isValid = false;
        }

        if (isValid) {
            alert("Form submitted successfully!");
            form.reset();
        }
    }
});