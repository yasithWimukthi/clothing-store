import './App.css';
import React,{Component} from "react";
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop-page/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {addCollectionAndDocuments, auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {checkUserSession, setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkout/checkout.component";
import {selectCollectionForPreview} from "./redux/shop/shop.selectors";
//import Redirect from "react-router-dom/es/Redirect";

class App extends Component {

    // constructor() {
    //     super();
    //     this.unsubscribe = null;
    //     this.state = {
    //         currentUser : null
    //     }
    // }

    // unsubscribeFromAuth = null;
    //     componentDidMount() {
    //
    //         const {setCurrentUser,collectionsArray} = this.props;

        // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
        //     this.setState({currentUser:user})
        //     console.log(user);
        //     if (userAuth){
        //         const userRef = await createUserProfileDocument(userAuth);
        //
        //         userRef.onSnapshot(snapshot =>{
        //             setCurrentUser({
        //                 currentUser: snapshot.id,
        //                 ...snapshot.data()
        //             })
        //         });
        //     }
        //
        //     setCurrentUser(userAuth);
        //     addCollectionAndDocuments('collections',collectionsArray.map(({title,items}) => ({title,items})));
        // });
    //}

    // componentWillMount() {
    //     if (this.unsubscribeFromAuth){
    //         this.unsubscribeFromAuth();
    //     }
    // }

    componentDidMount() {
        const {checkUserSession} = this.props;
        checkUserSession();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={ShopPage} />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route
                        exact
                        path="/signin"
                        component={SignInAndSignUpPage}
                    />
                </Switch>
            </div>
        );
    }

}

// const mapStateToProps = ({user}) => ({
//     currentUser : user.currentUser
// })

const mapStateToProps = (state) => ({
    currentUser : selectCurrentUser(state),
    collectionsArray :selectCollectionForPreview(state)
})

const mapDispatchToProps = dispatch => ({
    //setCurrentUser : user => dispatch(setCurrentUser((user)))
    checkUserSession : () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps) (App);
