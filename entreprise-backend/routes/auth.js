const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
 
const router = express.Router();
 
// Inscription d'un utilisateur
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
 
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }
 
    const newUser = new User({
      fullName,
      email,
      password,
    });
 
    await newUser.save();
 
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error });
  }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
   
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
   
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }
   
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
  });
  
module.exports = router;