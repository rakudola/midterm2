const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/amazon', {
  useNewUrlParser: true
});

// Create a scheme for products: a title and a path to an image.
const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  url: String,
  ordered: Number,
  checked: Boolean,
});

// Create a model for products in the store.
const Product = mongoose.model('Product', productSchema);

// Create a new product in the store: takes a title and a path to an image.
app.post('/api/products', async (req, res) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    url: req.body.url,
    ordered: req.body.ordered,
    checked: req.body.checked,
  });
  try {
    await product.save();
    res.send(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the products in the store.
app.get('/api/products', async (req, res) => {
  try {
    let products = await Product.find();
    res.send(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/products/:id', async(req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
  });
  try {
    product.ordered = req.body.ordered;
    await product.save();
    res.send(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/products/:id', async(req, res) => {
  try {
      await Product.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(4200, () => console.log('Server listening on port 4200!'));