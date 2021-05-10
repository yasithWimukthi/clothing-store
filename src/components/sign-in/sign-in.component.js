import React,{Component} from 'react';

import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";

class SignIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        };
    }

    handleSubmit = e =>{
        e.preventDefault();

        this.setState({
            email:'',
            password:''
        });
    }

    handleChange = e =>{
        const {value,name} = e.target;
        this.setState({[name]:value})
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password.</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        label="email"
                        required value={this.state.email}
                        handleChange={this.handleChange}
                    />
                    <label>Email</label>
                    <FormInput
                        name="password"
                        type="password"
                        label="password"
                        required
                        value={this.state.password}
                        handleChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default SignIn;
