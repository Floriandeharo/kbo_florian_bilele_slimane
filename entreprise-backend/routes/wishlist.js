const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Company = require('../models/Company');
 
const router = express.Router();
 
// Ajouter une entreprise à la liste de souhaits
router.post('/add/:companyId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const company = await Company.findById(req.params.companyId);
 
    if (!user || !company) {
      return res.status(404).json({ message: 'Utilisateur ou entreprise non trouvée' });
    }
 
    if (!user.wishlist.includes(company._id)) {
      user.wishlist.push(company._id);
      await user.save();
    }
 
    res.status(200).json({ message: 'Entreprise ajoutée à la liste de souhaits', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout à la liste de souhaits', error });
  }
});
 
// Supprimer une entreprise de la liste de souhaits
router.delete('/remove/:companyId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
 
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
 
    user.wishlist = user.wishlist.filter(companyId => companyId.toString() !== req.params.companyId);
    await user.save();
 
    res.status(200).json({ message: 'Entreprise retirée de la liste de souhaits', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la liste de souhaits', error });
  }
});

// Récupérer la wishlist de l'utilisateur
router.get('/user', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.userId).populate('wishlist'); // Utilise populate pour obtenir les détails des entreprises
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
   
      res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de la wishlist', error });
    }
  });
 
module.exports = router;