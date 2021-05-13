import React from 'react';
import { Box, Grid, makeStyles, Typography, Toolbar } from '@material-ui/core';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import {
    Create,
    Datagrid,
    DateInput,
    DeleteButton,
    Edit,
    EditButton,
    FormWithRedirect,
    NumberField,
    List,
    required,
    SaveButton,
    TextField,
    TextInput,
} from 'react-admin';
import { ListFilterWithDeleteds } from '../../components/ListFilter';
import FormActions from '../../components/FormActions';
import PriceInput from '../../components/PriceInput';

const useStyles = makeStyles(theme => ({
    row: {
        backgroundColor: '#124999',
        color: '#fff',
        fontWeight: 'bolder',
        fontSize: '16px',
    },
}));

export const AssistanceList = props => {
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
                <TextField source="description" />
                <NumberField
                    resource="assistance"
                    source="value"
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

const AssistanceForm = props => {
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
                            Assistência
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
                                resource='assistance'
                                source="name"
                                validate={required()}
                            />
                            <TextInput
                                resource='assistance'
                                source="description"
                                validate={required()}
                            />
                            <PriceInput
                                resource="assistance"
                                placeholder="assistance"
                                source="value"
                                name="value"
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

export const AssistanceEdit = props => {
    return (
        <Edit undoable={false} actions={<FormActions />} {...props}>
            <AssistanceForm {...props} />
        </Edit>
    );
};

export const AssistanceCreate = props => (
    <Create undoable="false" actions={<FormActions />} {...props}>
        <AssistanceForm {...props} />
    </Create>
);

export default {
    create: AssistanceCreate,
    edit: AssistanceEdit,
    list: AssistanceList,
    icon: BallotOutlinedIcon,
};
