import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignIn({navigation}: SignUpScreenProps) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onSignIn = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      Alert.alert('알림창', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      Alert.alert('알림창', '비밀번호를 입력해주세요.');
    }
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/login`, {
        email,
        password,
      });
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken,
      );
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch, email, password]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const canGoNext = email && password;

  return (
    <View style={styles.container}>
      <View style={styles.inputZone}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력해주세요"
          onChangeText={onChangeEmail}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          keyboardType="email-address"
          blurOnSubmit={false}
          ref={emailRef}
        />
      </View>
      <View style={styles.inputZone}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해주세요"
          onChangeText={onChangePassword}
          secureTextEntry
          ref={passwordRef}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          disabled={!canGoNext}>
          <Text style={styles.ButtonText}>로그인</Text>
        </Pressable>
        <Pressable
          onPress={onSignIn}
          style={StyleSheet.compose(styles.loginButton, styles.signUpButton)}>
          <Text style={styles.ButtonText}>회원가입하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  ButtonText: {
    color: 'white',
  },
  signUpButton: {
    backgroundColor: 'red',
  },
  buttonZone: {
    margin: 10,
    alignItems: 'center',
  },
  inputZone: {
    width: 340,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    width: 200,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
  },
});
export default SignIn;
function title(title: any, arg1: string, message: any, arg3: string) {
  throw new Error('Function not implemented.');
}
