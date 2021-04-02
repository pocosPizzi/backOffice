import React from 'react';
import { TextInput, Filter } from 'react-admin';

export const ListFilterWithDeleteds = props => (
  <Filter {...props}>
    <TextInput label="Pesquisar" source="q" alwaysOn />
  </Filter>
);

export default props => (
  <Filter {...props}>
    <TextInput label="Pesquisar" source="q" alwaysOn />
  </Filter>
);
