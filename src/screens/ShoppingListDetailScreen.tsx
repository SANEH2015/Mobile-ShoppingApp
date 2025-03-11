import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToList, removeItemFromList, togglePurchasedStatus, editItemInList } from '../features/listsSlice';
import { RootState } from '../../store';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';

const ShoppingListDetailScreen = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const { listId } = route.params;
  const shoppingLists = useSelector((state: RootState) => state.lists.lists);
  const selectedList = shoppingLists.find((list) => list.id === listId);

  const handleEditItem = (item) => setEditingItem(item);
  
  const handleSaveEdit = () => {
    if (editingItem && selectedList) {
      dispatch(editItemInList({ listId: selectedList.id, itemId: editingItem.id, updatedItem: editingItem }));
      setEditingItem(null);
      Toast.show({ type: 'success', text1: 'Item updated successfully' });
    }
  };

  const handleAddItem = () => {
    if (itemName.trim() && quantity.trim() && selectedList) {
      const newItem = {
        id: Date.now().toString(),
        name: itemName,
        quantity,
        purchased: false,
      };
      dispatch(addItemToList({ listId: selectedList.id, item: newItem }));
      setItemName('');
      setQuantity('');
      Toast.show({ type: 'success', text1: 'Item added successfully' });
    } else {
      Alert.alert('Error', 'Please enter item name and quantity.');
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (selectedList) {
      dispatch(removeItemFromList({ listId: selectedList.id, itemId }));
      Toast.show({ type: 'success', text1: 'Item deleted successfully' });
    }
  };

  const handleTogglePurchased = (itemId: string) => {
    if (selectedList) {
      dispatch(togglePurchasedStatus({ listId: selectedList.id, itemId }));
    }
  };

  if (!selectedList) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>List not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedList.name}</Text>
      <TextInput
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      <Text style={styles.itemCount}>
        Items in {selectedList.name}: {selectedList.items.length}
      </Text>
      <FlatList
        data={selectedList.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>
              {item.name} (Qty: {item.quantity})
            </Text>
            <TouchableOpacity onPress={() => handleTogglePurchased(item.id)}>
              <Icon name={item.purchased ? 'check-square' : 'square'} size={24} color="#6DBE45" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditItem(item)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {editingItem && (
        <Modal visible={true} onRequestClose={() => setEditingItem(null)}>
          <View style={styles.modalContainer}>
            <TextInput
              value={editingItem.name}
              onChangeText={(text) => setEditingItem({ ...editingItem, name: text })}
              style={styles.input}
            />
            <TextInput
              value={editingItem.quantity}
              onChangeText={(text) => setEditingItem({ ...editingItem, quantity: text })}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSaveEdit} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F9',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#6DBE45',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#6DBE45',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  itemCount: {
    marginVertical: 15,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  editText: {
    color: '#2196F3',
    marginLeft: 10,
  },
  removeText: {
    color: '#F44336',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
});

export default ShoppingListDetailScreen;
