import React from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';

function LatexConverter(props) {

    addStyles();
    return (<StaticMathField>{props.content}</StaticMathField>)
    
    
}

export default LatexConverter;