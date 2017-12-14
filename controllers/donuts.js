const express = require('express');
const router = express.Router();

const Donut    = require('../models/donuts');

//INDEX Route
router.get('/', async (req, res) => {
  const donuts = await Donut.find();
  res.status(200).json(donuts);
});

//NEW Route
router.post('/', async (req, res) => {
  try {
    const donut = await Donut.create(req.body);
    res.status(200).json(donut);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

//DELETE ROUTE
router.delete('/:id', async (req, res) => {
  try {
    const donut = await Donut.findByIdAndRemove(req.params.id);
    res.status(200).json(donut);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//UPDATE Route
router.put('/:id', async (req, res) => {
  try {
    const donut = await Donut.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(donut);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
