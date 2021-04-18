import React from 'react';
import { Box, Grid, makeStyles, Typography, Toolbar } from '@material-ui/core';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
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
import { EnumCheckboxInput, EnumField } from '../components/Enums';
import { ListFilterWithDeleteds } from '../components/ListFilter';
import FormActions from '../components/FormActions';

const useStyles = makeStyles(theme => ({
  row: {
    backgroundColor: '#124999',
    color: '#fff',
    fontWeight: 'bolder',
    fontSize: '16px',
  },
}));

export const UserList = props => {
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
        <TextField source="username" />
        <EnumField source="roles" />
        <EditButton variant="outlined" color="primary" />
      </Datagrid>
    </List>
  );
};

const UserForm = props => {
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
              Usuário
            </Box>
          </Typography>
          <Grid container spacing={4} alignItems="center" justify="center">
            <Grid item xs={3}>
              <TextInput
                resource="users"
                source="username"
                validate={required()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput resource="users" source="password" type="password" />
            </Grid>
            <Grid item xs={3}>
              <TextInput resource="users" source="name" validate={required()} />
            </Grid>
            <Grid item xs={2}>
              <EnumCheckboxInput resource="users" source="roles" />
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

export const UserEdit = props => {
  return (
    <Edit undoable={false} actions={<FormActions />} {...props}>
      <UserForm {...props} />
    </Edit>
  );
};

export const UserCreate = props => (
  <Create undoable="false" actions={<FormActions />} {...props}>
    <UserForm {...props} />
  </Create>
);

export default {
  create: UserCreate,
  edit: UserEdit,
  list: UserList,
  icon: AssignmentIndOutlinedIcon,
};
