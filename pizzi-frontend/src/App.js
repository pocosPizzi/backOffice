import React from 'react';
import { Admin, Resource } from 'react-admin';
import Roles from './constants/Roles';
import i18nProvider from './i18n';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import Category from './pages/Category';
import Products from './pages/Products';
import Perforation from './pages/Perforation';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import './styles/App.css';
import theme from './themes/theme';

const fetchResources = permissions => {
  let arr = [];
  if (permissions.includes(Roles.ADMIN)) {
    arr.push(<Resource name="users" {...Users} />);
    arr.push(<Resource name="products" {...Products} />);
    arr.push(<Resource name="categories" {...Category} />);
    arr.push(<Resource name='perforations' {...Perforation} />)
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
