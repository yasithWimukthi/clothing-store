import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {ReactComponent as Logo} from '../../assests/crown.svg'
import './header.styles.scss';
import {auth} from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

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
                    currentUser ?
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

const mapStateToProps = state =>({
    currentUser : state.user.currentUser,
    hidden:state.cart.hidden
})

export default connect(mapStateToProps) (Header);
