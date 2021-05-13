import React, {useState} from 'react';
import { Box, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import PriceInputMaterial from '../../components/PriceInputMaterial';

const useStyles = makeStyles(theme => ({
    textField: {
        margin: '10px'
    },
}));

const TotalJobMaintenanceShow = (props) => {

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
                    Totais
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
                        value={maintenance.dateStartParcel}
                        label='Data da primeira Parcela'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={maintenance.totalParcel}
                        label='Total de parcelas'
                        variant='outlined'
                        className={classes.textField}
                    />
                    
                    <PriceInputMaterial
                        disabled={true}
                        value={maintenance.downPayment}
                        label='Valor de Entrada'
                        variant='outlined'
                        className={classes.textField}
                    />
                    
                </Grid>
                <Grid item xs={4}>
                    <PriceInputMaterial
                        disabled={true}
                        value={maintenance.valueTotalProduct}
                        label='Valor dos Produtos'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <PriceInputMaterial
                        disabled={true}
                        value={maintenance.valueTotalAssistance}
                        label='Valor das Assistências'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <PriceInputMaterial
                        disabled={true}
                        value={maintenance.valueTotalJob}
                        label='Valor Total da Manutenção'
                        variant='outlined'
                        className={classes.textField}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default TotalJobMaintenanceShow;