const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {mongo} = require("mongoose");

const StudentSchema = new mongoose.Schema({
        name: {type: String, required: [true, "please add a title"], maxLength: [50, "title cannot be more than 50 characters"], index:true},
        studentId: {type: String, required: [true, "please add a studentId"], maxLength: [50, "student ID cannot be more than 50 characters"], index:true},
        batch: {type: Number,
            required: [true, "please add a batch"],
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }},
        email: {type: String, required: [true, "please add a email"], maxLength: [50, "email cannot be more than 50 characters"]},
        password: {type: String, required: [true, "please add a password"]},
        phone: {type: String, required: [true, "please add a phone"], maxLength: [15, "phone cannot be more than 15 characters"]},
        labNum: {type: Number,
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }
        },
        lab: [{
            type: String,
        }],
    },
    {
        strict: false
    });

StudentSchema.index({
        name: 1,
        studentId: 1,
    },
    {unique: true});

/*
* encrypt password
* */
StudentSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

/*
* sign jwt then return
* */
StudentSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

/*
* maych user entered password to hashed password in database
* */
StudentSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}



module.exports = mongoose.model("Student", StudentSchema);