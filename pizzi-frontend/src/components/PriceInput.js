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
