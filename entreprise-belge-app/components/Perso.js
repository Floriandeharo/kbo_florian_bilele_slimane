import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
 
const Perso = () => {
  const navigation = useNavigation(); 
 
  return (
<View style={styles.container}>
<Text style={styles.text}>Bienvenue sur la page Perso</Text>
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
    marginBottom: 20, 
  },
});
 
export default Perso;