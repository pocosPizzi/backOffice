import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles, Typography, Toolbar } from '@material-ui/core';
import OpacityOutlinedIcon from '@material-ui/icons/OpacityOutlined';
import {
  ArrayInput,
  Create,
  Datagrid,
  DateInput,
  DeleteButton,
  Edit,
  EditButton,
  FormWithRedirect,
  List,
  NumberField,
  NumberInput,
  required,
  SaveButton,
  SelectInput,
  SimpleFormIterator,
  TextField,
  TextInput,
} from 'react-admin';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { ListFilterWithDeleteds } from '../../components/ListFilter';
import PriceInput from '../../components/PriceInput';
import LocalDateField from '../../components/LocalDateField';
import dataProvider from '../../providers/dataProvider';
import FormActions from '../../components/FormActions';

const useStyles = makeStyles(theme => ({
  row: {
    backgroundColor: '#124999',
    color: '#fff',
    fontWeight: 'bolder',
    fontSize: '16px',
  },

  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
})
);

function getSteps() {
  return [
    'Dados do Cliente',
    'Dados de Endereço',
    'Dados da Manutenção',
    'Materiais usado',
    'Valores',
  ];
}

function getStepContent(step, choices) {
  switch (step) {
    case 0:
      return (
        <Grid container spacing={6} alignItems="center" justify="center">
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="nameClient"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="cpf"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="rg"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <DateInput
              resource="maintenance"
              source="birthday"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="phone"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="email"
              validate={required()}
            />
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <Grid container spacing={6} alignItems="center" justify="center">
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="uf"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="city"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="district"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="street"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <NumberInput
              resource="maintenance"
              source="numberHouse"
              validate={required()}
            />
          </Grid>
        </Grid>
      );
    case 2:
      return (
        <Grid container spacing={6} alignItems="center" justify="center">
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="description"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <DateInput
              resource="maintenance"
              source="dateMaintenance"
              validate={required()}
            />
          </Grid>
          <Grid item xs={3}>
            <TextInput
              resource="maintenance"
              source="observation"
              validate={required()}
            />
          </Grid>
        </Grid>
      );
    case 3:
      return (
        <Grid container spacing={1} alignItems="center" justify="center">
          <ArrayInput resource="maintenance" source="productTempList">
            <SimpleFormIterator style={{ width: '40%' }}>
              <SelectInput source="productId" choices={choices} limitChoicesToValue={true} />
              <NumberInput source="totalUsed" />
            </SimpleFormIterator>
          </ArrayInput>
        </Grid>
      );
    case 4:
      return (
        <Grid container spacing={6} alignItems="center" justify="center">
          <Grid item xs={3}>
            <PriceInput
              resource="maintenance"
              placeholder="maintenance"
              source="valueService"
              name="valueService"
              validate={required()}
            />
          </Grid>
        </Grid>
      );
    default:
      return 'Unknown step';
  }
}

export const MaintenanceList = props => {
  const classes = useStyles();

  return (
    <List
      filters={<ListFilterWithDeleteds />}
      bulkActionButtons={false}
      exporter={false}
      {...props}
    >
      <Datagrid classes={{ headerCell: classes.row }}>
        <TextField source="nameClient" />
        <TextField source="email" textAlign="center" />
        <LocalDateField source="dateMaintenance" textAlign="center" />
        <NumberField
          resource="maintenance"
          source="valueService"
          textAlign="center"
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

const MaintenanceForm = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [choice, setChoice] = useState();
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getChoice = () => {
    dataProvider('GET', `products/choice`).then(res => {
      setChoice(res.data);
    });
  };

  useEffect(() => {
    getChoice();
  }, []);

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
            style={{ backgroundColor: '#124999', color: '#fff' }}
          >
            <Box fontWeight="fontWeightBold" textAlign="left" m={1}>
              Manutenção
            </Box>
          </Typography>
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel style={{ completed: classes.row }}>
                    {label}
                  </StepLabel>
                  <StepContent>
                    <div>{getStepContent(index, choice)}</div>
                    <div>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Voltar
                        </Button>
                        <Button
                          style={{ color: '#124999' }}
                          onClick={handleNext}
                        >
                          {activeStep === steps.length - 1
                            ? 'Finalizar'
                            : 'Próxima'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0}>
                <Typography style={{ marginLeft: '10px' }}>
                  Todas as etapas estão completas
                </Typography>
                <Button onClick={handleReset} style={{ color: '#f44336' }}>
                  Resetar
                </Button>
              </Paper>
            )}
          </div>

          <Toolbar disableGutters>
            <Box display="flex" justifyContent="space-between" width="100%">
              <div style={{ padding: '16px', margin: '5px' }}>
                <SaveButton
                  saving={formProps.saving}
                  handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                  style={{ backgroundColor: '#124999' }}
                />
                {props.redirect === 'list' && (
                  <DeleteButton
                    style={{ marginLeft: '30px', color: '#f44336' }}
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

export const MaintenanceEdit = props => {
  return (
    <Edit undoable={false} actions={<FormActions />} {...props}>
      <MaintenanceForm {...props} />
    </Edit>
  );
};

export const MaintenanceCreate = props => (
  <Create undoable="false" actions={<FormActions />} {...props}>
    <MaintenanceForm {...props} />
  </Create>
);

export default {
  create: MaintenanceCreate,
  edit: MaintenanceEdit,
  list: MaintenanceList,
  icon: OpacityOutlinedIcon,
};
