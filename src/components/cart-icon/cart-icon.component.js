import React from 'react';
import {connect} from 'react-redux';

import {ReactComponent as ShoppingIcon} from '../../assests/shopping-bag.svg';
import {CartActionTypes} from '../../redux/cart/cart.types';
import {toggleCartHidden} from "../../redux/cart/cart.actions";

import './cart-icon.styles.scss';
import {selectCartItemCount} from "../../redux/cart/cart.selectors";


const CartIcon = ({toggleCartHidden,itemCount}) =>{
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
    )
}

const mapStateToProps = (state) =>({
    itemCount : selectCartItemCount(state)
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);
