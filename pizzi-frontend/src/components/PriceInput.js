import React from 'react';
import { required } from 'react-admin';
import { useField } from 'react-final-form';
import InputPrice from './InputPrice';

function defineLabel(name) {
  switch (name) {
    case 'valueService':
      return 'Valor do Serviço';

    case 'saleValue':
      return 'Valor Venda';

    case 'purchasePrice':
      return 'Valor Compra';

    case 'value':
      return 'Valor';
    
    case 'downPayment':
      return 'Valor de Entrada'

    case 'valueMechanicalGeoCoatingMeters':
      return 'Valor Mt de Revestimento Geo Mecânico';

    case 'value0To100PerforatedMeters':
      return 'Valor Mt Perfurado 0 á 100';
    
    case 'value100To150PerforatedMeters':
      return 'Valor Mt Perfurado 100 á 150';

    case 'value150To200PerforatedMeters':
      return 'Valor Mt Perfurado 150 á 200';

    case 'value200To250PerforatedMeters':
      return 'Valor Mt Perfurado 200 á 250';

    case 'value250To300PerforatedMeters':
      return 'Valor Mt Perfurado 250 á 300';
    
    default:
      break;
  }
}

const NumberFieldCustom = ({ name }) => {
  const { value } = useField(name).input;

  const {
    input: { onChange },
    meta: { touched, error },
  } = useField(name);

  const label = defineLabel(name);

  return (
    <InputPrice
      name={name}
      label={label}
      onChange={onChange}
      value={value}
      error={!!(touched && error)}
      helperText={touched && error}
    />
  );
};

const PriceInput = props => {
  const { source, resource, ...rest } = props;

  return (
    <span>
      <NumberFieldCustom
        resource={resource}
        source={source}
        name={props.name}
        validate={required()}
        {...rest}
      />
    </span>
  );
};

export default PriceInput;
