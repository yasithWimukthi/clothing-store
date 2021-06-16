import React, {useState} from 'react';
import {connect} from 'react-redux';

import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {googleSignInStart, emailSignInStart} from "../../redux/user/user.actions";

const SignIn = ({emailSignInStart, googleSignInStart}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const {email, password} = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();

        emailSignInStart(email, password);

        // try{
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({
        //         email:'',
        //         password:''
        //     })
        // }catch (err){
        //     console.error(err)
        // }
        //
        // this.setState({
        //     email:'',
        //     password:''
        // });
    }

    const handleChange = e => {
        const {value, name} = e.target;
        setCredentials({...userCredentials, [name]: value});
    }

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password.</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    label="email"
                    required value={email}
                    handleChange={handleChange}
                />

                <FormInput
                    name="password"
                    type="password"
                    label="password"
                    required
                    value={password}
                    handleChange={handleChange}
                />

                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Google Sign In</CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);
