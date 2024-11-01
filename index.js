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

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
}

// Usage example
const options = {
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
};

console.log(generatePassword(12, options)); // Generates a 12-character password with all options enabled

//slider function
const slider = document.querySelector('.input .slider input[type="range"]');

slider.oninput = function () {
  const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.backgroundSize = `${percentage}% 100%`;
};
