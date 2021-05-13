import React, {useState} from 'react';
import { Box, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import LocalDateField from '../../components/LocalDateField';

const useStyles = makeStyles(theme => ({
    textField: {
        margin: '10px'
    },
}));

const ClientJobMaintenanceShow = (props) => {

    console.log(props)

    const [client, setClient] = useState(props.record.clientResDTO);

    const classes = useStyles();

    return (
        <>
       
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
                    Cliente
                </Box>
            </Typography>
            <Grid container
                spacing={3}
                alignItems="center"
                direction="row"
                justify="center"
            >
                <Grid item xs={4}>
                    <TextField
                        disabled={true}
                        value={client.nameClient}
                        label='Nome'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={client.email}
                        label='Email'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={client.cpf}
                        label='CPF'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={client.rg}
                        label='RG'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={client.phone}
                        label='Telefone'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        type='date'
                        disabled={true}
                        value={client.birthday}
                        label='Data de Nascimento'
                        variant='outlined'
                        className={classes.textField}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        disabled={true}
                        value={client.uf}
                        label='UF'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={client.city}
                        label='Cidade'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={client.district}
                        label='Bairro'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={client.street}
                        label='Rua'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={client.numberHouse}
                        label='Número'
                        type='number'
                        variant='outlined'
                        className={classes.textField}
                        
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default ClientJobMaintenanceShow;