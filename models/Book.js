const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  issued: { type: Boolean, default: false },
  issueDate: Date,
  returnDate: Date,
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
