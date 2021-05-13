import React, {
    useState
} from 'react';
import {
    Tab,
    Tabs,
} from '@material-ui/core';
import { TabPanel } from '../../components/TabPanels';
import ClientJobPerforationShow from './ClientJobPerforationShow';
import DataJobPerforationShow from './DataJobPerforationShow';
import TotalJobPerforationShow from './TotalJobPerforationShow';
import AssistanceJobPerforationShow from './AssistanceJobPerforationShow';
import ProdJobPerforationShow from './ProductsJobPerforationShow';
const JobPerforationTab = props => {

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
                    <Tab label="Dados da Perfuração" {...a11yProps(1)} />
                    <Tab label="Materiais Usados" {...a11yProps(2)} />
                    <Tab label="Assistências Prestadas" {...a11yProps(3)} />
                    <Tab label="Totais em valores" {...a11yProps(4)} />
                </Tabs>
            </div>
            <TabPanel value={value} index={0}>
                <ClientJobPerforationShow {...props}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DataJobPerforationShow {...props}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProdJobPerforationShow {...props}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AssistanceJobPerforationShow {...props}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TotalJobPerforationShow {...props}/>
            </TabPanel>

        </div>

    );
};

export default JobPerforationTab;