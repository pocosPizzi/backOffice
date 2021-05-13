import React from 'react';
import { Box, Grid, makeStyles, Typography, Toolbar } from '@material-ui/core';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  FormWithRedirect,
  List,
  required,
  SaveButton,
  TextField,
  TextInput,
} from 'react-admin';
import { ListFilterWithDeleteds } from '../../components/ListFilter';
import FormActions from '../../components/FormActions';

const useStyles = makeStyles(theme => ({
  row: {
    backgroundColor: '#124999',
    color: '#fff',
    fontWeight: 'bolder',
    fontSize: '16px',
  },
}));

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
        <EditButton variant="outlined" color="primary" />
      </Datagrid>
    </List>
  );
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
            gutterBottom
            style={{
              backgroundColor: '#124999',
              color: '#fff',
              padding: '5px',
            }}
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

export default {
  create: CategoryCreate,
  edit: CategoryEdit,
  list: CategoryList,
  icon: BallotOutlinedIcon,
};