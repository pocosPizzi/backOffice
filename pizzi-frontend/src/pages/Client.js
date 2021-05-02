import React from 'react';
import { Box, Grid, makeStyles, Typography, Toolbar } from '@material-ui/core';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import {
    Create,
    Datagrid,
    DateInput,
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

export const ClientList = props => {
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
                <TextField source="cpf" />
                <TextField source="phone" />
                <TextField source="city" />
                <EditButton variant="outlined" color="primary" />
            </Datagrid>
        </List>
    );
};

const ClientForm = props => {
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
                            Clientes
                        </Box>
                    </Typography>
                    <Grid container
                        spacing={3}
                        alignItems="center"
                        direction="row"
                        justify="center"
                    >
                        <Grid item xs={4}>
                            <TextInput
                                resource='clients'
                                source="nameClient"
                                validate={required()}
                            />
                            <TextInput
                                resource='clients'
                                source="email"
                                validate={required()}
                            />
                            <TextInput
                                resource='clients'
                                source="cpf"
                                validate={required()}
                            />
                            <TextInput
                                resource='clients'
                                source="rg"
                                validate={required()}
                            />
                            <TextInput
                                resource='clients'
                                source="phone"
                                validate={required()}
                            />
                            <DateInput
                                resource='clients'
                                source="birthday"
                                validate={required()}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextInput
                                resource='clients'
                                source="uf"
                                validate={required()}
                            />
                            <TextInput
                                resource='clients'
                                source="city"
                                validate={required()}
                            />
                            <TextInput
                                resource='clients'
                                source="district"
                                validate={required()}
                            />
                            <TextInput
                                resource='clients'
                                source="street"
                                validate={required()}
                            />
                            <TextInput
                                resource='clients'
                                source="numberHouse"
                                validate={required()}
                                type='number'
                                style={{marginBottom:'73px'}}
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

export const ClientEdit = props => {
    return (
        <Edit undoable={false} actions={<FormActions />} {...props}>
            <ClientForm {...props} />
        </Edit>
    );
};

export const ClientCreate = props => (
    <Create undoable="false" actions={<FormActions />} {...props}>
        <ClientForm {...props} />
    </Create>
);

export default {
    create: ClientCreate,
    edit: ClientEdit,
    list: ClientList,
    icon: AssignmentIndOutlinedIcon,
};
