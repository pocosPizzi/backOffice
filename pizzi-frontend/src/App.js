import React from 'react';
import { Admin, Resource } from 'react-admin';
import Roles from './constants/Roles';
import i18nProvider from './i18n';
import LoginPage from './pages/login/LoginPage';
import NotFound from './pages/not_found/NotFound';
import Users from './pages/user/Users';
import Category from './pages/category/Category';
import ConfigSystem from './pages/config_system/ConfigSystem';
import Bill from './pages/bill/Bill';
import Product from './pages/product/Product';
import JobPerforation from './pages/job_perforation/JobPerforation';
import JobMaintenance from './pages/job_maintanence/JobMaintenance';
import Clients from './pages/client/Client';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import './styles/App.css';
import theme from './themes/theme';
import Assistance from './pages/assitance/Assistance';

const fetchResources = permissions => {
  const arr = [];
  if (permissions.includes(Roles.ADMIN)) {
    arr.push(<Resource name="bills" {...Bill} />);
    arr.push(<Resource name="users" {...Users} />);
    arr.push(<Resource name="clients" {...Clients} />);
    arr.push(<Resource name="job-perforation" {...JobPerforation} />);
    arr.push(<Resource name="job-maintenance" {...JobMaintenance} />);
    arr.push(<Resource name="assistance" {...Assistance} />);
    arr.push(<Resource name="products" {...Product} />);
    arr.push(<Resource name="categories" {...Category} />);
    arr.push(<Resource name="config-system" {...ConfigSystem} />);

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
