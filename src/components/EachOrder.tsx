import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Pressable} from 'react-native';
import {Order} from '../slices/order';

function EachOrder({item}: {item: Order}) {
  const [detail, setDetail] = useState(false);

  const onClick = () => {
    setDetail(prev => !prev);
  };

  return (
    <View key={item.orderId}>
      <Pressable onPress={onClick}>
        <View style={styles.order}>
          <Text>닉네임 : {item.orderId}</Text>
          <Text>가격 : {item.price}원</Text>
          {detail ? (
            <View>
              <Text>hello</Text>
            </View>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  order: {
    backgroundColor: 'skyblue',
    margin: 6,
    padding: 5,
  },
});
export default EachOrder;
