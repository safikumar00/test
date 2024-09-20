var code;

function createCaptcha() {
  // Clear the contents of the captcha div first
  document.getElementById('captcha').innerHTML = "";

  // Generate two random numbers for the math problem
  var num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  var num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10

  // Generate the math question
  var mathQuestion = `${num1} + ${num2}`;

  // Store the correct answer for validation
  code = num1 + num2;

  // Display the math question as the CAPTCHA
  var captchaText = document.createElement("span");
  captchaText.innerHTML = `Solve: ${mathQuestion} = ?`;
  captchaText.style.fontSize = "24px"; // Styling for readability

  // Add the math question to the captcha div
  document.getElementById("captcha").appendChild(captchaText);
}

function validateCaptcha() {
  event.preventDefault();

  // Get user input and validate against the CAPTCHA answer
  var userInput = parseInt(document.getElementById("cpatchaTextBox").value); // Convert input to a number
  if (userInput === code) {
    // alert("Valid CAPTCHA");
    document.querySelector('.captcha-con').style.display = "none";
  } else {
    // alert("Invalid CAPTCHA. Please try again.");
    document.querySelector('.captcha-error').classList.replace('d-none', 'd-block');

    createCaptcha(); // Regenerate the CAPTCHA if validation fails
  }
}

// Run createCaptcha() when the page loads
window.onload = function() {
  createCaptcha();
};
