const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/bank', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
  
    if (user) {
      const token = jwt.sign({ userId: user._id }, 'secretkey');
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });


app.listen(4000, () => {
  console.log('api-auth service running on port 4000');
});
