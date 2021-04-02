import ptbrMessages from 'ra-language-portuguese';

ptbrMessages.messages = {
  required: 'Preenchimento obrigatório',
  loading: 'Carregando',
  wait: 'Aguarde',
};

ptbrMessages.page = {
  empty: 'Nenhum registro encontrado',
  invite: 'Deseja criar um novo(a)?',
};

ptbrMessages.enums = {
  roles: {
    ADMIN: 'Admin',
  },

  typeTotalStock: {
    UNITY: 'Un',
    METERS: 'Mt'
  }
};

ptbrMessages.forms = {
  summary: 'Cadastro',
};

ptbrMessages.mbrnTable = {
  pagination: {
    labelDisplayedRows: '{from} - {to} de {count}',
    labelRowsSelect: 'registros',
    labelRowsPerPage: 'Registros por página:',
    firstAriaLabel: 'Primeira página',
    firstTooltip: 'Primeira página',
    previousAriaLabel: 'Página anterior',
    previousTooltip: 'Página anterior',
    nextAriaLabel: 'Próxima página',
    nextTooltip: 'Próxima página',
    lastAriaLabel: 'Última página',
    lastTooltip: 'Última página',
  },
  toolbar: {
    nRowsSelected: '{0} linha(s) selecionada',
  },
  header: {
    actions: 'Ações',
  },
  body: {
    emptyDataSourceMessage: 'Nenhum registro encontrado',
    filterRow: {
      filterTooltip: 'Filtrar',
    },
  },
};

ptbrMessages.resources = {
  users: {
    empty: ptbrMessages.page.empty,
    invite: ptbrMessages.page.invite,
    name: 'Usuário |||| Usuários',
    fields: {
      updatedAt: 'Atualizado em',
      updatedBy: 'Atualizado por',
      username: 'Login',
      name: 'Nome Completo',
      password: 'Senha',
      roles: 'Permissões',
    },
  },

  categories: {
    empty: ptbrMessages.page.empty,
    invite: ptbrMessages.page.invite,
    name: 'Categoria de Produtos |||| Categorias de Produtos',
    fields: {
      updatedAt: 'Atualizado em',
      updatedBy: 'Atualizado por',
      name: 'Categoria',
    },
  },

  products: {
    empty: ptbrMessages.page.empty,
    invite: ptbrMessages.page.invite,
    name: 'Produto |||| Produtos',
    fields: {
      updatedAt: 'Atualizado em',
      updatedBy: 'Atualizado por',
      name: 'Nome Produto',
      barCode: 'Código de Barras',
      categoryName: 'Categoria',
      purchasePrice: 'Valor de Compra',
      saleValue: 'Valor de Venda',
      totalStock: 'Total em estoque',
      typeTotalStock: 'Tipo de medida',
      categoryId: 'Categoria'
    },
  }

};

export default ptbrMessages;
