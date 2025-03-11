import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice'; // Your Redux action for login
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';
// Remove the useFonts import since we'll use system fonts instead

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username)); // Dispatch the login action
      navigation.navigate('Home'); // Navigate to the Home screen
    } else {
      alert('Please enter a username.');
    }
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', onPress: () => navigation.navigate('Home') },
    { name: 'Login', onPress: () => navigation.navigate('Login') },
    { name: 'Register', onPress: () => navigation.navigate('Register') },
    { name: 'Contact', onPress: () => navigation.navigate('Contact') },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <View style={styles.navLogoContainer}>
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.navLogo} 
            resizeMode="contain"
          />
          <Text style={styles.appName}>Shopping List App</Text>
        </View>
        <View style={styles.navLinksContainer}>
          {navLinks.map((link, index) => (
            <TouchableOpacity key={index} onPress={link.onPress} style={styles.navLink}>
              <Text style={styles.navLinkText}>{link.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Center container wrapper */}
          <View style={styles.centerWrapper}>
            {/* Split Screen Layout */}
            <View style={styles.contentContainer}>
              {/* Left Section - Gradient Background */}
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

              {/* Right Section - Login Form */}
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
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <View style={styles.footerLogoSection}>
            <Image 
              source={require('../../assets/icon.png')} 
              style={styles.footerLogo}
              resizeMode="contain" 
            />
            <Text style={styles.footerCompanyName}>Your Company</Text>
            <Text style={styles.footerTagline}>Creating amazing experiences</Text>
          </View>
          <View style={styles.footerLinksSection}>
            <View style={styles.footerLinkColumn}>
              <Text style={styles.footerLinkHeader}>Company</Text>
              <TouchableOpacity><Text style={styles.footerLink}>About Us</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>Our Team</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>Careers</Text></TouchableOpacity>
            </View>
            <View style={styles.footerLinkColumn}>
              <Text style={styles.footerLinkHeader}>Support</Text>
              <TouchableOpacity><Text style={styles.footerLink}>Help Center</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>FAQ</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>Contact Us</Text></TouchableOpacity>
            </View>
            <View style={styles.footerLinkColumn}>
              <Text style={styles.footerLinkHeader}>Legal</Text>
              <TouchableOpacity><Text style={styles.footerLink}>Privacy Policy</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>Terms of Service</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>Cookie Policy</Text></TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>© {new Date().getFullYear()} Your Company. All rights reserved.</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-facebook" size={20} color="#9370ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-twitter" size={20} color="#9370ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-instagram" size={20} color="#9370ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-linkedin" size={20} color="#9370ff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

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
    paddingVertical: 40,
  },
  // Navigation Bar Styles
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  navLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 180,
  },
  navLogo: {
    height: 35,
    width: 35,
    marginRight: 8,
  },
  appName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  navLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginHorizontal: 15,
  },
  navLinkText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#333',
  },
  menuButton: {
    display: 'none', // Hidden by default, will be shown on smaller screens
  },
  // Footer Styles
  footer: {
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 30,
  },
  footerTop: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  footerLogoSection: {
    flex: 1,
    marginRight: 20,
  },
  footerLogo: {
    height: 40,
    width: 120,
    marginBottom: 10,
  },
  footerCompanyName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  footerTagline: {
    fontSize: 14,
    color: '#666',
  },
  footerLinksSection: {
    flex: 2,
    flexDirection: 'row',
  },
  footerLinkColumn: {
    flex: 1,
    paddingLeft: 20,
  },
  footerLinkHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  footerLink: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  copyright: {
    fontSize: 12,
    color: '#888',
  },
  socialLinks: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  // Existing styles with font improvements
  centerWrapper: {
    width: width * 0.9,
    maxWidth: 800,
    height: height * 0.8,
    maxHeight: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    alignSelf: 'flex-start',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#9370ff',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-start',
    letterSpacing: 0.5,
  },
  backText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-start',
    letterSpacing: 0.5,
  },
  rightSection: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#333',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: '500',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#9370ff',
    backgroundColor: '#9370ff',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  rememberMeText: {
    fontSize: 12,
    color: '#666',
  },
  forgotPasswordText: {
    fontWeight: '500',
    fontSize: 12,
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#9370ff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  newUserText: {
    fontSize: 14,
    color: '#888',
  },
  signupText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#9370ff',
  },
  // Add media query equivalent for responsive design
  '@media (max-width: 768px)': {
    navLinksContainer: {
      display: 'none',
    },
    menuButton: {
      display: 'flex',
    },
    footerTop: {
      flexDirection: 'column',
    },
    footerLogoSection: {
      marginBottom: 30,
    },
    footerLinksSection: {
      flexDirection: 'column',
    },
    footerLinkColumn: {
      marginBottom: 20,
      paddingLeft: 0,
    },
  },
});

export default LoginScreen;