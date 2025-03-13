import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo'
import { store } from './store';
import { View, StyleSheet } from 'react-native';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ShoppingListsScreen from './src/screens/ShoppingListsScreen';
import HomeScreen from './src/screens/HomeScreen';
import ShoppingListDetailScreen from './src/screens/ShoppingListDetailScreen';
import Footer from './src/Footer/Footer'; // Import your Footer component
import Navigation from './src/navigation/AppNavigator'; // Import your Navigation component

const Stack = createStackNavigator();

// Layout component that wraps screens with Navigation and Footer
const LayoutWrapper = ({ children }) => {
  return (
    <View style={styles.container}>
      <Navigation />
      <View style={styles.content}>
        {children}
      </View>
      <Footer />
    </View>
  );
};

// Function to create a screen with the layout wrapper
const createScreenWithLayout = (Component) => {
  return (props) => (
    <LayoutWrapper>
      <Component {...props} />
    </LayoutWrapper>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Login Screen - No Layout */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login', headerShown: false }}
          />

          {/* Register Screen - No Layout */}
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Register' }}
          />
          
          {/* Home Screen - With Layout */}
          <Stack.Screen
            name="Home"
            component={createScreenWithLayout(ShoppingListsScreen)}
            options={{ title: 'Shopping Lists', headerShown: false }}
          />
          
          {/* Shopping List Detail Screen - With Layout */}
          <Stack.Screen
            name="ShoppingListDetail"
            component={createScreenWithLayout(ShoppingListDetailScreen)}
            options={{ title: 'Shopping List Detail', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  }
});