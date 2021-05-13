import React, {
    useState
} from 'react';
import {
    Tab,
    Tabs,
} from '@material-ui/core';
import { TabPanel } from '../../components/TabPanels';
import BillList from './BillList';
import BillReceive from './BillReceive';
import BillPay from './BillPay';
import BillReport from './BillReport';
import BillByClient from './BillByClient';
const BillTab = props => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {

        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    }

    return (

        <div>
            <div>
                <Tabs value={value} onChange={handleChange} >

                    <Tab label="Listagem Geral" {...a11yProps(0)} />
                    <Tab label="Relatório por Período" {...a11yProps(1)} />
                    <Tab label="Controle de Parcelas" {...a11yProps(2)} />
                    <Tab label="Contas á Receber" {...a11yProps(3)} />
                    <Tab label="Contas á Pagar" {...a11yProps(4)} />

                </Tabs>
            </div>
            <TabPanel value={value} index={0}>
                <BillList {...props} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BillReport {...props} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <BillByClient {...props} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <BillReceive {...props} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <BillPay {...props} />
            </TabPanel>

        </div>

    );
};

export default BillTab;