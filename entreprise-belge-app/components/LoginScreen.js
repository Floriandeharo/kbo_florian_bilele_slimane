import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
 
const API_BASE_URL = 'http://localhost:5000'; // Remplace par l'IP de ton ordinateur
 
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleLogin = async () => {
    if (email && password) {
        console.log('email',email);
        console.log('password',password);
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
 
        const data = await response.json();
        console.log('data',data);
        if (response.ok) {
          // Connexion réussie, afficher un message et rediriger
          Alert.alert('Connexion réussie', 'Vous êtes maintenant connecté');
          navigation.navigate('Accueil'); // Rediriger vers l'accueil
        } else {
          // Gestion des erreurs de l'API (ex: utilisateur non trouvé)
          Alert.alert('Erreur', data.message || 'Impossible de se connecter');
        }
      } catch (error) {
        console.log('error',error);
        Alert.alert('Erreur', 'Impossible de se connecter au serveur');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
  };
 
  return (
<View style={styles.container}>
<Text style={styles.title}>Connexion</Text>
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
<Button title="Se connecter" onPress={handleLogin} />
<Text
        style={styles.switchText}
        onPress={() => navigation.navigate('SignUp')}
>
        Vous n'avez pas encore de compte ? Inscrivez-vous
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
 
export default LoginScreen;
