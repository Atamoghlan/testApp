import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {Product} from '../types';
import axios from 'axios';

const testID = 'ProductsScreen';

const ProductsScreen = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>();
  const [productsList, setProductsList] = useState<Array<Product>>([]);

  const getProductsList = useCallback(() => {
    setLoading(true);
    axios
      .get('https://fakestoreapi.com/products/')
      .then(list => {
        setProductsList(list?.data);
      })
      .catch(function (error) {
        console.warn('Error', error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getProductsList();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        testID={testID + ':ScrollView'}
        contentContainerStyle={styles.contentContainer}>
        {productsList?.map((product, index) => (
          <Pressable
            onPress={() =>
              navigation?.navigate('ProductDetailsScreen', {id: product?.id})
            }
            key={product?.id + index}
            style={styles.card}>
            <Text>{product?.title}</Text>
            <Image source={{uri: product?.image}} style={styles.image} />
            <Text>{product?.price}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {padding: 16},
  card: {},
  image: {
    width: '100%',
    height: 100,
  },
});
