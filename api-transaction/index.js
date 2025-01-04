const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('./models/transaction.model');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/bank', { useNewUrlParser: true, useUnifiedTopology: true });


app.post('/transactions', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  });
  
  app.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
  });
  
  
app.listen(4002, () => {
  console.log('api-transaction service running on port 4002');
});


