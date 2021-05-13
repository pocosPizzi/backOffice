import React, { useEffect, useState } from 'react';
import {  
    Divider,
    FormControl, 
    InputLabel, 
    Grid, 
    MenuItem,
    Select, 
    TextField,
} from '@material-ui/core';
import PriceInputMaterial from '../../components/PriceInputMaterial';

export const Step5 = ({handleChangeStep5, jobMaintenance}) => {

    return (
        <Grid container spacing={6} alignItems="center" justify="center">
            
            <Grid item xs={3}>
                <PriceInputMaterial
                    disabled={true}
                    label="Valor total das Assistências"
                    value={jobMaintenance.valueTotalAssistance}
                    name="valueTotalAssistance"
                />
            </Grid>
            <Grid item xs={3}>
                <PriceInputMaterial
                    disabled={true}
                    label="Valor total das Produtos"
                    value={jobMaintenance.valueTotalProduct}
                    name="valueTotalProduct"
                />
            </Grid>
            <Grid item xs={3} >
                
                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Período de parcelas</InputLabel>
                    <Select
                        value={jobMaintenance.parcelPeriod}
                        onChange={handleChangeStep5}
                        name={"parcelPeriod"}
                        InputLabelProps={{ shrink: true }}
                    >
                        <MenuItem value='WEEK'>Semanal</MenuItem>
                        <MenuItem value='FORTNIGHT'>Quinzenal</MenuItem>
                        <MenuItem value='MONTH'>Mensal</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <TextField
                    type='date'
                    label='Data da Primeira Parcela'
                    onChange={handleChangeStep5}
                    name='dateStartParcel'
                    value={jobMaintenance.dateStartParcel}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    type='number'
                    onChange={handleChangeStep5}
                    label='Total de Parcelas'
                    name='totalParcel'
                    value={jobMaintenance.totalParcel}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={3}>
                <PriceInputMaterial
                    label="Valor de entrada"
                    value={jobMaintenance.downPayment}
                    onChange={handleChangeStep5}
                    name="downPayment"
                />
            </Grid>
            <Grid item xs={3}>
                <PriceInputMaterial
                    label="Valor total da Perfuração"
                    value={jobMaintenance.valueTotalJob}
                    onChange={handleChangeStep5}
                    name="valueTotalJob"
                />
            </Grid>
        
        </Grid>
    )
}

export default Step5;