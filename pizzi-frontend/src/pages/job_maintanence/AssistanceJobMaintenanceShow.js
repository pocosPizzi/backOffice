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

const AssistanceJobMaintenanceShow = (props) => {

    console.log(props)

    const [assistance, setAssistance] = useState(props.record.assistanceUsedResDTOS);

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
                {assistance.map(assis => (
                    <Grid key={assis.id} item xs={4} style={{border:'solid .4px', marginTop:'15px'}}>
                        <TextField
                            disabled={true}
                            value={assis.name}
                            label='Assistência'
                            variant='outlined'
                            className={classes.textField}
                        />
                        <TextField
                            disabled={true}
                            value={assis.description}
                            label='Descrição'
                            variant='outlined'
                            className={classes.textField}
                        />
                        <PriceInputMaterial
                            disabled={true}
                            value={assis.priceOnDate}
                            label='Valor da Assistência'
                            variant='outlined'
                            className={classes.textField}
                        />
                    </Grid>
                ))}
                
            </Grid>
        </>
    )
}

export default AssistanceJobMaintenanceShow;