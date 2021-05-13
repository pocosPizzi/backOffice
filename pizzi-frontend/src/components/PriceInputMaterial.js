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
      decimalSeparator=","
      thousandSeparator="."
      isNumericString
      prefix="R$ "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function PriceInputMaterial({
    name,
    label,
    onChange,
    value,
    disabled,
    variant,
    className
  }) {
    return (
      <TextField
        disabled={disabled}
        label={label}
        onChange={onChange}
        value={value}
        name={name}
        variant={variant}
        className={className}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        InputLabelProps={{ shrink: true }}
      />
    );
  }