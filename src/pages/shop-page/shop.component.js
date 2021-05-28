import React,{Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CollectionPreview from "../../components/preview-collection/preview-collection.component";
import {selectCollections} from "../../redux/shop/shop.selectors";

const ShopPage = ({collections}) => {

    return (
        <div className="shop-page">
            {
                collections.map(({id, ...otherCollectionProps}) => {
                    return <CollectionPreview key={id} {...otherCollectionProps} />
                })
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    collections : selectCollections
})

export default connect(mapStateToProps)(ShopPage);
