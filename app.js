
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mongoosecrud', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());

const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

app.listen(3000, () => console.log('Server Started'));
