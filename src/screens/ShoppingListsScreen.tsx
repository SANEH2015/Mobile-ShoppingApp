import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addList, deleteList } from '../features/listsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ShoppingListsScreen = () => {
  const [listName, setListName] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dispatch = useDispatch();
  const shoppingLists = useSelector((state: RootState) => state.lists.lists);
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Fade in animation when screen loads
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const saveListsToStorage = async () => {
      try {
        await AsyncStorage.setItem('@shoppingLists', JSON.stringify(shoppingLists));
      } catch (error) {
        console.error('Error saving lists:', error);
      }
    };
    saveListsToStorage();
  }, [shoppingLists]);

  useEffect(() => {
    const loadListsFromStorage = async () => {
      try {
        const storedLists = await AsyncStorage.getItem('@shoppingLists');
        if (storedLists) {
          JSON.parse(storedLists).forEach((list: any) => {
            dispatch(addList(list));
          });
        }
      } catch (error) {
        console.error('Error loading lists:', error);
      }
    };
    loadListsFromStorage();
  }, []);

  const handleAddList = () => {
    if (listName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: listName,
        items: [],
        createdAt: new Date().toISOString(),
      };
      dispatch(addList(newList));
      setListName('');
    }
  };

  const handleDeleteList = (id: string) => {
    dispatch(deleteList(id));
  };

  // Different animation approach
  const renderItem = ({ item, index }) => {
    const slideAnim = new Animated.Value(width);
    
    // Slide in from right animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    // Wobble animation on press
    const wobbleAnim = new Animated.Value(0);
    
    const handlePressIn = () => {
      Animated.sequence([
        Animated.timing(wobbleAnim, {
          toValue: -3,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(wobbleAnim, {
          toValue: 3,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(wobbleAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        })
      ]).start();
    };

    const rotate = wobbleAnim.interpolate({
      inputRange: [-3, 3],
      outputRange: ['-3deg', '3deg']
    });

    return (
      <>
     
      <AnimatedTouchable
        style={[
          styles.card,
          {
            transform: [
              { translateX: slideAnim },
              { rotate }
            ],
          },
        ]}
        onPressIn={handlePressIn}
        onPress={() => navigation.navigate('ShoppingListDetail', { listId: item.id })}
        activeOpacity={0.9}
      >
        <View style={styles.cardIconContainer}>
          <Icon name="shopping-bag" size={22} color="#b07cff" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.listName}>{item.name}</Text>
          <Text style={styles.itemCount}>
            {item.items.length} {item.items.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={() => handleDeleteList(item.id)} 
          style={styles.deleteButton}
        >
          <Icon name="delete" size={22} color="#b07cff" />
        </TouchableOpacity>
      </AnimatedTouchable>
      </>

    );
  };

  return (
    <>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Animated.Text style={[
          styles.header, 
          { 
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0]
            })}]
          }
        ]}>
          Shopping Lists
        </Animated.Text>
        <Animated.View style={[
          styles.headerAccent,
          {
            width: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100]
            })
          }
        ]} />
      </View>
      
      <Animated.View 
        style={[
          styles.inputContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            })}]
          }
        ]}
      >
        <View style={[
          styles.inputWrapper,
          isInputFocused && styles.inputWrapperFocused
        ]}>
          <Icon name="list-alt" size={20} color="#b07cff" style={styles.inputIcon} />
          <TextInput
            placeholder="Enter list name"
            value={listName}
            onChangeText={setListName}
            style={styles.input}
            placeholderTextColor="#b07cff80"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </View>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddList}
          disabled={!listName.trim()}
        >
          <Text style={styles.addButtonText}>Create</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View 
        style={{ 
          flex: 1, 
          opacity: fadeAnim,
        }}
      >
        {shoppingLists.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="shopping-cart" size={60} color="#b07cff50" />
            <Text style={styles.emptyText}>No Lists Yet</Text>
            <Text style={styles.emptySubtext}>Create your first shopping list above</Text>
          </View>
        ) : (
          <FlatList
            data={shoppingLists}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </Animated.View>
    </View>
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#b07cff',
  },
  headerAccent: {
    height: 4,
    backgroundColor: '#b07cff',
    marginTop: 8,
    borderRadius: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#b07cff',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  inputWrapperFocused: {
    borderWidth: 2,
    borderColor: '#b07cff',
    shadowColor: '#b07cff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#b07cff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efbfb6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 0,
    shadowColor: '#b07cff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  listName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default ShoppingListsScreen;