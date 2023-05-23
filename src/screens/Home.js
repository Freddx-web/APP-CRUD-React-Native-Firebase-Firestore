import * as React from 'react';
import { View, Text, StyleSheet, 
    Button, StatusBar,SafeAreaView,
    ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { database } from '../../config/fb';
import Product from '../components/Product';


export default function Home() {
  //Arrays
  const [products, setProducts] = React.useState([]);
  const navigation = useNavigation();

  //Config Button Right
  

  //Get Data Firesbase
  React.useEffect(() => {
    const collectionRef = collection(database, 'products');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setProducts(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          emoji: doc.data().emoji,
          name: doc.data().name,
          price: doc.data().price,
          isSold: doc.data().isSold,
          createdAt: doc.data().createdAt,
          })
        )
      );
    });
    return unsubscribe;
    },
  [])

  return(
    <View style={style.container}>
      <ScrollView style={style.scrollView}>
        <Text h1>
          his is Pag Home / Products
        </Text>
        <Button
          onPress={() => navigation.navigate('Add')}
          title="Add"
          color="#36C425"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text>
          {products.map(product => <Product key={product.id} {...product} />)}
        </Text>  
      </ScrollView>
    </View>
  ) 
}

const style = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: "center",
    textAlign: "center",
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  }
})