import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Toolbar } from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import {
  BooleanInput,
  DateInput,
  DeleteButton,
  Edit,
  FormWithRedirect,
  required,
  SaveButton,
  SelectInput,
  TextInput,
} from 'react-admin';
import PriceInput from '../components/PriceInput';
import FormActions from '../components/FormActions';
import { EnumRadioInput } from '../components/Enums';
import BillTab from './BillTab';
import springProvider from '../providers/dataProvider';

export const BillList = props => {

  return (
    <BillTab {...props} />
  );
};

const BillFormEdit = props => {

  const typeBill = props.record.typeBill;

  const [response, setRespose] = useState([
    { id: '0', name: 'Carregando......' },
  ]);

  const getChoice = () => {
    springProvider('GET', 'clients/choice').then(res => {
      setRespose(res.data);
    });
  };

  useEffect(() => {
    getChoice();
  }, []);

  console.log(props.record.typeBill)

  return (
    <FormWithRedirect
      {...props}
      redirect="list"
      render={formProps => (
        <form onSubmit={formProps.submit}>
          <Typography
            variant="h6"
            align="left"
            gutterBottom
            style={{
              backgroundColor: '#124999',
              color: '#fff',
              padding: '5px',
            }}
          >
            <Box fontWeight="fontWeightBold" textAlign="left" m={0}>
              Edite de Contas
            </Box>
          </Typography>
          <Grid container spacing={4} alignItems="center" justify="center">
            {typeBill === "RECEIVE" ?
              <Grid item xs={3} style={{ marginTop: '23px' }}>
                <SelectInput
                  resource="bills"
                  source="idClient"
                  validate={required()}
                  choices={response}
                />
              </Grid> :
              <Grid item xs={3} style={{ marginTop: '23px' }}>
                <TextInput
                  resource="bills"
                  source="beneficiary"
                  validate={required()}
                />
              </Grid>
            }

            <Grid item xs={1} >
              <PriceInput
                resource="bills"
                placeholder="bills"
                source="value"
                name="value"
                validate={required()}
              />
            </Grid>
            <Grid item xs={2} style={{ marginTop: '23px' }}>
              <DateInput
                resource="bills"
                source="dueDate"
                validate={required()}
              />
            </Grid>
            <Grid item xs={2} style={{ marginTop: '50px' }}>
              <BooleanInput
                resource="bills"
                source="isPaid"
                validate={required()}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={3} style={{ marginTop: '23px' }}>
              <TextInput
                resource="bills"
                source="description"
                validate={required()}
                multiline
              />
            </Grid>
            <Grid item xs={3} style={{ marginTop: '23px' }}>
              <EnumRadioInput
                resource="bills"
                source="typeBill"
                validate={required()}
                defaultValue={props.typeBill}
                disabled={true}
              />
            </Grid>
          </Grid>
          <Toolbar disableGutters>
            <Box display="flex" justifyContent="space-between" width="100%">
              <div style={{ padding: '16px', margin: '5px' }}>
                <SaveButton
                  saving={formProps.saving}
                  handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                />
                {props.redirect === 'list' && (
                  <DeleteButton
                    style={{ marginLeft: '30px' }}
                    record={formProps.record}
                    resource={formProps.resource}
                    basePath={formProps.basePath}
                    undoable={false}
                  />
                )}
              </div>
            </Box>
          </Toolbar>
        </form>
      )}
    />
  );
};

export const BillEdit = props => {
  return (
    <Edit undoable={false} actions={<FormActions />} {...props}>
      <BillFormEdit {...props} />
    </Edit>
  );
};

export default {
  edit: BillEdit,
  list: BillList,
  icon: MonetizationOnOutlinedIcon,
};
