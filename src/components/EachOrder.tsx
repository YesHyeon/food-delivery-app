import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Button, Pressable} from 'react-native';
import {Order} from '../slices/order';

function EachOrder({item}: {item: Order}) {
  const [detail, setDetail] = useState(false);

  const onClick = () => {
    setDetail(prev => !prev);
  };

  const onAccept = useCallback(() => {}, []);
  const onReject = useCallback(() => {}, []);

  return (
    <View key={item.orderId}>
      <Pressable onPress={onClick}>
        <View style={styles.order}>
          <Text>닉네임 : {item.orderId}</Text>
          <Text>가격 : {item.price}원</Text>
          {detail ? (
            <View>
              <Pressable onPress={onAccept}>
                <Text>수락</Text>
              </Pressable>
              <Pressable onPress={onReject}>
                <Text>거절</Text>
              </Pressable>
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
