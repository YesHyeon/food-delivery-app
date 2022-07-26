import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import EachOrder from '../components/EachOrder';
import {Order} from '../slices/order';
import {RootState} from '../store/reducer';

function Orders() {
  const orders = useSelector((state: RootState) => state.order.orders);

  const renderItem = ({item}: {item: Order}) => {
    return <EachOrder item={item} />;
  };
  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={item => item.orderId}
    />
  );
}

export default Orders;
