import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Logo} from '../../assests/crown.svg'
import './header.styles.scss';
import {auth} from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";

const Header = ({currentUser,hidden}) =>{
    return (
        <div className="header">
            <Link to="/" className="logo-container" >
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link to="/shop" className="option">SHOP</Link>
                <Link to="/shop" className="option">CONTACT</Link>
                {
                    currentUser !==null ?
                        <div className="option" onClick={()=>auth.signOut()}>SIGN OUT </div>
                        :
                        <Link to='/signin' className="option">SIGN IN</Link>
                }
                <CartIcon/>
            </div>
            {
                hidden ? null:<CartDropdown/>
            }

        </div>
    );
}

// const mapStateToProps = state =>({
//     currentUser : state.user.currentUser,
//     hidden:state.cart.hidden
// })

/** using reselect*/
const mapStateToProps = state =>({
    currentUser : selectCurrentUser(state),
    hidden:selectCartHidden(state)
})

export default connect(mapStateToProps) (Header);
