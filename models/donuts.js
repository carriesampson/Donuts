const mongoose = require('mongoose');


const donutSchema = mongoose.Schema({
  name: { type: String, required: true },
  submittedBy: { type: String, required: true },
  type: { type: String, required: true },
  frosting: { type: Boolean, required: true },
  glaze: { type: Boolean, required: true },
  sprinkles: {type: Boolean, required: true}
});

module.exports = mongoose.model('Donut', donutSchema);
