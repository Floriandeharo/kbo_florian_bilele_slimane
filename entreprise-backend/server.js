const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
 
dotenv.config();
connectDB();
 
const app = express();
app.use(cors());
app.use(express.json());
 
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des entreprises belges.');
  });
  app.get('/test', (req, res) => {   res.send('API fonctionne correctement'); });
 
const uploadRoute = require('./routes/upload');
app.use('/api', uploadRoute);

const searchRoute = require('./routes/search');
app.use('/api/search', searchRoute);

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

const wishlistRoute = require('./routes/wishlist');
app.use('/api/wishlist', wishlistRoute);