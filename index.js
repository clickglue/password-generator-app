const slider = document.getElementById("slider");
const lengthIndicator = document.getElementById("length");
const passwordIndicator = document.getElementById("password");
const strengthIndicator = document.getElementById("indicator-word");
const copiedIndicator=document.getElementById('copied')
const led1 = document.getElementById("led-one");
const led2 = document.getElementById("led-two");
const led3 = document.getElementById("led-three");
const led4 = document.getElementById("led-four");

let length = 10;
let password = "P4$5W0rD!";
let strength = 1;

const options = {
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
};

function generatePassword(length, options) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}|:<>?-=[];,.";

  let characterPool = "";

  // Add character sets to the pool based on options
  if (options.lowercase) characterPool += lowercase;
  if (options.uppercase) characterPool += uppercase;
  if (options.numbers) characterPool += numbers;
  if (options.symbols) characterPool += symbols;

  if (!characterPool) {
    throw new Error(
      "No character types selected. Please enable at least one option."
    );
  }
  let newPassword = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    newPassword += characterPool[randomIndex];
  }
  password = newPassword;
  updatePassword();
  calculateStrength();
}

//slider function

slider.oninput = function () {
  const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.backgroundSize = `${percentage}% 100%`;
  length = this.value;
  updateLengthIndicator();
  generatePassword(length, options);
};

function forceGenerate() {
  generatePassword(length, options);
}

function updateLengthIndicator() {
  lengthIndicator.innerHTML = length;
}

function updatePassword() {
  copiedIndicator.style.display='none'
  passwordIndicator.classList.remove('start');
  passwordIndicator.innerHTML = password;
}

function setOptions(data) {
  options[data] = !options[data];
  generatePassword(length, options);
}

function copyToClipboard() {
  navigator.clipboard.writeText(password).then(() => {
    console.log('Password copied to clipboard:', password);
    copiedIndicator.style.display='block'
  }).catch((error) => {
    console.error('Failed to copy password:', error);
    alert('Failed to copy password.');
  });
}

function calculateStrength() {
  strength = 1;
  if (options.symbols) strength += 1;
  if (options.numbers) strength += 1;
  if (length > 8) strength += 1;
  if (!options.uppercase) strength -= 1;
  if (!options.lowercase) strength -= 1;
  if (length <= 4) strength = 1;
  if (length > 4 && length < 8) strength = 2;
  if (strength < 1) strength = 1;
  if (strength > 4) strength = 4;

  updateStrengthIndicator();
}

function updateStrengthIndicator() {
  clearClassLists();
  switch (strength) {
    case 1:
      strengthIndicator.innerHTML = "Too Weak!";
      led1.classList.add("red");
      led2.classList.add("off");
      led3.classList.add("off");
      led4.classList.add("off");
      break;
    case 2:
      strengthIndicator.innerHTML = "Weak";
      led1.classList.add("orange");
      led2.classList.add("orange");
      led3.classList.add("off");
      led4.classList.add("off");
      break;
    case 3:
      strengthIndicator.innerHTML = "Medium";
      led1.classList.add("yellow");
      led2.classList.add("yellow");
      led3.classList.add("yellow");
      led4.classList.add("off");
      break;
    case 4:
      strengthIndicator.innerHTML = "Strong";
      led1.classList.add("green");
      led2.classList.add("green");
      led3.classList.add("green");
      led4.classList.add("green");
      break;
    default:
      strengthIndicator.innerHTML = "Medium";
      break;
  }
}

function clearClassLists() {
  led1.classList.remove("off", "red", "yellow", "orange", "green");
  led2.classList.remove("off", "red", "yellow", "orange", "green");
  led3.classList.remove("off", "red", "yellow", "orange", "green");
  led4.classList.remove("off", "red", "yellow", "orange", "green");
}
