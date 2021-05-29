import React from 'react';
import {connect} from 'react-redux';

import './collection.styles.scss';
import {selectCollection} from "../../redux/shop/shop.selectors";

const CollectionPage = ({collection}) =>{
    console.log(collection)
    return (
        <div className="collection-page">
            category
        </div>
    );
}

const mapStateToProps = (state,ownProps) => ({
    collection : selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
