import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { 
  Title,
  TextField
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
const Verify = () => {
    const [dateLimite, setDateLimite] = useState(""); 
    const classes = useStyles();
    return (
        <>
            <form className={classes.container} noValidate>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                className={classes.textField}   
                InputLabelProps={{
                shrink: true,
                }}
            />
            </form>
        </>
      );
}

export const Dashboard = () => (
    
  <Card>
    <Title title="Data Limite" />
    <CardContent style={{ textAlign: 'center'}}>
      <h1>Data Limite  </h1>
    </CardContent>
    <CardContent>
        <Verify/>
    </CardContent>
    
  </Card>
);

export default {
  list: Dashboard,
  icon: DateRangeIcon,
  options: { label: 'Data Limite'},
};
