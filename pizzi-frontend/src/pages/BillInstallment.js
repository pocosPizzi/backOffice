import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    FormControl,
    FormControlLabel,
    FormGroup,
    makeStyles,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Switch,
    CircularProgress,
} from '@material-ui/core';
import {
    CircularLoading,
    LinearProgress,
    Loading,
} from 'react-admin';
import springProvider from '../providers/dataProvider';
import { format, parseISO } from 'date-fns';
import SaveIcon from '@material-ui/icons/Save';

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
    },

    tabRow: {
        backgroundColor: '#8f8f8f'
    },

    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const sumTotalBills = (bills) => {

    var total = 0;

    bills.forEach(element => {
        total = total + element.value;
    });

    return formatValue(total);
}

const sumTotalBillsInStatus = (bills, status) => {

    var total = 0;

    bills.forEach(element => {
        if (element.statusBill === status) {
            total = total + element.value;
        }

    });

    return formatValue(total);
}

const formatValue = value => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const formatStatusBill = status => {

    switch (status) {
        case 'IN_LATE':

            return <Chip style={{ backgroundColor: '#E46460', color: '#000' }} label='Atrasada' />;
        case 'PAID':

            return <Chip style={{ backgroundColor: '#FFFF42', color: '#000' }} label='Paga' />;
        default:

            return <Chip style={{ backgroundColor: '#66CDAA', color: '#000' }} label='Aguardando receber' />;
    }
}
const BillInstallment = ({ clientCurrent, details }) => {

    const classes = useStyles();

    const client = clientCurrent;
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [billCurrent, setBillCurrent] = useState();
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);

    const getBillByClient = () => {

        setLoading(true)

        springProvider('GET', `bills/by-client/${client.id}`).then(res => {

            setBills(res.data.bills);
            setLoading(false)

        }).catch(error => {
            console.log(error)
            setLoading(false)
        });
    };

    const updateBill = () => {

        setLoading(true)

        console.log(billCurrent)

        springProvider('UPDATE', `bills/${billCurrent.id}/update`, {

            id: billCurrent.isPaid

        }).then(res => {
            setLoading(false)
            getBillByClient()
            setOpen(false);

        }).catch(error => {
            setLoading(false)
            setOpen(false);
        });
    };

    useEffect(() => {
        getBillByClient();
    }, []);

    const onChangeBill = (event) => {

        setBillCurrent({ ...billCurrent, 'isPaid': event.target.value });

        console.log(event.target)
        console.log(billCurrent)
    }

    const handleOpen = (bill) => {
        setBillCurrent(bill)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        bills !== undefined && <Card>
            <CardContent>
                <Typography
                    variant="h6"
                    align="left"
                    gutterBottom
                    style={{
                        backgroundColor: '#124999',
                        color: '#fff',
                        padding: '5px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box fontWeight="fontWeightBold" textAlign="left" m={0}>
                        {`Controle de Parcelas de ${client.nameClient}`}
                    </Box>
                    <Button onClick={() => details(false)} style={{ fontWeight: 'bold', color: '#fff' }}>Voltar</Button>
                </Typography>

                {loading ? <Loading /> :
                    (<>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {billCurrent !== undefined ? <div style={modalStyle} className={classes.paper}>
                                <h2 id="simple-modal-title" style={{ textAlign: 'center' }}>Atualizar status</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <FormControlLabel
                                        value={billCurrent.isPaid}
                                        checked={billCurrent.isPaid}
                                        control={<Switch color="primary" />}
                                        label="Pago"
                                        // labelPlacement="start"
                                        onChange={onChangeBill}
                                        name='isPaid'
                                    />
                                    <Button
                                        startIcon={loading ? <CircularProgress /> : <SaveIcon />}
                                        variant="contained" color="primary"
                                        onClick={updateBill}
                                    >
                                        Salvar
                                    </Button>
                                </div>

                            </div> : <CircularProgress />}
                        </Modal>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell className={classes.headerTab}>Valor</TableCell>
                                        <TableCell className={classes.headerTab} align="center">Vencimento</TableCell>
                                        <TableCell className={classes.headerTab} align="center">Status</TableCell>
                                        <TableCell className={classes.headerTab} align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bills !== undefined && bills.map((bill) => (
                                        <TableRow key={bill.nameClient}>
                                            <TableCell component="th" scope="row">
                                                {formatValue(bill.value)}
                                            </TableCell>
                                            <TableCell align="center">{format(parseISO(bill.dueDate), 'dd/MM/yyyy')}</TableCell>
                                            <TableCell align="center">{formatStatusBill(bill.statusBill)}</TableCell>
                                            <Button variant="contained" color="primary" onClick={handleOpen.bind(this, bill)}>
                                                Atualizar
                                            </Button>
                                        </TableRow>
                                    ))}

                                    <TableRow className={classes.tabRow}>
                                        <TableCell style={{ color: '#000', fontWeight: 'bold' }} colSpan={1}>Total</TableCell>
                                        <TableCell align="left">{sumTotalBills(bills)}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tabRow}>
                                        <TableCell style={{ color: 'red', fontWeight: 'bold' }} colSpan={1}>Em Atraso</TableCell>
                                        <TableCell align="left">{sumTotalBillsInStatus(bills, 'IN_LATE')}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tabRow}>
                                        <TableCell style={{ color: 'blue', fontWeight: 'bold' }} colSpan={1}>Á Receber</TableCell>
                                        <TableCell align="left">{sumTotalBillsInStatus(bills, 'RECEIVABLE')}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tabRow}>
                                        <TableCell style={{ color: 'green', fontWeight: 'bold' }} colSpan={1}>Recebido</TableCell>
                                        <TableCell align="left">{sumTotalBillsInStatus(bills, 'PAID')}</TableCell>
                                    </TableRow>
                                    <TableRow className={classes.tabRow}>
                                        <TableCell style={{ color: '#000', fontWeight: 'bold' }} colSpan={1}>Total de Parcelas</TableCell>
                                        <TableCell align="left">{bills.length}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>)

                }
            </CardContent>
        </Card >
    )
}

export default BillInstallment;