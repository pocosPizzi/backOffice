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

const ProdJobMaintenanceShow = (props) => {

    console.log(props)

    const [products, setProduct] = useState(props.record.productTempList);

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
                {products.map(prod => (
                    <Grid key={prod.id} item xs={4} style={{border:'solid .4px', marginTop:'15px'}}>
                        <TextField
                            disabled={true}
                            value={prod.name}
                            label='Produto'
                            variant='outlined'
                            className={classes.textField}
                        />
                        <TextField
                            disabled={true}
                            value={prod.totalUsed}
                            label='Total usados'
                            variant='outlined'
                            className={classes.textField}
                            type='number'
                        />
                        <PriceInputMaterial
                            disabled={true}
                            value={prod.value}
                            label='Valor Unitário do Produto na data de perfuração'
                            variant='outlined'
                            className={classes.textField}
                        />
                        <PriceInputMaterial
                            disabled={true}
                            value={prod.value*prod.totalUsed}
                            label='Soma dos Produtos '
                            variant='outlined'
                            className={classes.textField}
                        />
                    </Grid>
                ))}
                
            </Grid>
        </>
    )
}

export default ProdJobMaintenanceShow;