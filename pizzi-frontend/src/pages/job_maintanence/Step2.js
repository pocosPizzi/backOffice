import React, { useEffect, useState } from 'react';
import {  
    Grid, 
    TextField,
} from '@material-ui/core';

export const Step2 = ({handleChangeStep2, jobMaintenance}) => {

    return (
        <Grid container spacing={6} alignItems="center" justify="center">
            <Grid item xs={3}>
                <TextField
                    type='date'
                    onChange={handleChangeStep2}
                    label='Data da Manutenção'
                    value={jobMaintenance.dateJob}
                    InputLabelProps={{ shrink: true }}
                    name='dateJob'
                    
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    onChange={handleChangeStep2}
                    label='Descrição'
                    value={jobMaintenance.description}
                    name='description'
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    onChange={handleChangeStep2}
                    label='Observação'
                    value={jobMaintenance.observation}
                    name='observation'
                />
            </Grid>
        </Grid>
    )
}

export default Step2;