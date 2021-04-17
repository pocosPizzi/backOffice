import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalSeparator="."
      thousandSeparator=","
      isNumericString
      prefix="R$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedInputsPrice({ name, label, onChange, error, helperText, value }) {

  return (

    <TextField
      label={label}
      onChange={onChange}
      value={value}
      name={name}
      id="formatted-numberformat-input"
      error={error}
      helperText={helperText}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />

  );
}