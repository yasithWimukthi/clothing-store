import {takeLatest,put,all,call} from 'redux-saga/effects';

import {CartActionTypes} from './cart.types'
import {clearCart} from "./cart.actions";
import {UserActionTypes} from "../user/user.types";

export function* clearCartOnSignOut(){
    yield put(clearCart());
}

export function* onSignOutSuccess(){
    yield takeLatest(
        UserActionTypes.SIGN_OUT_SUCCESS,
        clearCartOnSignOut
    );
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess)])
}
