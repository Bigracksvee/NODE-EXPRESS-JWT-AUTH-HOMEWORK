const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrupt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [ true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum length is 6 characters']
    }
});

//fire a function after doc saved to database
userSchema.post('save', function (doc, next) {
    console.log('new user was created and saved', doc);
    //next()
})

//fire before doc saved to database
userSchema.pre('save', function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
next();
});

 const User = mongoose.model('user', userSchema);

 module.exports = User;