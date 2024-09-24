const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


router.get('/add', (req, res) => res.render('addBook'));


router.post('/add', async (req, res) => {
  const { title, author } = req.body;
  const newBook = new Book({ title, author });
  await newBook.save();
  req.flash('success_msg', 'Book added successfully');
  res.redirect('/books');
});

router.get('/issue/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('issueBook', { book });
});

router.post('/issue/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  book.issued = true;
  book.issueDate = new Date();
  book.returnDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days later
  await book.save();
  req.flash('success_msg', 'Book issued successfully');
  res.redirect('/books');
});

module.exports = router;
