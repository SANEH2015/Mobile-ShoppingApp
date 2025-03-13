import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

const Footer = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    Dimensions.get('window').width < 768
  );

  // Handle screen rotation and size changes
  useEffect(() => {
    const updateLayout = () => {
      setIsSmallScreen(Dimensions.get('window').width < 768);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      // Clean up the event listener
      // Note: In newer React Native versions, you may need to use the returned value from 
      // addEventListener to remove the listener instead
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  return (
    <View style={styles.footer}>
      <View style={isSmallScreen ? styles.footerTopSmall : styles.footerTop}>
        <View style={[styles.footerLogoSection, isSmallScreen && styles.footerLogoSectionSmall]}>
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.footerLogo}
            resizeMode="contain" 
          />
          <Text style={styles.footerCompanyName}>Shopping List App</Text>
          <Text style={styles.footerTagline}>Creating amazing experiences</Text>
        </View>
        <View style={isSmallScreen ? styles.footerLinksSectionSmall : styles.footerLinksSection}>
          <View style={[styles.footerLinkColumn, isSmallScreen && styles.footerLinkColumnSmall]}>
            <Text style={styles.footerLinkHeader}>Company</Text>
            <TouchableOpacity><Text style={styles.footerLink}>About Us</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Our Team</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Careers</Text></TouchableOpacity>
          </View>
          <View style={[styles.footerLinkColumn, isSmallScreen && styles.footerLinkColumnSmall]}>
            <Text style={styles.footerLinkHeader}>Support</Text>
            <TouchableOpacity><Text style={styles.footerLink}>Help Center</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>FAQ</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Contact Us</Text></TouchableOpacity>
          </View>
          <View style={[styles.footerLinkColumn, isSmallScreen && styles.footerLinkColumnSmall]}>
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
  );
};

const styles = StyleSheet.create({
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
  footerTopSmall: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  footerLogoSection: {
    flex: 1,
    marginRight: 20,
  },
  footerLogoSectionSmall: {
    marginRight: 0,
    marginBottom: 30,
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
  footerLinksSectionSmall: {
    flexDirection: 'column',
  },
  footerLinkColumn: {
    flex: 1,
    paddingLeft: 20,
  },
  footerLinkColumnSmall: {
    paddingLeft: 0,
    marginBottom: 20,
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
});

export default Footer;