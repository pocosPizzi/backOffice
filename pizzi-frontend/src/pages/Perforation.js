import React, {useState} from 'react';
import { 
  Box, 
  Grid,
  makeStyles,
  Typography,
  Toolbar 
} from '@material-ui/core';
import OpacityOutlinedIcon from '@material-ui/icons/OpacityOutlined';import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  FormWithRedirect,
  List,
  ListButton,
  required,
  SaveButton,
  TextField,
  TextInput,
  TopToolbar,
} from 'react-admin';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { ListFilterWithDeleteds } from '../components/ListFilter';
import ChevronLeft from '@material-ui/icons/ChevronLeft'


const useStyles = makeStyles(theme => ({

    typography: {
      backgroundColor: 'primary',
      color: "#fff",
      fontWeight: 'bolder',
      fontSize: '16px'
    },

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
      actionsContainer: {
        marginBottom: theme.spacing(2),
      },
      resetContainer: {
        padding: theme.spacing(3),
      },

  })

);

function getSteps() {
    return ['Dados do Cliente', 'Dados de Endereço', 'Dados do Poço'];
  }
  
function getStepContent(step) {
switch (step) {
    case 0:
    return (
        <Grid 
            container
            spacing={6}
            alignItems="center"
            justify="center"
        >
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="nameClient"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="cpf"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="rg"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="birthday"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="phone"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="email"
                    validate={required()}
                />
            </Grid>
        </Grid>)
    case 1:
    return (
        <Grid 
            container
            spacing={6}
            alignItems="center"
            justify="center"
        >
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="uf"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="city"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="district"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="street"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="numberHouse"
                    validate={required()}
                />
            </Grid>
        </Grid>)
    case 2:
    return (
        <Grid 
            container
            spacing={6}
            alignItems="center"
            justify="center"
        >
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="description"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="perforatedMeters"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="observation"
                    validate={required()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextInput
                    resource="perforations"
                    source="valueService"
                    validate={required()}
                />
            </Grid>
        </Grid>)
    default:
    return 'Unknown step';
}
}

export const PerforationList = props => {

  const classes = useStyles();
  
  return (
    <List
      filters={<ListFilterWithDeleteds />}
      bulkActionButtons={false}
      exporter={false}
      {...props}
    >
      <Datagrid classes={{ headerCell: classes.row }}>
        <TextField source="name" />
        <EditButton
          variant="outlined"
          color="primary"
          >
        </EditButton>
      </Datagrid>
    </List>
  )
};

const PerforationForm = props => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


  return (
    <FormWithRedirect
      {...props}
      redirect="list"
      render={formProps => (
        <form onSubmit={formProps.submit}>
            <Typography 
                variant="h6" 
                align="left" 
                gutterBottom={true}
                style={{backgroundColor: '#124999', color: '#fff' }}
          >
            <Box fontWeight="fontWeightBold" textAlign="left" m={1}>
                Perfuração
            </Box>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                    <Step key={label} >
                        <StepLabel style={{completed: classes.row}}>{label}</StepLabel>
                        <StepContent >
                            <Typography >{getStepContent(index)}</Typography>
                            <div>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        style={{color: '#124999' }}
                                        onClick={handleNext}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Próxima'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0}>
                    <Typography style={{marginLeft: '10px' }}>Todas as etapas estão completas</Typography>
                    <Button onClick={handleReset} style={{color: '#f44336' }}>
                        Resetar
                    </Button>
                    </Paper>
                )}
            </div>
            </Typography>
            <Toolbar disableGutters>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <div style={{ padding: '16px', margin: '5px' }}>
                    <SaveButton
                        saving={formProps.saving}
                        handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                        style={{backgroundColor: '#124999' }}
                    />
                    {props.redirect === 'list' && 
                        <DeleteButton
                            style={{ marginLeft: '30px', color: '#f44336' }}
                            record={formProps.record}
                            resource={formProps.resource}
                            basePath={formProps.basePath}
                            undoable={false}
                        />
                    }
                    </div>
                </Box>
            </Toolbar>
        </form>
      )}
    />
  );
};

export const PerforationEdit = props => {
  return (
    <Edit undoable={false} actions={<FormActions />} {...props}>
      <PerforationForm {...props} />
    </Edit>
  );
};

export const PerforationCreate = props => (
  <Create undoable="false" actions={<FormActions />} {...props}>
    <PerforationForm {...props} />
  </Create>
);

const FormActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton style={{color: '#124999'}} icon={<ChevronLeft />} label="Voltar" basePath={basePath} />
  </TopToolbar>
);

export default {
  create: PerforationCreate,
  edit: PerforationEdit,
  list: PerforationList,
  icon: OpacityOutlinedIcon,
};
