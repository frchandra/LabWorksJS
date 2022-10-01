const mongoose = require('mongoose');

//todo(done): set tipe data number supaya hanya menerima integer
//todo: integrasi dengan entity students?
//todo(done): kasih default error messages
//todo(done): fix number min max
const ModuleSchema = new mongoose.Schema({
    title: {type: String, required: [true, "please add a title"], maxLength: [50, "title cannot be more than 50 characters"], index:true},
    acadYearStart: {type: Number,
        required: [true, "please add a batch"],
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
    }},
    acadYearEnd: {type: Number,
        required: [true, "please add a batch"],
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
    }},
    semester: {type: Number,
        required: [true, "please add a semester"],
        min:[1, "please insert semester only 1 or 2"],
        max:[2, "please insert semester only 1 or 2"],
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    batch: {type: Number,
        required: [true, "please add a batch"],
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    dateStart: {type: Date, required: [true, "please add a date start"]},
    dateEnd: {type: Date, required: [true, "please add a date end"]},
    timeStart: {
        hours: {type: Number,
            required: [true, "please add hours"],
            min: [0 , "hours must be a integer 0-23"],
            max: [23 , "hours must be a integer 0-23"],
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }
        },
        minutes: {type: Number,
            required: [true, "please add minutes"],
            min: [0 , "hours must be a integer 0-59"],
            max: [59 , "hours must be a integer 0-59"],
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }
        }
    },
    timeStart: {
        hours: {type: Number,
            required: [true, "please add hours"],
            min: [0 , "hours must be a integer 0-23"],
            max: [23 , "hours must be a integer 0-23"],
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }
        },
        minutes: {type: Number,
            required: [true, "please add minutes"],
            min: [0 , "hours must be a integer 0-59"],
            max: [59 , "hours must be a integer 0-59"],
            validate : {
                validator : Number.isInteger,
                message   : '{VALUE} is not an integer value'
            }
        }
    },
    day: {type: Number,
        required: [true, "please add day"],
        min:1, max:7,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    lab: {type: String, required: [true, "please insert lab"], maxLength:50},
    quota: {type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    studentsNum: {type: Number,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    students: {type: [String]},
},
{
    strict: false
});

ModuleSchema.index({
    title: 1,
    batch: 1,
    day: 1},
    {
        unique: true
    });


module.exports = mongoose.model("Module", ModuleSchema);