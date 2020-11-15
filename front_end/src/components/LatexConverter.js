import React from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';

function LatexConverter() {

    addStyles();
    return (<StaticMathField>{'\\frac{1}{\\sqrt{2}}\\cdot 2'}</StaticMathField>)
    
    
}

export default LatexConverter;