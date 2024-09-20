
var resend = document.getElementById("resend");
var timerElement = document.querySelector(".otp-timer");
var otpInputs = document.querySelectorAll('.otp-in');

otpInputs.forEach(function (input, index) {
    input.addEventListener('input', function () {
        if (this.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' && this.value.length === 0 && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

// Function to validate name input
function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.querySelector('.name-error');

    if (nameInput.value.trim() === "") {
        nameError.classList.remove('d-none');
        return false;
    } else {
        nameError.classList.add('d-none');
        return true;
    }
}

// Function to validate mobile number input (Indian mobile number pattern)
function validateMobile() {
    const mobileInput = document.getElementById('mobile');
    const mobileError = document.querySelector('.mobile-error');
    const mobilePattern = /^[6-9]\d{9}$/;  // Indian mobile number regex

    if (!mobilePattern.test(mobileInput.value)) {
        mobileError.classList.remove('d-none');
        return false;
    } else {
        mobileError.classList.add('d-none');
        return true;
    }
}

function validateCheckbox() {
    const checkbox = document.getElementById('checkbox');

    if (!checkbox.checked) {
        alert("Please authorize the notifications.");
        return false;
    } else {
        return true;
    }
}

function otpclose() {
    var otpcon = document.getElementById("otp-con")
    otpcon.classList.replace("d-flex", "d-none");

}

function sendOtp(event) {
    event.preventDefault();  // Prevent form submission

    const isNameValid = validateName();
    const isMobileValid = validateMobile();
    const isCheckboxChecked = validateCheckbox();


    // Check if all validations pass
    if (isNameValid && isMobileValid && isCheckboxChecked) {
        document.getElementById('otp-con').classList.replace('d-none', 'd-flex');
        resendtimer(60);
    }
}

function resendtimer(val) {
    //   resend.preventdefault();
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    }

    let countdown = val;

    const timerInterval = setInterval(function () {
        timerElement.textContent = formatTime(countdown);

        countdown--;

        if (countdown < 0) {
            resend.disabled = false;
            resend.classList.replace("text-muted", "text-primary");
            clearInterval(timerInterval);
            timerElement.textContent = "00:00";
        }
    }, 1000);
}

function resendotp() {
    document.body.style.overflow = "hidden";

    resendtimer(60);
    resend.disabled = true;
    resend.classList.replace("text-primary", "text-muted");
}

function preventNumberInput(event) {
    const key = event.key;
    // Allow keys other than numbers, control keys, and function keys
    if (key >= '0' && key <= '9') {
        event.preventDefault(); // Prevent number input
        return false;
    }
    return true;
}

function verifyotp(event) {
    document.querySelector('.preloader').classList.replace('d-none', 'd-flex');
    document.querySelector('.preloader-img').classList.add('rotatation');

    setTimeout(() => {
        document.querySelector('.preloader').classList.replace('d-flex', 'd-none');

        var otpcon = document.getElementById("otp-con")
        otpcon.classList.replace("d-flex", "d-none");
        document.querySelector('.main').classList.add('d-none');
        document.querySelector('.games-list').classList.replace('d-none', 'd-flex');
    }, 500)
}

function claim() {
    window.location.href = "https://www.google.com/";
}
