const mongoose = require("mongoose")

const latexSchema = mongoose.Schema({
    latex: { type: String, required: true },
});

module.exports = mongoose.model('latexSc', latexSchema)