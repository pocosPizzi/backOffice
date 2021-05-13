import React, { useEffect, useState } from 'react';
import {  
    Grid, 
    TextField,
} from '@material-ui/core';

export const Step2 = ({handleChangeStep2, jobPerforation}) => {

    return (
        <Grid container spacing={6} alignItems="center" justify="center">
            <Grid item xs={3}>
                <TextField
                    type='number'
                    label='Metros Perfurados'
                    onChange={handleChangeStep2}
                    value={jobPerforation.perforatedMeters}
                    name='perforatedMeters'
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type='number'
                    onChange={handleChangeStep2}
                    label='Metros de Revestimento Geo Mecânico'
                    value={jobPerforation.mechanicalGeoCoatingMeters}
                    name='mechanicalGeoCoatingMeters'
                    InputLabelProps={{ shrink: true }}
                    
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    type='date'
                    onChange={handleChangeStep2}
                    label='Data da Perfuração'
                    value={jobPerforation.dateJob}
                    InputLabelProps={{ shrink: true }}
                    name='dateJob'
                    
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    onChange={handleChangeStep2}
                    label='Descrição'
                    value={jobPerforation.description}
                    name='description'
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    onChange={handleChangeStep2}
                    label='Observação'
                    value={jobPerforation.observation}
                    name='observation'
                />
            </Grid>
        </Grid>
    )
}

export default Step2;