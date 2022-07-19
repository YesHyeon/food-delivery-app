import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/user';

// 전체상태 -> useSelector로 선택가능한
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
