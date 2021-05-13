import React, { useEffect, useState } from 'react';
import { 
    Box, 
    loading,
    makeStyles,
    Typography, 
    Toolbar 
} from '@material-ui/core';
import {
    Loading,
    useNotify
} from 'react-admin';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import dataProvider from '../../providers/dataProvider';
import ButtonDefault from '../../components/ButtonSaveCustom';
import SaveIcon from '@material-ui/icons/Save';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import axios from 'axios';
import URL from '../../providers/URLs';

const useStyles = makeStyles(theme => ({
    row: {
      backgroundColor: '#124999',
      color: '#fff',
      fontWeight: 'bolder',
      fontSize: '16px',
    },
  
    root: {
      width: '100%',
    }
  }));


function getSteps() {
    return [
        'Dados do Cliente',
        'Dados do Poço',
        'Materiais usados',
        'Assistências prestadas',
        'Valores',
    ];
}

const GetStepContent = ({
        step, 
        clientChoice, 
        handleChangeStep1, 
        handleChangeStep2, 
        handleChangeStep3, 
        handleChangeStep4,
        handleChangeStep5,
        client, 
        clientChoiceCurrent, 
        jobPerforation
    }) => {

    switch (step) {
        case 0:
            return (
                <Step1 clientChoice={clientChoice} handleChangeStep1={handleChangeStep1} client={client} clientChoiceCurrent={clientChoiceCurrent}/>
            );
        case 1:
            return (
                <Step2 handleChangeStep2={handleChangeStep2} jobPerforation={jobPerforation}/>
            );
        
        case 2:
            return (
                <Step3 handleChangeStep3={handleChangeStep3} jobPerforation={jobPerforation}/>
            );
        case 3:
            return (
                <Step4 handleChangeStep4={handleChangeStep4} jobPerforation={jobPerforation}/>
            );
        case 4:
            return (
                <Step5 handleChangeStep5={handleChangeStep5} jobPerforation={jobPerforation}/>
            );
        default:
            return 'Unknown step';
    }
}
      
export const JobPerforationFormCreate = props => {

    const classes = useStyles();
    const notify = useNotify();

    const [clientChoice, setChoiceClient] = useState([]);
    const [loading, setLoading] = useState(false);
    const [clientChoiceCurrent, setClientChoiceCurrent] = useState()
    const [productsUsed, setProductsUsed] = useState([])
    const [idsAssistances, setIdAssistances] = useState([]);
    const [clientCurrent, setClientCurrent] = useState(
        {
            birthday: '2021-02-02',
            city: '',
            cpf: '',
            district: '',
            email: '',
            id: '',
            nameClient: '',
            numberHouse: '',
            phone: '',
            rg: '',
            street: '',
            uf: ''
        }
    );
    const [activeStep, setActiveStep] = useState(0);
    const [jobPerforation, setJobPerforation] = useState();
    const steps = getSteps();

    function getChoiceClient(){
        dataProvider('GET', `clients/choice`).then(res => {
            setChoiceClient(res.data)
        })
    }

    function getClient(id){
        
        dataProvider('GET', `clients/${id}`).then(res => {
            setClientCurrent(res.data)
        })
    }

    const saveClient = async  () => {

        setLoading(true)

        await axios.post(`${URL.baseURL}/job-perforation/client/${clientCurrent.id}`).then(res => {
            
            setJobPerforation(res.data);
            
            setLoading(false)

            setActiveStep(prevActiveStep => prevActiveStep + 1);

        }).catch(error => {
            notify(error.response.data.message, 'error')
            setLoading(false)
        })
    }

    const saveGeneral = async  () => {

        if(jobPerforation.mechanicalGeoCoatingMeters == undefined || jobPerforation.perforatedMeters == undefined){
            notify('Verefique os campos de metros de perfuração e revestimentto Geo Mecânico, eles devem ser vazios!', 'warning')
        }else{
            setLoading(true)

            await axios.put(`${URL.baseURL}/job-perforation/${jobPerforation.id}/general`, jobPerforation).then(res => {
            
                setJobPerforation(res.data);
                
                setLoading(false)
    
                setActiveStep(prevActiveStep => prevActiveStep + 1);
    
            }).catch(error => {
                notify(error.response.data.message, 'error')
                setLoading(false)
            })
        }
        
    }

    const saveProductsUsed = async  () => {

        setLoading(true)

        await axios.put(`${URL.baseURL}/job-perforation/${jobPerforation.id}/products-used`, productsUsed).then(res => {
            
            setJobPerforation(res.data);
            
            setLoading(false)
            setActiveStep(prevActiveStep => prevActiveStep + 1);

        }).catch(error => {
            notify(error.response.data.message, 'error')
            setLoading(false)
        })
    }

    const saveAssistanceUsed = async  () => {

        setLoading(true)

        await axios.put(`${URL.baseURL}/job-perforation/${jobPerforation.id}/assistance`, idsAssistances).then(res => {
            
            setJobPerforation(res.data);
            
            setLoading(false)
            setActiveStep(prevActiveStep => prevActiveStep + 1);

        }).catch(error => {
            notify(error.response.data.message, 'error')
            setLoading(false)
        })
    }

    const saveTotal = async  () => {

            setLoading(true)

            await axios.put(`${URL.baseURL}/job-perforation/${jobPerforation.id}/total`, jobPerforation).then(res => {
            
                setJobPerforation(res.data);
                
                setLoading(false)
    
                setActiveStep(prevActiveStep => prevActiveStep + 1);
    
            }).catch(error => {
                notify(error.response.data.message, 'error')
                setLoading(false)
            })
        
    }
    useEffect(() => {
        getChoiceClient();
    }, []);

    const handleNext = () => {

        switch (activeStep) {
            case 0:
                clientCurrent.id != '' ? saveClient() : notify('Selecione um Cliente para seguir!', 'warning')
                break;
            case 1:
                jobPerforation.dateJob != undefined ? saveGeneral() : notify('Data de perfuração não pode estar em branco, verefique e tente novamente', 'warning')
                break;
            case 2:
                saveProductsUsed();
                break;
            case 3:
                saveAssistanceUsed();
                break;
            case 4:
                saveTotal();
                break;
            default:
                break;
        }
        
    };
    
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChangeStep1 = (event) => {

        getClient(event.target.value)
        setClientChoiceCurrent(event.target.value)

    }  

    const handleChangeStep2 = (event) => {

        setJobPerforation({...jobPerforation, [event.target.name] : event.target.value})

    }
    
    const handleChangeStep3 = (productUseds) => {

        console.log(productUseds)
        setProductsUsed(productUseds)

    }  

    const handleChangeStep4 = (assistanceUseds) => {

        console.log(assistanceUseds);
        setIdAssistances(assistanceUseds);

    }  

    const handleChangeStep5 = (event) => {

        setJobPerforation({...jobPerforation, [event.target.name] : event.target.value})

    } 

    return (
        <form>
            <Typography
                variant="h6"
                align="left"
                style={{
                    backgroundColor: '#124999',
                    color: '#fff',
                    padding: '5px',
                }}
            >
                <Box fontWeight="fontWeightBold" textAlign="left" m={0}>
                    Perfuração
                </Box>
            </Typography>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel style={{ completed: classes.row }}>
                            {label}
                        </StepLabel>
                        <StepContent>
                            <div>
                                {loading ? 
                                    <Loading /> : 
                                    <GetStepContent 
                                        step={index} 
                                        clientChoice={clientChoice} 
                                        handleChangeStep1={handleChangeStep1} 
                                        handleChangeStep2={handleChangeStep2}
                                        handleChangeStep3={handleChangeStep3}
                                        handleChangeStep4={handleChangeStep4}
                                        handleChangeStep5={handleChangeStep5}
                                        client={clientCurrent}
                                        clientChoiceCurrent={clientChoiceCurrent}
                                        jobPerforation={jobPerforation}
                                    />
                                }
                            </div>
                            <div>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Voltar
                                    </Button>
                                    <Button
                                        style={{ color: '#124999' }}
                                        onClick={handleNext}
                                    >
                                        {activeStep === steps.length - 1
                                            ? 'Salvar'
                                            : 'Próxima'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
                </Stepper>
                {activeStep === steps.length && (
                <Paper square elevation={0}>
                    <Typography style={{ marginLeft: '10px' }}>
                        Perfuração criada com sucesso
                    </Typography>
                </Paper>
                )}
          </div>
          </form>
    );
  };

export default JobPerforationFormCreate;