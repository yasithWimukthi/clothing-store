import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Logo} from '../../assests/crown.svg'
//import './header.styles.scss';
import {auth} from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer} from "./header.styles";
import {signOutStart} from "../../redux/user/user.actions";

const Header = ({currentUser,hidden,signOutStart}) =>{
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop" >SHOP</OptionLink>
                <OptionLink to="/shop">CONTACT</OptionLink>
                {
                    currentUser !==null ?
                        <OptionDiv onClick={signOutStart}>SIGN OUT </OptionDiv>
                        :
                        <OptionLink to='/signin' >SIGN IN</OptionLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {
                hidden ? null:<CartDropdown/>
            }

        </HeaderContainer>
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

const mapDispatchToProps = dispatch => ({
    signOutStart : () => dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps) (Header);
