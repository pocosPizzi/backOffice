import React, {useEffect, useState} from 'react';
import { 
  Box, 
  Grid, 
  makeStyles,
  Typography,
  Toolbar 
} from '@material-ui/core';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  FormWithRedirect,
  List,
  ListButton,
  NumberInput,
  required,
  SaveButton,
  SelectInput,
  TextField,
  TextInput,
  TopToolbar,
} from 'react-admin';
import { ListFilterWithDeleteds } from '../components/ListFilter';
import {EnumRadioField, EnumRadioInput } from '../components/Enums';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import springProvider from '../providers/dataProvider';
import LocalDateTimeField from '../components/LocalDateTimeField';
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
  })

);

export const ProductList = props => {

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
        <TextField source="barCode" />
        <TextField source="totalStock" />
        <EnumRadioField source="typeTotalStock"/>
        <LocalDateTimeField resource="products" source="uptededBy"/>
        <EditButton
          variant="outlined"
          color="primary"
          >
        </EditButton>
      </Datagrid>
    </List>
    )
        
  };

const ProductForm = props => {

  const [response, setRespose] = useState([{id: "0", name:"Carregando......"}])

  const getChoice = () => {

    springProvider('GET', 'categories/choice').then(res => {
      setRespose(res.data);

    });
  }

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
            style={{backgroundColor: '#124999', color: '#fff', padding: '5px'}}
            >
              <Box fontWeight="fontWeightBold" textAlign="left" m={0}>
              Produto
            </Box>

          </Typography>
          <Grid container
                spacing={3}
                alignItems="center"
                direction="row"
                justify="center">
            <Grid item xs={4}>
              
              <TextInput
                resource="products"
                source="name"
                validate={required()}
              />
              <TextInput
                resource="products"
                source="barCode"
                validate={required()}
              />
              <SelectInput
                resource="products"
                source="categoryId"
                validate={required()}
                choices={response}
              />
            </Grid>
            <Grid item xs={3}>   
              
              <NumberInput
                resource="products"
                source="totalStock"
                validate={required()}
              />
              <EnumRadioInput 
                  resource="products"
                  source="typeTotalStock"
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
                  {props.redirect === 'list' && 
                    <DeleteButton
                      style={{ marginLeft: '30px' }}
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

export const ProductEdit = props => {
  return (
    <Edit undoable={false} actions={<FormActions />} {...props}>
      <ProductForm {...props} />
    </Edit>
  );
};

export const ProductCreate = props => (
  <Create undoable="false" actions={<FormActions />} {...props}>
    <ProductForm {...props} />
  </Create>
);

const FormActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton icon={<ChevronLeft />} label="Voltar" basePath={basePath} />
  </TopToolbar>
);

export default {
  create: ProductCreate,
  edit: ProductEdit,
  list: ProductList,
  icon: BallotOutlinedIcon,
};
