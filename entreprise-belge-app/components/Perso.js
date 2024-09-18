import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import de useNavigation
 
const Perso = () => {
  const navigation = useNavigation();  // Utilisation de la navigation
 
  return (
<View style={styles.container}>
<Text style={styles.text}>Bienvenue sur la page Perso</Text>
      {/* Bouton pour naviguer vers la page Home */}
<Button title="Accueil" onPress={() => navigation.navigate('Home')} />
</View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, // Ajout d'espace avant le bouton
  },
});
 
export default Perso;