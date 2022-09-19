module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            title: {type: String, required: true},
            timeStart: {type: String, required: true},
            timeEnd: {type: String, required: true},
            day: {type: Number, required: true},
            batch: {type: Number, required: true},
            semester: {type: Number, required: true},
            acadYearStart: {type: Number, required: true},
            acadYearEnd: {type: Number, required: true},
            lab: {type: String, required: true},
        },
        {timestamp: true}

    );

    schema.method("toJSON", function (){
        const {__v, _id, ... object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Module = mongoose.model("modules", schema);
    return Module;

}