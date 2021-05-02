import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    makeStyles,
    TextField,
    Typography
} from '@material-ui/core';
import {
    Loading,
} from 'react-admin';
import NumberFormat from 'react-number-format';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import springProvider from '../providers/dataProvider';

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
    }

}));

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


const BillReport = () => {

    const classes = useStyles();

    var date = new Date();
    var dateInitValue = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
    var dateFinalValue = formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));

    const [dateInit, setDateInit] = useState(dateInitValue);
    const [dateFinal, setDateFinal] = useState(dateFinalValue);
    const [report, setReport] = useState();
    const [loading, setLoading] = useState(true)

    const onChangeInit = event => {

        const newDate = event.target.value;

        setDateInit(formatDate(newDate))
    }

    const onChangeFinal = event => {

        const newDate = event.target.value;

        setDateFinal(formatDate(newDate))
    }

    const getReport = () => {

        setLoading(true)

        springProvider('GET', `bills/reportByPeriod/${dateInit}/${dateFinal}`).then(res => {

            setReport(res.data);
            console.log(res.data)
            setLoading(false)

        });
    };

    useEffect(() => {
        getReport();
    }, []);

    const onsubmit = () => {

        getReport()

    }

    return (
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
                        Relatório de contas por Perído
                    </Box>
                </Typography>
                <form style={{ display: 'flex', justifyContent: "center", marginTop: '25px' }}>
                    <TextField
                        id="date"
                        label="Perído Inicial"
                        type="date"
                        defaultValue={dateInit}
                        className={classes.textField}
                        onChange={onChangeInit}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="Perído Final"
                        type="date"
                        defaultValue={dateFinal}
                        className={classes.textField}
                        onChange={onChangeFinal}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FindInPageIcon />}
                        onClick={onsubmit}
                    >
                        Gerar Relatório
                    </Button>
                </form>
                {loading ?
                    <Loading /> :
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className={classes.headerBill}>
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
                                    Receitas
                                </Box>
                            </Typography>
                            <div className={classes.contentBill}>
                                <div >
                                    <Typography
                                        align="left"
                                        style={{ color: 'black' }}
                                    >
                                        Total
                                    </Typography>
                                    <NumberFormat
                                        value={report.totalTypeBillReceive}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        isNumericString
                                        prefix={'R$ '}
                                        disabled={true}
                                    />

                                </div>
                            </div>
                            <div className={classes.contentBill}>
                                <div>
                                    <Typography
                                        align="left"
                                        style={{ color: 'red' }}
                                    >
                                        Em Atraso
                                    </Typography>
                                    <NumberFormat
                                        value={report.totalInLateTypeBillReceive}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        isNumericString
                                        prefix={'R$ '}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className={classes.contentBill}>
                                <div>
                                    <Typography
                                        align="left"
                                        style={{ color: 'blue' }}
                                    >
                                        Á Receber
                                    </Typography>
                                    <NumberFormat
                                        value={report.totalReceivable}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        isNumericString
                                        prefix={'R$ '}
                                        disabled={true}
                                    />

                                </div>
                            </div>
                            <div className={classes.contentBill}>
                                <div>
                                    <Typography
                                        align="left"
                                        style={{ color: 'green' }}
                                    >
                                        Já Recebida
                                    </Typography>
                                    <NumberFormat

                                        value={report.totalPaidTypeBillReceive}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        isNumericString
                                        prefix={'R$ '}
                                        disabled={true}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className={classes.headerBill}>
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
                                    Despesas
                                </Box>
                            </Typography>
                            <div className={classes.contentBill}>
                                <div>
                                    <Typography
                                        align="left"
                                        style={{ color: 'black' }}
                                    >
                                        Total
                                    </Typography>
                                    <NumberFormat

                                        value={report.totalTypeBillPay}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        isNumericString
                                        prefix={'R$ '}
                                        disabled={true}
                                    />

                                </div>
                            </div>
                            <div className={classes.contentBill}>
                                <div>
                                    <Typography
                                        align="left"
                                        style={{ color: 'red' }}
                                    >
                                        Em Atraso
                                    </Typography>
                                    <NumberFormat

                                        value={report.totalInLateTypeBillPay}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        isNumericString
                                        prefix={'R$ '}
                                        disabled={true}
                                    />

                                </div>
                            </div>
                            <div className={classes.contentBill}>
                                <div>
                                    <Typography
                                        align="left"
                                        style={{ color: 'blue' }}
                                    >
                                       Á Pagar
                                    </Typography>
                                    <NumberFormat

                                        value={report.totalPayable}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        isNumericString
                                        prefix={'R$ '}
                                        disabled={true}
                                    />

                                </div>
                            </div>
                            <div className={classes.contentBill}>
                                <div>
                                    <Typography
                                        align="left"
                                        style={{ color: 'green' }}
                                    >
                                        Já Paga
                                    </Typography>
                                    <NumberFormat

                                        value={report.totalPaidTypeBillPay}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        isNumericString
                                        prefix={'R$ '}
                                        disabled={true}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className={classes.headerBill}>
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
                                    Líquides
                                </Box>
                            </Typography>
                            <div>

                                <Typography
                                    align="left"
                                    style={{ color: 'black' }}
                                >
                                    Líquidez do Período
                                </Typography>
                                <NumberFormat

                                    value={report.totalLiquid}
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    isNumericString
                                    prefix={'R$ '}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>}
            </CardContent>
        </Card>
    )
}

export default BillReport;