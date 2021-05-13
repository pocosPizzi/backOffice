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
import PriceInputMaterial from '../../components/PriceInputMaterial';

export const Step5 = ({handleChangeStep5, jobPerforation}) => {

    return (
        <Grid container spacing={6} alignItems="center" justify="center">
            
            <Grid item xs={3}>
                <PriceInputMaterial
                    disabled={true}
                    label="Valor total das Assistências"
                    value={jobPerforation.valueTotalAssistance}
                    name="valueTotalAssistance"
                />
            </Grid>
            <Grid item xs={3}>
                <PriceInputMaterial
                    disabled={true}
                    label="Valor total das Produtos"
                    value={jobPerforation.valueTotalProduct}
                    name="valueTotalProduct"
                />
            </Grid>
            <Grid item xs={3}>
                <PriceInputMaterial
                    disabled={true}
                    label="Valor total dos Metros Perfurados"
                    value={jobPerforation.valueTotalPerforatedMeters}
                    name="valueTotalPerforatedMeters"
                />
            </Grid>
            <Grid item xs={3}>
                <PriceInputMaterial
                    disabled={true}
                    label="Valor total dos Metros de Revestimento Geo Mecânico"
                    value={jobPerforation.valueTotalMechanicalGeoCoatingMeters}
                    name="valueTotalMechanicalGeoCoatingMeters"
                />
            </Grid>
            <Grid item xs={3} >
                
                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Período de parcelas</InputLabel>
                    <Select
                        value={jobPerforation.parcelPeriod}
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
                    value={jobPerforation.dateStartParcel}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    type='number'
                    onChange={handleChangeStep5}
                    label='Total de Parcelas'
                    name='totalParcel'
                    value={jobPerforation.totalParcel}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={3}>
                <PriceInputMaterial
                    label="Valor de entrada"
                    value={jobPerforation.downPayment}
                    onChange={handleChangeStep5}
                    name="downPayment"
                />
            </Grid>
            <Grid item xs={3}>
                <PriceInputMaterial
                    label="Valor total da Perfuração"
                    value={jobPerforation.valueTotalJob}
                    onChange={handleChangeStep5}
                    name="valueTotalJob"
                />
            </Grid>
        
        </Grid>
    )
}

export default Step5;