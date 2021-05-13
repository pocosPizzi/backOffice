import React from 'react';
import { makeStyles} from '@material-ui/core';
import {
    Datagrid,
    EditButton,
    NumberField,
    TextField,
    ShowButton,
} from 'react-admin';
import LocalDateField from '../../components/LocalDateField';

const useStyles = makeStyles(theme => ({
    row: {
        backgroundColor: '#124999',
        color: '#fff',
        fontWeight: 'bolder',
        fontSize: '16px',
    },
}));

const DataCustom = () => {

    const classes = useStyles();

    return (

        <Datagrid classes={{ headerCell: classes.row }}>
            <TextField source="nameClient"/>
            <NumberField
                resource="job-perforation"
                source="valueTotalJob"
                textAlign="left"
                options={{
                    style: 'currency',
                    currency: 'BRL',
                }}
            />
            <LocalDateField 
                resource="job-perforation"
                source="dateJob" 
            />
            <NumberField 
                resource="job-perforation" 
                source="perforatedMeters" 
            />
            <ShowButton  variant="outlined" color="primary" />
            <EditButton variant="outlined" color="primary" />
        </Datagrid>
    )
}

export default DataCustom;