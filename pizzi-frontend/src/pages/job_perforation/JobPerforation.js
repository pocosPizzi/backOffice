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
import JobPerforationFormCreate from './JobFormCreate'; 
import JobPerforationFormEdit from './JobPerforationFormEdit'
import JobPerforationTab from './JobPerforationTabs';

export const JobPerforationCreate = props => (
    <Create undoable="false" actions={<FormActions />} {...props}>
      <JobPerforationFormCreate {...props} />
    </Create>
);

export const JobPerforationList = props => {

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

export const JobPerforationEdit = props => {

    return (
        <Edit  undoable="false" actions={<FormActions />} {...props}>
            <JobPerforationFormEdit {...props} />
        </Edit>
    );
};

export const JobPerforationShow = props => {

    return (
        <Show  undoable="false" actions={<FormActions />} {...props}>
            <JobPerforationTab {...props} />
        </Show>
    );
};

export default {
    create: JobPerforationCreate,
    edit: JobPerforationEdit,
    show: JobPerforationShow,
    list: JobPerforationList,
    icon: OpacityOutlinedIcon,
};
