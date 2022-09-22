const mongoose = require('mongoose');

//todo: set tipe data number supaya hanya menerima integer
//todo: integrasi dengan entity students?
//todo(done): kasih default error messages
//todo(done): fix number min max
const ModuleSchema = new mongoose.Schema({
    title: {type: String, required: [true, "please add a title"], maxLength: [50, "title cannot be more than 50 characters"], index:true},
    acadYearStart: {},
    acadYearEnd: {},
    semester: {type: Number, required: [true, "please add a semester"], min:[1, "please insert semester only 1 or 2"], max:[2, "please insert semester only 1 or 2"]},
    batch: {type: Number, required: [true, "please add a batch"]},
    dateStart: {type: Date, required: [true, "please add a date start"]},
    dateEnd: {type: Date, required: [true, "please add a date end"]},
    timeStart: {
        hours: {type: Number, required: [true, "please add hours"], min: [0 , "hours must be a integer 0-23"], max: [23 , "hours must be a integer 0-23"]},
        minutes: {type: Number, required: [true, "please add minutes"], min: [0 , "hours must be a integer 0-59"], max: [59 , "hours must be a integer 0-59"]}
    },
    timeEnd: {
        hours: {type: Number, required: [true, "please add hours"], min: [0 , "hours must be a integer 0-23"], max: [23 , "hours must be a integer 0-23"]},
        minutes: {type: Number, required: [true, "please add minutes"], min: [0 , "hours must be a integer 0-59"], max: [59 , "hours must be a integer 0-59"]}
    },
    day: {type: Number, required: [true, "please add day"], min:1, max:7},
    lab: {type: String, required: [true, "please insert lab"], maxLength:50},
    quota: {type: Number, required: true},
    studentsNum: {type: Number},
    students: {type: [String]},
});

ModuleSchema.index({
    title: 1,
    timeStart: 1,
    timeEnd: 1,
    day: 1},
    {
        unique: true
    });


module.exports = mongoose.model("Module", ModuleSchema);

// module.exports = (mongoose) => {
//     const schema = mongoose.Schema(
//         {
//             title: {type: String, required: true},
//             timeStart: {type: String, required: true},
//             timeEnd: {type: String, required: true},
//             day: {type: Number, required: true},
//             batch: {type: Number, required: true},
//             semester: {type: Number, required: true},
//             acadYearStart: {type: Number, required: true},
//             acadYearEnd: {type: Number, required: true},
//             lab: {type: String, required: true},
//         },
//         {timestamp: true}
//
//     );
//
//     schema.method("toJSON", function (){
//         const {__v, _id, ... object} = this.toObject();
//         object.id = _id;
//         return object;
//     });
//
//     const Module = mongoose.model("modules", schema);
//     return Module;
//
// }