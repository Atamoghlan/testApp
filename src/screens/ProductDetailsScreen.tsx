import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Image} from 'react-native';
import {Product} from '../types';
import axios from 'axios';

const ProductDetailsScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>();
  const [productDetails, setProductDetails] = useState<Product>();

  const getProductDetails = useCallback(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${route?.params?.id}`)
      .then(product => {
        console.log(
          '🚀 ~ getProductDetails ~ route?.params?.id:',
          route?.params?.id,
        );
        setProductDetails(product?.data);
        console.log('🚀 ~ .then ~ response:', product);
      })
      .catch(function (error) {
        console.warn('Error', error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getProductDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: productDetails?.image}} style={styles.image} />
      <Text>{productDetails?.title}</Text>
      <Text>{productDetails?.price}</Text>
      <Text>{productDetails?.description}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 100,
  },
});
