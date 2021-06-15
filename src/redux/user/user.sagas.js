import {takeLatest,put,all,call} from 'redux-saga/effects';

import {UserActionTypes} from './user.types';
import {auth, createUserProfileDocument, googleProvider,getCurrentUser} from "../../firebase/firebase.utils";
import {
    googleSignInFailure,
    googleSignInSuccess,
    emailSignInSuccess,
    emailSignInFailure,
    signOutSuccess, signOutFailure, signUpFailure, signUpSuccess
} from "./user.actions";


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

export function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({payload:{email, password,displayName}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user,additionalData:{displayName}}))
    }catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload:{user,additionalData}}){
    try{
        const userRef = yield call(createUserProfileDocument,user,additionalData);
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

export function* onSignOutStart(){
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOut
    );
}

export function* onSignUpStart(){
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        signUp
    );
}

export function* onSignUpSuccess(){
    yield takeLatest(
        UserActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUp
    );
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}
