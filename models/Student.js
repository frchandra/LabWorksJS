const mongoose = require('mongoose');

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
        lab: {type: [String]},
    },
    {
        strict: false
    });

StudentSchema.index({
        name: 1,
        studentId: 1,
    },
    {unique: true});


module.exports = mongoose.model("Student", StudentSchema);