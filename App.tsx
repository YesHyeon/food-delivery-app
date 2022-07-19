import * as React from 'react';
import {Provider} from 'react-redux';
import AppInner from './AppInner';
import store from './src/store';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

function App() {
  // Provider 밖에선 useSelector 쓰지못함
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
