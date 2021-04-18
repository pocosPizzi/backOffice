import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Toolbar
} from '@material-ui/core';
import {
    BooleanInput,
    DateInput,
    FormWithRedirect,
    required,
    SaveButton,
    TextInput,
} from 'react-admin';
import PriceInput from '../components/PriceInput';
import { EnumRadioInput } from '../components/Enums';

const BillForm = props => {

    const typeBill = props.typeBill === 'PAY' ? 'Pagar' : 'Receber';

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
                            {`Criar Conta á ${typeBill}`}
                        </Box>
                    </Typography>
                    <Grid container spacing={4} alignItems="center" justify="center">
                        <Grid item xs={3} style={{ marginTop: '23px' }}>
                            <TextInput
                                resource="bills"
                                source="beneficiary"
                                validate={required()}
                            />
                        </Grid>
                        <Grid item xs={1} >
                            <PriceInput
                                resource="bills"
                                placeholder="bills"
                                source="value"
                                name="value"
                                validate={required()}
                            />
                        </Grid>
                        <Grid item xs={2} style={{ marginTop: '23px' }}>
                            <DateInput
                                resource="bills"
                                source="dueDate"
                                validate={required()}
                            />
                        </Grid>
                        <Grid item xs={2} style={{ marginTop: "30px" }}>
                            <EnumRadioInput
                                resource="bills"
                                source="typeBill"
                                validate={required()}
                                defaultValue={props.typeBill}
                                disabled={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={2} style={{ marginTop: "20px" }}>
                            <BooleanInput
                                resource="bills"
                                source="isPaid"
                                validate={required()}
                                defaultValue={false}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <TextInput
                                resource="bills"
                                source="description"
                                validate={required()}
                                multiline
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

export default BillForm;
