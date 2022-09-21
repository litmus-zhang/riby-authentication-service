class PasswordGenerator {
    constructor(min_length, max_length) {
      this.min_length = min_length
      this.max_length = max_length
    }
    getAllASCIChars() {
      let allASCI = ""
  
      for (let i = 32; i <= 126; i++) {
        allASCI += String.fromCharCode(i);
      }
      return allASCI
  
    }
    createPassword() {
      const allChars = this.getAllASCIChars()
      const length = allChars.length
      let password=""
      for(let i =0; i < this.max_length; i++){
        password += allChars.charAt(Math.random() * length)
      }
      
      return password.toString()
    }
}

const passwordGenerator = new PasswordGenerator(8, 16)
const generatedPassword = passwordGenerator.createPassword()
module.exports = generatedPassword