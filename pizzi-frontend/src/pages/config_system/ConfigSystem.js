import React from 'react';
import { Box, Grid, makeStyles, Typography, Toolbar } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  FormWithRedirect,
  List,
  NumberField,
  required,
  SaveButton,
  TextField,
  TextInput,
} from 'react-admin';
import { ListFilterWithDeleteds } from '../../components/ListFilter';
import PriceInput from '../../components/PriceInput';
import FormActions from '../../components/FormActions';

const useStyles = makeStyles(theme => ({
  row: {
    backgroundColor: '#124999',
    color: '#fff',
    fontWeight: 'bolder',
    fontSize: '16px',
  },
}));

export const ConfigSystemList = props => {
  const classes = useStyles();

  return (
    <List
    //   filters={<ListFilterWithDeleteds />}
      bulkActionButtons={false}
      exporter={false}
      {...props}
    >
      <Datagrid classes={{ headerCell: classes.row }}>
        <NumberField
            resource="config-system"
            source="valueMechanicalGeoCoatingMeters"
            textAlign="left"
            options={{
              style: 'currency',
              currency: 'BRL',
            }}
          />
        <NumberField
        resource="config-system"
        source="valuePerforatedMeters"
        textAlign="left"
        options={{
            style: 'currency',
            currency: 'BRL',
        }}
        />
        <EditButton variant="outlined" color="primary" />
      </Datagrid>
    </List>
  );
};

const ConfigSystemForm = props => {
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
              Configurações
            </Box>
          </Typography>
          <Grid container spacing={4} alignItems="center" justify="center">
            <Grid item xs={3} style={{ marginTop: '23px' }}>
                <PriceInput
                    resource="config-system"
                    source="valueMechanicalGeoCoatingMeters"
                    placeholder="config-system"
                    name="valueMechanicalGeoCoatingMeters"
                    validate={required()}

                />
            
                <PriceInput
                    resource="config-system"
                    source="valuePerforatedMeters"
                    placeholder="config-system"
                    name="valuePerforatedMeters"
                    validate={required()}

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
              </div>
            </Box>
          </Toolbar>
        </form>
      )}
    />
  );
};

export const ConfigSystemEdit = props => {
  return (
    <Edit undoable={false} actions={<FormActions />} {...props}>
      <ConfigSystemForm {...props} />
    </Edit>
  );
};

export default {
  edit: ConfigSystemEdit,
  list: ConfigSystemList,
  icon: SettingsOutlinedIcon,
};
