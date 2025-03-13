import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MOBILE_BREAKPOINT = 768;

const Navigation = () => {
  const navigation = useNavigation();
  const [isSmallScreen, setIsSmallScreen] = useState(SCREEN_WIDTH < MOBILE_BREAKPOINT);
  const [menuVisible, setMenuVisible] = useState(false);

  // Update screen size state when dimensions change
  useEffect(() => {
    const updateLayout = () => {
      const newWidth = Dimensions.get('window').width;
      setIsSmallScreen(newWidth < MOBILE_BREAKPOINT);
    };

    const dimensionsHandler = Dimensions.addEventListener('change', updateLayout);

    return () => {
      dimensionsHandler.remove();
    };
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'Home', onPress: () => {
      navigation.navigate('Home');
      setMenuVisible(false);
    }},
    { name: 'Login', onPress: () => {
      navigation.navigate('Login');
      setMenuVisible(false);
    }},
    { name: 'Register', onPress: () => {
      navigation.navigate('Register');
      setMenuVisible(false);
    }},
    { name: 'Contact', onPress: () => {
      navigation.navigate('Contact');
      setMenuVisible(false);
    }},
  ];

  // Mobile menu
  const MobileMenu = () => (
    <Modal
      visible={menuVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setMenuVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setMenuVisible(false)}
      >
        <View style={styles.mobileMenuContainer}>
          <View style={styles.mobileMenu}>
            <View style={styles.mobileMenuHeader}>
              <Text style={styles.mobileMenuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.mobileNavLinks}>
              {navLinks.map((link, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={link.onPress}
                  style={styles.mobileNavLink}
                >
                  <Text style={styles.mobileNavLinkText}>{link.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.navBar}>
      <View style={styles.navLogoContainer}>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.navLogo} 
          resizeMode="contain"
        />
        <Text style={styles.appName}>Shopping List App</Text>
      </View>
      
      {!isSmallScreen && (
        <View style={styles.navLinksContainer}>
          {navLinks.map((link, index) => (
            <TouchableOpacity key={index} onPress={link.onPress} style={styles.navLink}>
              <Text style={styles.navLinkText}>{link.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {isSmallScreen && (
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
      )}
      
      <MobileMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    width: '100%',
  },
  navLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
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
    padding: 8,
  },
  // Mobile Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mobileMenuContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mobileMenu: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mobileMenuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mobileNavLinks: {
    marginTop: 20,
  },
  mobileNavLink: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mobileNavLinkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default Navigation;