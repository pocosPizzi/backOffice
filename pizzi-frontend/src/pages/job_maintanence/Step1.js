import React, { useEffect, useState } from 'react';
import { 
    Divider,
    FormControl, 
    InputLabel, 
    Grid, 
    MenuItem,
    Select, 
    TextField,
    Typography,
} from '@material-ui/core';
import dataProvider from '../../providers/dataProvider';

const selectChoice = (choices) => {
    return (
        choices.map(choice => (
            <MenuItem key={choice.id} value={choice.id}>{choice.name}</MenuItem>
        ))
       
    )
}

export const Step1 = ({clientChoice, handleChangeStep1, client, clientChoiceCurrent}) => {

    console.log(client)

    return (
        clientChoice.length > 0 &&
        <>
            <Grid container spacing={6} alignItems="center" justify="center">
                <Grid item xs={3} >
                    <FormControl >
                        <InputLabel id="demo-simple-select-helper-label">Cliente</InputLabel>
                        <Select
                            value={clientChoiceCurrent}
                            onChange={handleChangeStep1}
                        >
                            {clientChoice.length > 0 && selectChoice(clientChoice)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label='CPF'
                        disabled={true}
                        value={client.cpf}
                    
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        disabled={true}
                        label='RG'
                        value={client.rg}
                        
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        disabled={true}
                        type=  'date'
                        label='Data de Nascimento'
                        value={client.birthday}
                        InputLabelProps={{ shrink: true }}
                        
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        disabled={true}
                        label='Telefone'
                        value={client.phone}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        disabled={true}
                        label='Email'
                        value={client.email}
                    />
                </Grid>
            </Grid>
            <Divider variant="middle" style={{margin:"40px"}}/>
            <Typography
              variant="h6"
              align="left"
              style={{
               
                marginBottom: '15px',
              }}
            >
              Endereço
            </Typography>
            <Grid container spacing={6} alignItems="center" justify="center">
                <Grid item xs={3}>
                    <TextField
                        label='UF'
                        disabled={true}
                        value={client.uf}
                    
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        disabled={true}
                        label='Cidade'
                        value={client.city}
                        
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        disabled={true}
                        label='Bairro'
                        value={client.district}
                        
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        disabled={true}
                        label='Rua'
                        value={client.street}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        disabled={true}
                        label='Número da casa'
                        value={client.numberHouse}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Step1;