import React, { useEffect, useState } from 'react';
import {  
    Button,
    FormControl,
    IconButton,
    InputLabel,
    Grid, 
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import {
    Loading,
    useNotify
} from 'react-admin';
import dataProvider from '../../providers/dataProvider';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PriceInputMaterial from '../../components/PriceInputMaterial';

const selectChoice = (choices) => {
    return (
        choices.map(choice => (
            <MenuItem key={choice.id} value={choice}>{choice.description}</MenuItem>
        ))
       
    )
}

export const Step4 = ({handleChangeStep4, jobMaintenance}) => {

    const [choiceAssistances, setChoiceAssistance] = useState([]);
    const [assistanceChoiceCurrent, setAssistanceChoiceCurrent] = useState()
    const [assistancesUsed, setAssistancesUsed] = useState([]);
    const [idsAssistances, setIdAssistances] = useState([]);

    function getChoiceAssistance(){
        dataProvider('GET', `assistance/choice`).then(res => {
            setChoiceAssistance(res.data)
        })
    }

    useEffect(() => {
        getChoiceAssistance();
    }, []);

    const handleChangeAssistance = (event) => {
        setAssistanceChoiceCurrent(event.target.value)
    }

    const onClick = () => {

        setAssistancesUsed([...assistancesUsed, assistanceChoiceCurrent])

        const newAssitance = assistanceChoiceCurrent.id;

        setIdAssistances([...idsAssistances, newAssitance])

        handleChangeStep4([...idsAssistances, newAssitance])
    }

    function removeItemList(list, value){
        return list.filter(function(item){
            return item != value
        })
    }

    const onClickRemoveAssistance = (assistance) => {

        var newList = removeItemList(assistancesUsed, assistance)
        var newListIds = removeItemList(idsAssistances, assistance.id)

        handleChangeStep4(newListIds)

        setIdAssistances(newListIds)

        setAssistancesUsed(newList)

    }

    return (
        <>
            <Grid container spacing={6} alignItems="center" justify="center">
                <Grid item xs={3} >
                    <FormControl >
                        <InputLabel id="demo-simple-select-helper-label">Assistências</InputLabel>
                        <Select
                            value={assistanceChoiceCurrent}
                            onChange={handleChangeAssistance}
                        >
                            {choiceAssistances.length > 0 && selectChoice(choiceAssistances)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} >
                    <Button
                        onClick={onClick}
                        style={{backgroundColor: '#124999', color: '#fff'}}
                    > 
                        <AddIcon/>Adicionar Assistência
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={12} justify='space-around' style={{marginTop: '25px'}}>
                {assistancesUsed.map(assistanceUsed => (
                         <Grid item xs={5} style={{margin: '5px', border: 'solid'}} key={assistanceUsed.disabled}>
                             <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <IconButton aria-label="delete" onClick={onClickRemoveAssistance.bind(this, assistanceUsed)}>
                                    <DeleteIcon fontSize="large" style={{color: '#f44336'}} />
                                </IconButton>
                             </div>
                            <TextField 
                                size="small"
                                disabled={true}
                                label='Assistência'
                                value={assistanceUsed.name}
                                style={{margin: '5px'}}
                            />
                            <TextField 
                                size="small"
                                disabled={true}
                                label='Descrição'
                                value={assistanceUsed.description}
                                style={{margin: '5px'}}
                            />
                            <PriceInputMaterial
                                size="small"
                                disabled={true}
                                label='Valor Unitário'
                                value={assistanceUsed.value}
                                textAlign="left"
                                style={{margin: '5px'}}
                                options={{
                                    style: 'currency',
                                    currency: 'BRL',
                                }}
                            />
                        </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Step4;