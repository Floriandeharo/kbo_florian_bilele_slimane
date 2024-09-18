const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Company = require('../models/Company'); // Modèle pour les entreprises
 
const router = express.Router();
 
// Configurer Multer pour le téléversement
const upload = multer({ dest: 'uploads/' });
 
router.post('/upload-csv', upload.single('file'), (req, res) => {

    const filePath = req.file.path;
   
    const results = [];
   
    // Lire et parser le fichier CSV
  
    fs.createReadStream(filePath)
  
      .pipe(csv())
  
      .on('data', (data) => {
  
        // Créer un objet avec la structure appropriée pour MongoDB
  
        const company = {
  
          companyNumber: data.companyNumber,
  
          name: data.name,
  
          naceCode: data.naceCode,
  
          activityGroup: data.activityGroup,
  
          address: {
  
            street: data.street,
  
            postalCode: data.postalCode,
  
            city: data.city,
  
            region: data.region
  
          }
  
        };
  
        results.push(company);
  
      })
  
      .on('end', async () => {
  
        try {
  
          // Insertion dans MongoDB
  
          await Company.insertMany(results);
  
          res.status(200).json({ message: 'Données insérées avec succès' });
  
        } catch (error) {
  
          console.error("Erreur lors de l'insertion des données :", error);
  
          res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: error.message });
  
        }
  
      });
  
  });
  
   
module.exports = router;