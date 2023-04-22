const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
 login:{
   uid: {
    type: Number,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  }
}
});

module.exports = mongoose.model("login", loginSchema, "login");






