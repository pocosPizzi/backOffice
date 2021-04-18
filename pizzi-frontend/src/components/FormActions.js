import React from  'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import {
    ListButton,
    TopToolbar,
  } from 'react-admin';

const FormActions = ({ basePath }) => (
    <TopToolbar>
      <ListButton icon={<ChevronLeft />} label="Voltar" basePath={basePath} />
    </TopToolbar>
);

export default FormActions;