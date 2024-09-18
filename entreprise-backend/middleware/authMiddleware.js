const jwt = require('jsonwebtoken');
 
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
 
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, aucun token fourni' });
  }
 
  try {
    // On vérifie et décode le token
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    
    // On ajoute l'ID de l'utilisateur décodé à la requête pour l'utiliser dans les routes
    req.userId = decoded.userId;
    
    console.log('Token recu',token)
    console.log('decoded.userId',decoded.userId)
    console.log('req.userId',req.userId)
    next();
} catch (error) {
      console.log('Token recu',token)
    res.status(400).json({ message: 'Token invalide' });
  }
};
 
module.exports = authMiddleware;