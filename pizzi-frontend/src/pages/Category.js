import React from 'react';
import { 
  Box, 
  Grid,
  makeStyles,
  Typography,
  Toolbar 
} from '@material-ui/core';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import {
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
import { ListFilterWithDeleteds } from '../components/ListFilter';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

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

export const CategoryList = props => {

  const classes = useStyles();
  
  return (
    <List
      filters={<ListFilterWithDeleteds />}
      bulkActionButtons={false}
      exporter={false}
      {...props}
    >
      <Datagrid classes={{ headerCell: classes.row }}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="createdBy" />
        <EditButton
          variant="outlined"
          color="primary"
          >
        </EditButton>
      </Datagrid>
    </List>
  )
};

const CategoryForm = props => {
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
            style={{backgroundColor: '#124999', color: '#fff', padding: '5px'}}
          >
            <Box fontWeight="fontWeightBold" textAlign="left" m={0}>
             Categoria de Produtos
            </Box>

          </Typography>
          <Grid container>
            <Grid item xs={3}>
              <TextInput
                resource="categories"
                source="name"
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

export const CategoryEdit = props => {
  return (
    <Edit undoable={false} actions={<FormActions />} {...props}>
      <CategoryForm {...props} />
    </Edit>
  );
};

export const CategoryCreate = props => (
  <Create undoable="false" actions={<FormActions />} {...props}>
    <CategoryForm {...props} />
  </Create>
);

const FormActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton icon={<ChevronLeft />} label="Voltar" basePath={basePath} />
  </TopToolbar>
);

export default {
  create: CategoryCreate,
  edit: CategoryEdit,
  list: CategoryList,
  icon: CategoryOutlinedIcon,
};
