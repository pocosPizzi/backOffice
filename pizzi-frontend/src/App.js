import React from 'react';
import { Admin, Resource } from 'react-admin';
import Roles from './constants/Roles';
import i18nProvider from './i18n';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import Category from './pages/Category';
import Bill from './pages/Bill';
import Products from './pages/Products';
import Perforation from './pages/Perforation';
import Maintenace from './pages/Maintenance';
import Clients from './pages/Client';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import './styles/App.css';
import theme from './themes/theme';
import Assistance from './pages/Assistance';

const fetchResources = permissions => {
  const arr = [];
  if (permissions.includes(Roles.ADMIN)) {
    arr.push(<Resource name="bills" {...Bill} />);
    arr.push(<Resource name="users" {...Users} />);
    arr.push(<Resource name="clients" {...Clients} />);
    arr.push(<Resource name="perforations" {...Perforation} />);
    arr.push(<Resource name="maintenance" {...Maintenace} />);
    arr.push(<Resource name="assistance" {...Assistance} />);
    arr.push(<Resource name="products" {...Products} />);
    arr.push(<Resource name="categories" {...Category} />);

  }
  if (permissions.includes(Roles.CUSTOMER)) {
    arr.push(<Resource name="bills" {...Bill} />);
    arr.push(<Resource name="clients" {...Clients} />);
    arr.push(<Resource name="perforations" {...Perforation} />);
    arr.push(<Resource name="maintenance" {...Maintenace} />);
    arr.push(<Resource name="assistance" {...Assistance} />);
    arr.push(<Resource name="products" {...Products} />);
    arr.push(<Resource name="categories" {...Category} />);

  }
  return arr;
};

function App() {
  return (
    <div className="App">
      <Admin
        theme={theme}
        i18nProvider={i18nProvider}
        authProvider={authProvider}
        dataProvider={dataProvider}
        loginPage={LoginPage}
        catchAll={NotFound}
      >
        {fetchResources}
      </Admin>
    </div>
  );
}

export default App;
