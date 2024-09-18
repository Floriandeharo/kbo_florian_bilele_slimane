import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
 
const API_BASE_URL = 'http://localhost:5000'; // Remplace par l'IP de ton ordinateur
 
const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSignUp = async () => {
    if (fullName && email && password) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
          }),
        });
 
        const data = await response.json();
 
        if (response.ok) {
          // Inscription réussie, afficher un message et rediriger
          Alert.alert('Inscription réussie', 'Vous êtes maintenant inscrit');
          navigation.navigate('Login'); // Rediriger vers la page de connexion
        } else {
          // Gestion des erreurs de l'API (ex: utilisateur déjà existant)
          Alert.alert('Erreur', data.message || 'Impossible de s\'inscrire');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Impossible de s\'inscrire au serveur');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
  };
 
  return (
<View style={styles.container}>
<Text style={styles.title}>Inscription</Text>
<TextInput
        style={styles.input}
        placeholder="Nom complet"
        value={fullName}
        onChangeText={setFullName}
      />
<TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
<TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
<Button title="S'inscrire" onPress={handleSignUp} />
<Text
        style={styles.switchText}
        onPress={() => navigation.navigate('Login')}
>
        Vous avez déjà un compte ? Connectez-vous
</Text>
</View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  },
});
 
export default SignUpScreen;
