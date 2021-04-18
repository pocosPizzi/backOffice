import React from 'react';
import {makeStyles} from '@material-ui/core';
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  NumberField,
} from 'react-admin';
import { ListFilterWithDeleteds } from '../components/ListFilter';
import { EnumRadioField } from '../components/Enums';

const useStyles = makeStyles(theme => ({

  row: {
    backgroundColor: '#124999',
    color: '#fff',
    fontWeight: 'bolder',
    fontSize: '16px',
  },
}));

const BillList = props => {

    const classes = useStyles();
  
    return (
      <List
        filters={<ListFilterWithDeleteds />}
        bulkActionButtons={false}
        exporter={false}
        {...props}
      >
        <Datagrid classes={{ headerCell: classes.row }}>
          <NumberField
            resource="bills"
            source="value"
            textAlign="left"
            options={{
              style: 'currency',
              currency: 'BRL',
            }}
          />
          <DateField source="dueDate" textAlign="center" />
          <EnumRadioField resource="bills" source="typeBill" textAlign="center" />
          <EnumRadioField resource="bills" source="statusBill" textAlign="center" />
          <EditButton variant="outlined" color="primary" />
        </Datagrid>
      </List>
    );
  };

  export default BillList;