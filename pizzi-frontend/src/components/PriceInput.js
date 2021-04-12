import { func } from 'prop-types';
import React from  'react';
import { required } from 'react-admin';
import { useField } from 'react-final-form';
import InputPrice from './InputPrice';

function defineLabel (name){
    
    switch (name) {
        case 'valueService':
           return 'Valor do Serviço'
            break;
        case 'saleValue':
            return 'Valor Venda'
            break;
        case 'purchasePrice':
            return 'Valor Compra'
            break;
        default:
            break;
    }
    
}

const NumberFieldCustom = ({ name }) => {
    const {
        input: { onChange },
        meta: { touched, error }
    } = useField(name);
    
    const label = defineLabel(name);

    return (
        <InputPrice
            name={name}
            label={label}
            onChange={onChange}
            error={!!(touched && error)}
            helperText={touched && error}
        />
    );
};

const PriceInput = props => {
    const {source, resource, ...rest} = props;

    console.log(props)

    return (
        <span>
            <NumberFieldCustom resource={resource} source={source} name={props.name} validate={required()} {...rest} />
        </span>
    );
};

export default PriceInput;