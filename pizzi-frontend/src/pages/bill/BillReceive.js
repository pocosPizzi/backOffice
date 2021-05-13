import React from 'react';
import {
  Card,
  CardContent,
} from '@material-ui/core';
import {
  Create,
} from 'react-admin';
import BillForm from './BillFormCreate';

const BillReceive = props => {
  return (
    <Card>
      <CardContent>
        <Create {...props}>
          <BillForm {...props} typeBill={"RECEIVE"} />
        </Create>
      </CardContent>
    </Card>
  )
}

export default BillReceive;
