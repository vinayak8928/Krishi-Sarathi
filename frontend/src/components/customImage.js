// CustomImage.js
import React from 'react';
// import config from '../config';

const CustomImage = ({ src, ...rest }) => {
    const baseUrl = 'http://localhost:5000';
    const fullSrc = `${baseUrl}${src}`;

    return <img src={fullSrc} {...rest} />;
};

export default CustomImage;
