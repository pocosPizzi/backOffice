import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@material-ui/core';
import {
    Loading,
} from 'react-admin';
import springProvider from '../../providers/dataProvider';
import BillInstallment from './BillInstallment';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

    headerBill: {
        width: '30.33%',
        marginTop: '30px'
    },

    contentBill: {
        marginBottom: '10px',
        display: 'flex'
    },

    headerTab: {
        backgroundColor: '#e5e4e3',
        color: '#000',
        fontWeight: 'bold'
    }

}));
const BillByClient = () => {

    const classes = useStyles();

    const [clients, setClients] = useState([]);
    const [clientCurrent, setClientCurrent] = useState();
    const [details, setDetails] = useState(false);
    const [loading, setLoading] = useState(false);

    const getBillByClient = () => {

        setLoading(true)

        springProvider('GET', `clients`).then(res => {

            setClients(res.data.content);
            console.log(res.data.content)
            setLoading(false)

        }).catch(error => {
            console.log(error)
            setLoading(false)
        });
    };

    useEffect(() => {
        getBillByClient();
    }, []);

    const detailsActive = client => {
        setClientCurrent(client);
        setDetails(true)
    } 


    return (
        details ? <BillInstallment clientCurrent={clientCurrent} details={setDetails}/> :
            <Card>
                <CardContent>
                    <Typography
                        variant="h6"
                        align="left"
                        gutterBottom
                        style={{
                            backgroundColor: '#124999',
                            color: '#fff',
                            padding: '5px',
                        }}
                    >
                        <Box fontWeight="fontWeightBold" textAlign="left" m={0}>
                            Controle de Parcelas á receber
                        </Box>
                    </Typography>

                    {loading ? <Loading/> :

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell className={classes.headerTab}>Nome</TableCell>
                                        <TableCell className={classes.headerTab} align="center">CPF</TableCell>
                                        <TableCell className={classes.headerTab} align="center">Telefone</TableCell>
                                        <TableCell className={classes.headerTab} align="center">Cidade</TableCell>
                                        <TableCell className={classes.headerTab} align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clients.map((client) => (
                                        <TableRow key={client.nameClient}>
                                            <TableCell component="th" scope="row">
                                                {client.nameClient}
                                            </TableCell>
                                            <TableCell align="center">{client.cpf}</TableCell>
                                            <TableCell align="center">{client.phone}</TableCell>
                                            <TableCell align="center">{client.city}</TableCell>
                                            <Button variant="contained" color="primary" onClick={detailsActive.bind(this, client)}>
                                                Detalhes
                                            </Button>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    }
                </CardContent>
            </Card>
    )
}

export default BillByClient;