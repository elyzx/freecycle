const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const neighbourhoodSchema = new Schema({
 name: String

});

const Neighbourhood = model("Neighbourhood", neighbourhoodSchema);

module.exports = Neighbourhood;