import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView  } from 'react-native';
import { Meteo, Navigation } from "./Composants/composant.js"
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

export default function App() {
  return (
      <View >
          <Navigation base={0}>
              <View style={styles.container}>
                  <Meteo/>
              </View>
              <View style={styles.container}>
                  <Text>BBB</Text>
                  <Text>BBB</Text>
               </View>
          </Navigation>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width : "90%",
    marginTop : 25,
    marginLeft : 'auto',
    marginRight : 'auto',
  },
  page1 : {
      width : "100%",
  },

});
