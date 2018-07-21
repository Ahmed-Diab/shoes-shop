const express = require('express');
const path = require('path');
const cors = require('cors');
const config = require('./config/database');
const mongoose = require('mongoose');

// Port Number
const port = process.env.PORT || 3000;

const app = express();


// Connect To Database (OLD CODE)
mongoose.connect(config.database, { useMongoClient: true});
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+ config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+ err);
});
const product = require('./routes/product');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public/')));
app.use(cors());

app.use(express.json());
app.use('/product', product)

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+ port);
});
