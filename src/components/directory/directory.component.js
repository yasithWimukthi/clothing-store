import React,{Component} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss';
import {selectDirectorySections} from "../../redux/directory/directory.selectors";

const Directory = ({sections}) => {

    return (
        <div className="directory-menu">
            {
                sections.map(({title, imageUrl, id, size, linkUrl}) => {
                    return <MenuItem title={title} imageUrl={imageUrl} key={id} size={size} linkUrl={linkUrl}/>
                })
            }
        </div>
    );

}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps) (Directory);
