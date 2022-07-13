import React, {useCallback, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = useCallback(() => {
    Alert.alert('알림창', '로그인 되었습니다.');
  }, []);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const canGoNext = email && password;

  return (
    <View>
      <View style={styles.inputZone}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력해주세요"
          onChangeText={onChangeEmail}
        />
      </View>
      <View>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해주세요"
          onChangeText={onChangePassword}
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
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={onSubmit} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>회원가입하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  loginButtonText: {
    color: 'white',
  },
  buttonZone: {
    alignItems: 'center',
  },
  inputZone: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
  },
});
export default SignIn;
function title(title: any, arg1: string, message: any, arg3: string) {
  throw new Error('Function not implemented.');
}
