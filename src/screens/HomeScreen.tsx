import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const navigateToShoppingList = () => {
    navigation.navigate('ShoppingLists'); // Navigate to the ShoppingLists screen
  };

  return (
    <LinearGradient
      colors={['#FF6A00', '#FFB84D']} // Warm gradient for a welcoming, friendly feel
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Shopping List App</Text>
        <Image
          source={require('../../assets/favicon.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.button} onPress={navigateToShoppingList}>  
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    height: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FF6A00', // Using the same warm color for consistency
    letterSpacing: 2,
    fontFamily: 'Roboto',
    backgroundColor: '#FFF0E1', // Soft background behind the title
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  button: {
    backgroundColor: '#9370ff', // Keeping the button consistent with the gradient
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default HomeScreen;
