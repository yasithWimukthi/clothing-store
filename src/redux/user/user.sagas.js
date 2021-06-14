import {takeLatest,put,all,call} from 'redux-saga/effects';

import {UserActionTypes} from './user.types';
import {auth, createUserProfileDocument, googleProvider,getCurrentUser} from "../../firebase/firebase.utils";
import {googleSignInFailure, googleSignInSuccess,emailSignInSuccess,emailSignInFailure} from "./user.actions";


export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument,user);
        const userSnapshot = yield userRef.get();
        yield put(
            googleSignInSuccess({id:userSnapshot.id,...userSnapshot.data})
        );
    }catch(err){
        yield put(googleSignInFailure(err));
    }
}

export function* signInWithEmail({payload:{email,password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        const userRef = yield call(createUserProfileDocument,user);
        const userSnapshot = yield userRef.get();
        yield put(
            emailSignInSuccess({id:userSnapshot.id,...userSnapshot.data})
        );
    }catch(err){
        yield put(emailSignInFailure(err));
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        const userRef = yield call(createUserProfileDocument,userAuth);
        const userSnapshot = yield userRef.get();
        yield put(
            emailSignInSuccess({id:userSnapshot.id,...userSnapshot.data})
        );
    }catch(err){
        yield put(emailSignInFailure(err));
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    );
}

export function* onEmailSignInStart(){
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    );
}

export function* onCheckUserSession(){
    yield takeLatest(
        UserActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    );
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession)
    ]);
}
