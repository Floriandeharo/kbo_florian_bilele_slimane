const express = require('express');
const Company = require('../models/Company');
 
const router = express.Router();
 
// Rechercher par numéro d'entreprise
router.get('/companyNumber/:number', async (req, res) => {
  try {
    const company = await Company.findOne({ companyNumber: req.params.number });
    if (!company) {
      return res.status(404).json({ message: 'Entreprise non trouvée' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche', error });
  }
});
 
// Rechercher par nom d'entreprise
router.get('/name/:name', async (req, res) => {
  try {
    const companies = await Company.find({ name: new RegExp(req.params.name, 'i') });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche', error });
  }
});
 
// Rechercher par activité (activityGroup ou naceCode)
router.get('/activity', async (req, res) => {
  try {
    const { activityGroup, naceCode } = req.query;
    const query = {};
    if (activityGroup) query.activityGroup = new RegExp(activityGroup, 'i');
    if (naceCode) query.naceCode = naceCode;
 
    const companies = await Company.find(query);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche', error });
  }
});
 
// Rechercher par adresse (code postal, ville, région)
router.get('/address', async (req, res) => {
  try {
    const { postalCode, city, region } = req.query;
    const query = {};
    if (postalCode) query['address.postalCode'] = postalCode;
    if (city) query['address.city'] = new RegExp(city, 'i');
    if (region) query['address.region'] = new RegExp(region, 'i');
 
    const companies = await Company.find(query);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche', error });
  }
});
 
module.exports = router;