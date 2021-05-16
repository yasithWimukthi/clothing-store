import React,{Component} from 'react';
import './sign-up.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    render() {

        const{displayName, email, password, confirmPassword} = this.state;

        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span> Sign up with your email and password.</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        label="Display Name"
                        required
                        onChange={this.handleChange}
                        />

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        label="Email"
                        required
                        onChange={this.handleChange}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        required
                        onChange={this.handleChange}
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm Password"
                        required
                        onChange={this.handleChange}
                    />

                    <CustomButton type="submit">Sign Up</CustomButton>

                </form>
            </div>
        )
    }
}

export default SignUp;
