import React from "react";
import {connect} from 'react-redux';

import './checkout.styles.scss';
import {selectCartItems, selectCartTotal} from "../../redux/cart/cart.selectors";

const CheckoutPage = ({cartItems,total}) =>{
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>



        </div>
    )
}

const mapStateToProps = state => ({
    cartItems:selectCartItems(state),
    total: selectCartTotal(state)
})

export default connect(mapStateToProps)(CheckoutPage);