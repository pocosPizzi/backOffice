import React, {useState} from 'react';
import { Box, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import LocalDateField from '../../components/LocalDateField';

const useStyles = makeStyles(theme => ({
    textField: {
        margin: '10px'
    },
}));

const DataJobPerforationShow = (props) => {

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
                        value={perforation.dateJob}
                        label='Data da Perfuração'
                        variant='outlined'
                        className={classes.textField}
                    />
                    <TextField
                        disabled={true}
                        value={perforation.description}
                        label='Descrição'
                        variant='outlined'
                        className={classes.textField}
                        multiline={true}
                    />
                    <TextField
                        disabled={true}
                        value={perforation.observation}
                        label='Observação'
                        variant='outlined'
                        className={classes.textField}
                    />
                   
                </Grid>
            </Grid>
        </>
    )
}

export default DataJobPerforationShow;