import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Button, Pressable, Alert} from 'react-native';
import orderSlice, {Order} from '../slices/order';
import {useAppDispatch} from '../store';
import axios, {Axios, AxiosError} from 'axios';
import Config from 'react-native-config';
import {iteratorSymbol} from 'immer/dist/internal';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../App';
import EncryptedStorage from 'react-native-encrypted-storage';

function EachOrder({item}: {item: Order}) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [detail, setDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const onClick = () => {
    setDetail(prev => !prev);
  };

  const onAccept = useCallback(async () => {
    if (!accessToken) {
      return;
    }
    try {
      await axios.post(
        `${Config.API_URL}/accept`,
        {orderId: item.orderId},
        {headers: {authorization: `Bearer ${accessToken}`}},
      );
      dispatch(orderSlice.actions.acceptOrder(item.orderId));
      navigation.navigate('Delivery');
    } catch (error) {
      let errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        // 타인이 이미 수락한 경우
        Alert.alert('알림', errorResponse.data.message);
        dispatch(orderSlice.actions.rejectOrder(item.orderId));
      }
    }
  }, [navigation, dispatch, item, accessToken]);

  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, [dispatch, item]);

  return (
    <View key={item.orderId}>
      <Pressable onPress={onClick}>
        <View style={styles.order}>
          <Text>닉네임 : {item.orderId}</Text>
          <Text>가격 : {item.price}원</Text>

          {detail ? (
            <>
              <Text>네이버지도</Text>
              <View style={styles.accept}>
                <Pressable
                  style={styles.onAccept}
                  onPress={onAccept}
                  disabled={loading}>
                  <Text style={styles.acceptText}>수락</Text>
                </Pressable>
                <Pressable
                  style={styles.onReject}
                  onPress={onReject}
                  disabled={loading}>
                  <Text style={styles.acceptText}>거절</Text>
                </Pressable>
              </View>
            </>
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
  accept: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onAccept: {
    width: 80,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  onReject: {
    width: 80,
    borderRadius: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  acceptText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
});
export default EachOrder;
