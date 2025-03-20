const express = require('express');
const mongoose = require('mongoose');
const Account = require('./models/account.model');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/bank', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/account', async (req, res) => {
    const account = new Account({ userId: req.userId, balance: req.body.balance });
    await account.save();
    res.status(201).send(account);
  });
  
app.get('/account', async (req, res) => {
    const accounts = await Account.find({ userId: req.userId });
    res.json(accounts);
});
  

app.listen(4004, () => {
  console.log('api-account service running on port 4004');
});
