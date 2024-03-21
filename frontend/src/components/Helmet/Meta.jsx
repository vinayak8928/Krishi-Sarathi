import React from 'react'
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
           <title>{title}</title> 
           <meta name='description' content={description} />
           <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To Krishi Sarathi',
    description: 'Agricultural Rental System service provides an easy way to manage and rent equipments at lesser investment for farmers. ',
    keywords: 'farmers, krishi sarathi, rental system, investment'
}

export default Meta
