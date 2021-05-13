import React, {
    useState
} from 'react';
import {
    Tab,
    Tabs,
} from '@material-ui/core';
import { TabPanel } from '../../components/TabPanels';
import ClientJobMaintenanceShow from './ClientJobMaintenanceShow';
import DataJobMaintenanceShow from './DataJobMaintenanceShow';
import TotalJobMaintenanceShow from './TotalJobMaintenanceShow';
import AssistanceJobMaintenanceShow from './AssistanceJobMaintenanceShow';
import ProdJobMaintenanceShow from './ProductsJobMaintenanceShow';
const JobMaintenanceTab = props => {

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
                    <Tab label="Dados do Cliente" {...a11yProps(0)} />
                    <Tab label="Dados da Manutenção" {...a11yProps(1)} />
                    <Tab label="Materiais Usados" {...a11yProps(2)} />
                    <Tab label="Assistências Prestadas" {...a11yProps(3)} />
                    <Tab label="Totais em valores" {...a11yProps(4)} />
                </Tabs>
            </div>
            <TabPanel value={value} index={0}>
                <ClientJobMaintenanceShow {...props}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DataJobMaintenanceShow {...props}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProdJobMaintenanceShow {...props}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AssistanceJobMaintenanceShow {...props}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TotalJobMaintenanceShow {...props}/>
            </TabPanel>

        </div>

    );
};

export default JobMaintenanceTab;