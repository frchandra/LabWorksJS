module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            title: String,
            timeStart: String,
            timeEnd: String,
            day: Number,
            batch: Number,
            semester: Number,
            acadYearStart: Number,
            acadYearEnd: Number,
            lab: String,
        },
        {timestamp: true}

    );

    schema.method("toJSON", function (){
        const {__v, _id, ... object} = this.toObject();
        object.id = _id;
        return object;
    })

    const Module = mongoose.model("modules", schema);
    return Module;

}