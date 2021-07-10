const { Schema, model } = require("mongoose");

const neighbourhoodSchema = new Schema({
 name: String
});

const Neighbourhood = model("Neighbourhood", neighbourhoodSchema);

module.exports = Neighbourhood;