import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
 
const API_BASE_URL = 'http://192.168.1.10:5000'; // Remplace par l'IP de ton serveur
 
const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('companyNumber'); // Par défaut, rechercher par numéro d'entreprise
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
 
  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    if (!searchText) {
      Alert.alert('Erreur', 'Veuillez entrer un terme de recherche.');
      return;
    }
 
    setLoading(true);
    let endpoint = '';
 
    // Construire l'endpoint de l'API en fonction du type de recherche
    if (searchType === 'companyNumber') {
      endpoint = `/api/search/companyNumber/${searchText}`;
    } else if (searchType === 'name') {
      endpoint = `/api/search/name/${searchText}`;
    } else if (searchType === 'activity') {
      endpoint = `/api/search/activity?activityGroup=${searchText}`;
    } else if (searchType === 'address') {
      endpoint = `/api/search/address?city=${searchText}`;
    }
 
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        Alert.alert('Erreur', data.message || 'Une erreur est survenue lors de la recherche');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
    } finally {
      setLoading(false);
    }
  };
 
  return (
<View style={styles.container}>
<Text style={styles.title}>Rechercher une entreprise</Text>
      {/* Barre de recherche */}
<TextInput
        style={styles.searchBar}
        placeholder="Entrez un terme de recherche"
        value={searchText}
        onChangeText={setSearchText}
      />
      {/* Sélecteur pour choisir le type de recherche */}
<View style={styles.searchTypeContainer}>
<Button title="Numéro d'entreprise" onPress={() => setSearchType('companyNumber')} />
<Button title="Nom" onPress={() => setSearchType('name')} />
<Button title="Activité" onPress={() => setSearchType('activity')} />
<Button title="Adresse" onPress={() => setSearchType('address')} />
</View>
 
      {/* Bouton de recherche */}
<Button title="Rechercher" onPress={handleSearch} />
 
      {/* Affichage des résultats */}
      {loading ? (
<Text>Recherche en cours...</Text>
      ) : (
<FlatList
          data={results}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
<View style={styles.resultItem}>
<Text>{item.name || item.companyNumber}</Text>
</View>
          )}
        />
      )}
</View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  searchTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
 
export default Home;