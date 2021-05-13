import React from 'react';
import OpacityOutlinedIcon from '@material-ui/icons/OpacityOutlined';
import {
    Create,
    Edit,
    List,
    Show
} from 'react-admin';
import { ListFilterWithDeleteds } from '../../components/ListFilter';
import DataCustom from './DataCustom';
import FormActions from '../../components/FormActions';
import JobMaintenanceFormCreate from './JobFormCreate'; 
import JobMaintenanceFormEdit from './JobMaintenanceFormEdit'
import JobMaintenanceTab from './JobMaintenanceTabs';

export const JobMaintenanceCreate = props => (
    <Create undoable="false" actions={<FormActions />} {...props}>
      <JobMaintenanceFormCreate {...props} />
    </Create>
);

export const JobMaintenanceList = props => {

    return (
        <List
            filters={<ListFilterWithDeleteds />}
            bulkActionButtons={false}
            exporter={false}
            {...props}
        >
           <DataCustom/>
        </List>
    );
};

export const JobMaintenanceEdit = props => {

    return (
        <Edit  undoable="false" actions={<FormActions />} {...props}>
            <JobMaintenanceFormEdit {...props} />
        </Edit>
    );
};

export const JobMaintenanceShow = props => {

    return (
        <Show  undoable="false" actions={<FormActions />} {...props}>
            <JobMaintenanceTab {...props} />
        </Show>
    );
};

export default {
    create: JobMaintenanceCreate,
    edit: JobMaintenanceEdit,
    show: JobMaintenanceShow,
    list: JobMaintenanceList,
    icon: OpacityOutlinedIcon,
};
