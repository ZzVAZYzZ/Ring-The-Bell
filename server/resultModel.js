const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    team: {
        type: String,
        require: [true,"Team?"],
    },
    question: {
        type: String,
        require: [true,"Question"],
    },
    answer: {
        type: String,
        require: [true,"Answer"],
    },
    correct: {
        type: String,
        require: [true,"Correct"],
    },
    time: {
        type: String,
        require: [true,"Time"],
    },
},{
    timestamps: true,
})

module.exports = mongoose.model("result", resultSchema);