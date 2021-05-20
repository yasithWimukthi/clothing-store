import React from 'react';
import {connect} from 'react-redux';

import {ReactComponent as ShoppingIcon} from '../../assests/shopping-bag.svg';
import {CartActionTypes} from '../../redux/cart/cart.types';
import {toggleCartHidden} from "../../redux/cart/cart.actions";

import './cart-icon.styles.scss';


const CartIcon = ({toggleCartHidden}) =>{
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">0</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
})

export default connect(null,mapDispatchToProps)(CartIcon);
