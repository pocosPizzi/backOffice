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
    CUSTOMER: 'Funcionário'
  },

  typeTotalStock: {
    UNITY: 'Un',
    METERS: 'Mt',
  },

  sealDisplacement: {
    true: 'Sim',
    false: 'Não',
  },

  typeBill: { PAY: 'Á Pagar', RECEIVE: 'Á receber' },

  typeBillPay: { PAY: 'Á Pagar'},

  typeBillReceive: {RECEIVE: 'Á receber' },

  statusBill: {IN_LATE: 'Atrasada', RECEIVABLE: 'Aguardando receber', PAYABLE: 'Aguardando pagar', PAID: 'Paga'}
};

ptbrMessages.forms = {
  summary: 'Cadastro',
};

ptbrMessages.ra.page.create = 'Novo(a) %{name}';
ptbrMessages.ra.page.edit = '%{name}';
ptbrMessages.ra.page.show = '%{name}';
ptbrMessages.ra.page.list = 'Lista de %{name}';

ptbrMessages.ra.action.create = 'Novo(a)';

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
      createdBy: 'Criado por',
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
      categoryId: 'Categoria',
    },
  },

  perforations: {
    empty: ptbrMessages.page.empty,
    invite: ptbrMessages.page.invite,
    name: 'Perfuração |||| Perfurações',
    fields: {
      updatedAt: 'Atualizado em',
      updatedBy: 'Atualizado por',
      nameClient: 'Nome do Cliente',
      cpf: 'CPF',
      rg: 'RG',
      birthday: 'Data de nascimento',
      phone: 'Telefone',
      email: 'Email',
      uf: 'Estado',
      city: 'Cidade',
      district: 'Bairro',
      street: 'Rua',
      numberHouse: 'Número',
      description: 'Descrição',
      perforatedMeters: 'Metros Perfurados',
      observation: 'Observação',
      valueService: 'Valor da Perfuração',
      sealDisplacement: 'Deslocamento/Vedação',
      datePerforation: 'Data da Perfuração',
      mechanicalGeoCoatingMeters: 'Metros de Revestimento Geo Mecânico ',
      productTempList: 'Lista de Materiais',
      productId: 'Material',
      totalUsed: 'Total Usado',
    },
  },
  'maintenance': {
    empty: ptbrMessages.page.empty,
    invite: ptbrMessages.page.invite,
    name: 'Manutenção |||| Manutenções',
    fields: {
      updatedAt: 'Atualizado em',
      updatedBy: 'Atualizado por',
      nameClient: 'Nome do Cliente',
      cpf: 'CPF',
      rg: 'RG',
      birthday: 'Data de nascimento',
      phone: 'Telefone',
      email: 'Email',
      uf: 'Estado',
      city: 'Cidade',
      district: 'Bairro',
      street: 'Rua',
      numberHouse: 'Número',
      description: 'Descrição',
      observation: 'Observação',
      valueService: 'Valor da Manutenção',
      dateMaintenance: 'Data da Manutenção',
      productTempList: 'Lista de Materiais',
      productId: 'Material',
      totalUsed: 'Total Usado',
    },
  },
  'bills': {
    empty: ptbrMessages.page.empty,
    invite: ptbrMessages.page.invite,
    name: 'Fluxo de caixa |||| Fluxo de Caixa',
    fields: {
      updatedAt: 'Atualizado em',
      updatedBy: 'Atualizado por',
      nameClient: 'Nome do Cliente',
      typeBill: 'Tipo de conta',
      dueDate: 'Vencimento',
      statusBill: 'Status',
      isPaid: 'Paga',
      beneficiary: 'Beneficiário',
      debtor: 'Devedor',
      description: 'Descrição',
      typeBillPay: 'Tipo de Conta',
      typeBillReceive: 'Tipo de Conta',
      value: 'Valor'
    },
  },
};

export default ptbrMessages;
