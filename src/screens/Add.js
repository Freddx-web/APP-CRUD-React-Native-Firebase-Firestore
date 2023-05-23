import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Button} from "react-native";
import EmojiPicker from 'rn-emoji-keyboard';;
import { useNavigation } from '@react-navigation/native';

import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../config/fb'

export default function Add() {
  const navigation = useNavigation();
  // Config Emoji
  const [isOpen, setIsOpen] = React.useState(true);
  const [newItem, setNewItem] = React.useState({
    emoji: '📷',
    name: '',
    price: 0,
    isSold: false,
    createdAt: new Date(),
  });
  //Selct Emoji 
  const handlePick = (emojiObject) => {
    setNewItem({
        ...newItem,
        emoji: emojiObject.emoji,
    });
  /* example emojiObject = { 
      "emoji": "❤️",
      "name": "red heart",
      "slug": "red_heart",
    }
  */
  }
  // API REST Firebase Submit
  const onSend = async () => {
    const docRef = await addDoc(collection(database, 'products'), newItem);
    navigation.goBack();
  }


  return(
    <View style={style.container}>
      
      <Text style={style.title}>
        Sell a New Product
      </Text>
      <Text style={style.emoji}>
        {newItem.emoji}
      </Text>
      <Button title='Select Emoji'onPress={() => setIsOpen(true)} />
      <EmojiPicker 
        style={style.emoji}
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)} 
      />
      <TextInput 
        onChangeText={(text) => setNewItem({...newItem, name: text})}
        placeholder='Product Name'
        style={style.inputContainer}
      />
      <TextInput 
        onChangeText={(text) => setNewItem({...newItem, price: text})}
        placeholder='$ Price'
        style={style.inputContainer}
        keyboardType='number-pad'
      />
      <Button  title='Publish' onPress={onSend} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  inputContainer: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  emoji: {
    padding:20,
    fontSize: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  }
})