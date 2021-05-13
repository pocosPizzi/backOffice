import {
    Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const ButtonDefault = withStyles({
    root: {
        minWidth: '10%',
        boxShadow: 'none',
        color: '#fff',
        backgroundColor: "#124999",
        fontSize: '0.875rem',
        borderRadius: '4px',
        fontFamily: [
            'Roboto", "Helvetica", "Arial", sans-serif',
        ].join(','),
        '&:hover': {
            color: '#fff',
            backgroundColor: '#124991',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            borderColor: '#124991',
        },
        '&:disabled': {
            boxShadow: 'none',
            backgroundColor: '#fff',
        },
        '&:focus': {
            backgroundColor: '#124991',
            color: '#fff'
        },
    },
})(Button);

export default ButtonDefault;