import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
import Navigation from '../navigation/AppNavigator';
import Footer from '../Footer/Footer';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
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
      // Note: In newer React Native versions, this may need to be updated
      // to use the newer API: Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username));
      navigation.navigate('Home');
    } else {
      alert('Please enter a username.');
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
                  <Text style={styles.mobileWelcomeText}>Welcome Back!</Text>
                </LinearGradient>

                {/* Form Section for Mobile */}
                <View style={styles.mobileFormSection}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color="#888" />
                  </TouchableOpacity>
                  
                  <View style={styles.formContainer}>
                    <Text style={styles.loginTitle}>Login</Text>
                    <Text style={styles.loginSubtitle}>Welcome back! Please login to your account.</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>User Name</Text>
                      <TextInput
                        placeholder="username@gmail.com"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Password</Text>
                      <TextInput
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <View style={styles.optionsRow}>
                      <View style={styles.rememberMeContainer}>
                        <View style={styles.checkbox}>
                          <View style={styles.checkboxInner}></View>
                        </View>
                        <Text style={styles.rememberMeText}>Remember Me</Text>
                      </View>
                      <TouchableOpacity>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                      <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.signupContainer}>
                      <Text style={styles.newUserText}>New User? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signupText}>Signup</Text>
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
                  <Text style={styles.welcomeText}>Welcome</Text>
                  <Text style={styles.backText}>Back!</Text>
                </LinearGradient>

                {/* Right Section - Form (Desktop only) */}
                <View style={styles.rightSection}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color="#888" />
                  </TouchableOpacity>
                  
                  <View style={styles.formContainer}>
                    <Text style={styles.loginTitle}>Login</Text>
                    <Text style={styles.loginSubtitle}>Welcome back! Please login to your account.</Text>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>User Name</Text>
                      <TextInput
                        placeholder="username@gmail.com"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Password</Text>
                      <TextInput
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#aaa"
                      />
                    </View>
                    
                    <View style={styles.optionsRow}>
                      <View style={styles.rememberMeContainer}>
                        <View style={styles.checkbox}>
                          <View style={styles.checkboxInner}></View>
                        </View>
                        <Text style={styles.rememberMeText}>Remember Me</Text>
                      </View>
                      <TouchableOpacity>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                      <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.signupContainer}>
                      <Text style={styles.newUserText}>New User? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signupText}>Signup</Text>
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
    minHeight: 400, // Reduced from 500
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
    fontSize: 28, // Reduced from 36
    color: 'white',
    alignSelf: 'flex-start',
  },
  backText: {
    fontWeight: 'bold',
    fontSize: 28, // Reduced from 36
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
  loginTitle: {
    fontWeight: 'bold',
    fontSize: 22, // Reduced from 24
    color: '#333',
    marginBottom: 6, // Reduced from 8
  },
  loginSubtitle: {
    fontSize: 13, // Reduced from 14
    color: '#888',
    marginBottom: 16, // Reduced from 20
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, // Reduced from 20
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16, // Reduced from 18
    height: 16, // Reduced from 18
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#9370ff',
    backgroundColor: '#9370ff',
    marginRight: 6, // Reduced from 8
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 8, // Reduced from 10
    height: 8, // Reduced from 10
    backgroundColor: 'white',
    borderRadius: 1,
  },
  rememberMeText: {
    fontSize: 11, // Reduced from 12
    color: '#666',
  },
  forgotPasswordText: {
    fontWeight: '500',
    fontSize: 11, // Reduced from 12
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#9370ff',
    borderRadius: 8,
    padding: 12, // Reduced from 15
    alignItems: 'center',
    marginBottom: 16, // Reduced from 20
  },
  loginButtonText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 14, // Reduced from 16
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  newUserText: {
    fontSize: 13, // Reduced from 14
    color: '#888',
  },
  signupText: {
    fontWeight: '600',
    fontSize: 13, // Reduced from 14
    color: '#9370ff',
  },
});

export default LoginScreen;