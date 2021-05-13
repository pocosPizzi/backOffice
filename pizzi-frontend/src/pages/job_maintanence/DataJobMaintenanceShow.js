import React, {useState} from 'react';
import { Box, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import LocalDateField from '../../components/LocalDateField';

const useStyles = makeStyles(theme => ({
    textField: {
        margin: '10px'
    },
}));

const DataJobMaintenanceShow = (props) => {

    console.log(props)

    const [maintenance, setMaintenance] = useState(props.record);

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
                    <TextField
                        type='date'
                        disabled={true}
                        value={maintenance.dateJob}
                        label='Data da Manutenção'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={maintenance.description}
                        label='Descrição'
                        variant='outlined'
                        className={classes.textField}
                        multiline={true}
                    />
                    <TextField
                        disabled={true}
                        value={maintenance.observation}
                        label='Observação'
                        variant='outlined'
                        className={classes.textField}
                    />
                   
                </Grid>
            </Grid>
        </>
    )
}

export default DataJobMaintenanceShow;