
const mongoose = require('mongoose');
const { mailSender } = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    }

})

// function to send otp to the user
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `This is the verification Otp : ${otp}`
        )
        console.log("Email sent successfully", mailResponse);
    } catch (err) {
        console.log("Sending email failed");
    }
}


// pre process on the otp schema
otpSchema.pre('save', async function (next) {
    console.log("New document saved to the database");
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model('OTP', otpSchema);