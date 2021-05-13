import React from 'react';
import {makeStyles, TextField} from '@material-ui/core';
import {
  Datagrid,
  EditButton,
  List,
  NumberField,
  TextField as TextAdmin
} from 'react-admin';
import { ListFilterWithDeleteds } from '../../components/ListFilter';
import { EnumRadioField } from '../../components/Enums';
import LocalDateField from '../../components/LocalDateField';

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
          <TextAdmin resource="bills" source="name" textAlign="left"/>
          <NumberField
            resource="bills"
            source="value"
            textAlign="left"
            options={{
              style: 'currency',
              currency: 'BRL',
            }}
          />
          <LocalDateField source="dueDate" textAlign="center" />
          <EnumRadioField resource="bills" source="typeBill" textAlign="center" />
          <EnumRadioField resource="bills" source="statusBill" textAlign="center" />
          <EditButton variant="outlined" color="primary" />
        </Datagrid>
      </List>
    );
  };

  export default BillList;