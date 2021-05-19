import './App.css';
import React,{Component} from "react";
import {Switch,Route} from 'react-router-dom'
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop-page/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";

class App extends Component {

    constructor() {
        super();
        this.unsubscribe = null;
        this.state = {
            currentUser : null
        }
    }

    unsubscribeFromAuth = null;
    componentDidMount() {
        this.unsubscribe = auth.onAuthStateChanged(async userAuth =>{
            // this.setState({currentUser:user})
            // console.log(user);
            if (userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot =>{
                    this.setState({
                        currentUser: snapshot.id,
                        ...snapshot.data()
                    })
                });
            }

            this.setState({
                currentUser : userAuth
            })
        });
    }

    componentWillMount() {
        if (this.unsubscribe){
            this.unsubscribe();
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/signin" component={SignInAndSignUpPage} />
                </Switch>
            </div>
        );
    }

}

export default App;
