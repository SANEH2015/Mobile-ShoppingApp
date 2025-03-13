import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../features/authSlice';
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import Navigation from '../navigation/AppNavigator';
import Footer from '../Footer/Footer';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(Dimensions.get('window').width < 768);
  const dispatch = useDispatch();

  // Handle screen size changes
  useEffect(() => {
    const updateLayout = () => {
      setIsSmallScreen(Dimensions.get('window').width < 768);
    };
    
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      // Clean up the event listener
    };
  }, []);

  const handleRegister = () => {
    if (username.trim() && email.trim() && password.trim()) {
      dispatch(register({ username, email, password }));
      navigation.navigate('Home');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <>
    <Navigation navigation={navigation} />
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.centerWrapper}>
            {isSmallScreen ? (
              // Mobile Layout: Stacked
              <View style={styles.mobileContentContainer}>
                {/* Gradient Header for Mobile */}
                <LinearGradient
                  colors={['#f8c9aa', '#b880ff', '#9370ff']}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styles.mobileGradientHeader}
                >
                  <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>A</Text>
                  </View>
                  <Text style={styles.mobileWelcomeText}>Create Account</Text>
                </LinearGradient>

                {/* Form Section for Mobile */}
                <View style={styles.mobileFormSection}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color="#888" />
                  </TouchableOpacity>
                  
                  <View style={styles.formContainer}>
                    <Text style={styles.registerTitle}>Register</Text>
                    <Text style={styles.registerSubtitle}>Create an account to get started</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Username</Text>
                      <TextInput
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Email</Text>
                      <TextInput
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Password</Text>
                      <TextInput
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                      <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.loginContainer}>
                      <Text style={styles.accountText}>Already have an account? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              // Desktop Layout: Side by Side
              <View style={styles.desktopContentContainer}>
                {/* Left Section - Gradient (Desktop only) */}
                <LinearGradient
                  colors={['#f8c9aa', '#b880ff', '#9370ff']}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styles.leftSection}
                >
                  <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>A</Text>
                  </View>
                  <Text style={styles.welcomeText}>Create</Text>
                  <Text style={styles.backText}>Account</Text>
                </LinearGradient>

                {/* Right Section - Form (Desktop only) */}
                <View style={styles.rightSection}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color="#888" />
                  </TouchableOpacity>
                  
                  <View style={styles.formContainer}>
            
                    <Text style={styles.registerSubtitle}>Create an account to get started</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Username</Text>
                      <TextInput
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Email</Text>
                      <TextInput
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Password</Text>
                      <TextInput
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                      <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.loginContainer}>
                      <Text style={styles.accountText}>Already have an account? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerWrapper: {
    width: '100%',
    maxWidth: 600, // Reduced from 800
    height: 'auto',
    minHeight: 450, // Reduced from 550
    maxHeight: 550, // Reduced from 700
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  // Desktop Layout
  desktopContentContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  leftSection: {
    flex: 0.4, // Reduced from 1 to make it narrower
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15, // Reduced from 20
  },
  rightSection: {
    flex: 0.6, // Increased relative to leftSection
    backgroundColor: 'white',
    padding: 15, // Reduced from 20
    position: 'relative',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 30, // Reduced from 40
    color: 'white',
    alignSelf: 'flex-start',
  },
  backText: {
    fontWeight: 'bold',
    fontSize: 30, // Reduced from 40
    color: 'white',
    alignSelf: 'flex-start',
  },
  // Mobile Layout
  mobileContentContainer: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  mobileGradientHeader: {
    width: '100%',
    padding: 20, // Reduced from 25
    alignItems: 'center',
    justifyContent: 'center',
    height: 120, // Added fixed height to make it smaller
  },
  mobileWelcomeText: {
    fontWeight: 'bold',
    fontSize: 24, // Reduced from 28
    color: 'white',
    marginTop: 8, // Reduced from 10
  },
  mobileFormSection: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15, // Reduced from 20
    position: 'relative',
  },
  // Common styles
  logoContainer: {
    width: 35, // Reduced from 40
    height: 35, // Reduced from 40
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15, // Reduced from 20
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 20, // Reduced from 24
    color: '#9370ff',
  },
  backButton: {
    position: 'absolute',
    top: 15, // Reduced from 20
    right: 15, // Reduced from 20
    zIndex: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15, // Reduced from 20
  },
  registerTitle: {
    fontWeight: 'bold',
    fontSize: 22, // Reduced from 26
    color: '#333',
    marginBottom: 6, // Reduced from 8
  },
  registerSubtitle: {
    fontSize: 14, // Reduced from 16
    color: '#888',
    marginBottom: 18, // Reduced from 24
  },
  inputGroup: {
    marginBottom: 12, // Reduced from 16
  },
  inputLabel: {
    fontWeight: '500',
    fontSize: 13, // Reduced from 14
    color: '#666',
    marginBottom: 4, // Reduced from 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10, // Reduced from 12
    fontSize: 13, // Reduced from 14
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#9370ff',
    borderRadius: 8,
    padding: 12, // Reduced from 15
    alignItems: 'center',
    marginBottom: 16, // Reduced from 20
  },
  registerButtonText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 14, // Reduced from 16
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  accountText: {
    fontSize: 13, // Reduced from 14
    color: '#888',
  },
  loginText: {
    fontWeight: '600',
    fontSize: 13, // Reduced from 14
    color: '#9370ff',
  },
});

export default RegisterScreen;