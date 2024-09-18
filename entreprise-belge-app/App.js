import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './components/Home';

import Perso from './components/Perso';
 
const Stack = createStackNavigator();
 
const App = () => {

  return (
<NavigationContainer>
<Stack.Navigator

        initialRouteName="Home"

        screenOptions={({ navigation }) => ({

          headerStyle: {

            backgroundColor: '#007BFF', // Couleur de la barre de navigation

          },

          headerTintColor: '#fff', // Couleur du texte

          headerTitleAlign: 'center', // Centrer le texte "API Entreprise"

          headerRight: () => (
<TouchableOpacity onPress={() => navigation.navigate('Perso')}>
<Icon name="user" size={25} color="#fff" style={{ marginRight: 15 }} />
</TouchableOpacity>

          ),

          headerTitle: () => (
<Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>API Entreprise</Text>

          ),

        })}
>
<Stack.Screen name="Accueil" component={Home} />
<Stack.Screen name="Perso" component={Perso} />
</Stack.Navigator>
</NavigationContainer>

  );

};
 
export default App;

 