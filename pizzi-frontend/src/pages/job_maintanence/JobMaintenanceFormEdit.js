import React from 'react';
import { Box, Grid, makeStyles, Typography, Toolbar } from '@material-ui/core';
import {
    DateInput,
    DeleteButton,
    FormWithRedirect,
    required,
    SaveButton,
    TextInput,
} from 'react-admin';

const useStyles = makeStyles(theme => ({
    row: {
        backgroundColor: '#124999',
        color: '#fff',
        fontWeight: 'bolder',
        fontSize: '16px',
    },
}));

const JobMaintenanceFormEdit = props => {

    const classes = useStyles();

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
                            Perfuração
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
                                resource='job-maintenance'
                                source="description"
                                validate={required()}
                            />
                            <TextInput
                                resource='job-maintenance'
                                source="observation"
                                validate={required()}
                            />
                            <DateInput
                                resource='job-maintenance'
                                source="dateJob"
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

export default JobMaintenanceFormEdit;