import React from 'react';
import {
  Card,
  CardContent,
} from '@material-ui/core';
import {
  Create,
} from 'react-admin';
import BillForm from './BillFormCreate';

const BillPay = props => {
  return (
    <Card>
      <CardContent>
        <Create {...props}>
          <BillForm {...props} typeBill={"PAY"} />
        </Create>
      </CardContent>
    </Card>
  )
}

export default BillPay;