import React, {useState} from 'react';
import { Box, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import LocalDateField from '../../components/LocalDateField';
import PriceInputMaterial from '../../components/PriceInputMaterial';
import { TextInput } from 'ra-ui-materialui';

const useStyles = makeStyles(theme => ({
    textField: {
        margin: '10px'
    },
}));

const TotalJobPerforationShow = (props) => {

    console.log(props)

    const [perforation, setPerforation] = useState(props.record);

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
                        disabled={true}
                        value={perforation.perforatedMeters}
                        label='Metros Perfurados'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={perforation.mechanicalGeoCoatingMeters}
                        label='Metros de Revestimento Geo Mecânico'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        type='date'
                        disabled={true}
                        value={perforation.dateStartParcel}
                        label='Data da primeira Parcela'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={perforation.totalParcel}
                        label='Total de parcelas'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <PriceInputMaterial
                        disabled={true}
                        value={perforation.valueTotalJob}
                        label='Valor Total da Perfuração'
                        variant='outlined'
                        className={classes.textField}
                    />
                </Grid>
                <Grid item xs={4}>
                    <PriceInputMaterial
                        disabled={true}
                        value={perforation.valueTotalAssistance}
                        label='Valor das Assistências'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <PriceInputMaterial
                        disabled={true}
                        value={perforation.valueTotalProduct}
                        label='Valor dos Produtos'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <PriceInputMaterial
                        disabled={true}
                        value={perforation.valueTotalPerforatedMeters}
                        label='Valor dos Metros Perfurados'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <PriceInputMaterial
                        disabled={true}
                        value={perforation.valueTotalMechanicalGeoCoatingMeters}
                        label='Valor dos Metros de Revestimento Geo Mecânico'
                        variant='outlined'
                        className={classes.textField}
                        multiline={true}
                    />
                    <PriceInputMaterial
                        disabled={true}
                        value={perforation.downPayment}
                        label='Valor de Entrada'
                        variant='outlined'
                        className={classes.textField}
                    />
                    
                </Grid>
            </Grid>
        </>
    )
}

export default TotalJobPerforationShow;