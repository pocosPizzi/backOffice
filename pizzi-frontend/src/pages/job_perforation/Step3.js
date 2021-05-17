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
            <MenuItem key={choice.id} value={choice}>{choice.name}</MenuItem>
        ))
       
    )
}

export const Step3 = ({handleChangeStep3, jobPerforation}) => {

    const notify = useNotify();
    const [choiceProduct, setChoiceProduct] = useState([]);
    const [productsUsed, setProductsUsed] = useState([]);
    const [productUsedList, setProductUsedList] = useState([]);
    const [productChoiceCurrent, setProductChoiceCurrent] = useState({product: {}, totalUsed: 0})

    function getChoiceProduct(){
        dataProvider('GET', `products/choice`).then(res => {
            setChoiceProduct(res.data)
        })
    }

    useEffect(() => {
        getChoiceProduct();
    }, []);

    const handleChangeProduct = (event) => {
        setProductChoiceCurrent({...productChoiceCurrent, [event.target.name] : event.target.value})
    }

    const onClick = () => {
        if(productChoiceCurrent.totalUsed > 0 && productChoiceCurrent.product != undefined){

            setProductsUsed([...productsUsed, productChoiceCurrent]);

            setProductChoiceCurrent({product: {}, totalUsed: 0})
            
            const newProduct = {
                totalUsed: productChoiceCurrent.totalUsed,
                productId: productChoiceCurrent.product.id,
            }

            setProductUsedList([...productUsedList, newProduct])

            handleChangeStep3([...productUsedList, newProduct])

        }else{
            notify('Campos em brancos, verefique e tente novamente!', 'warning')
        }
        
    }

    function removeItemList(list, value){
        return list.filter(function(item){
            return item.product != value.product
        })
    }

    function removeNewItemList(list, value){
        console.log(value)
        console.log(list)

        return list.filter(function(item){
            return item.productId != value.productId
        })
    }

    const onClickRemoveProduct = (product) => {

        const newProduct = {
            totalUsed: product.totalUsed,
            productId: product.product.id,
        }

        var newProductList = removeNewItemList(productUsedList, newProduct)
        var newList = removeItemList(productsUsed, product)

        handleChangeStep3(newProductList)

        setProductUsedList(newProductList);
        setProductsUsed(newList);
    }

    return (
        <>
            <Grid container spacing={6} alignItems="center" justify="center">
                <Grid item xs={3} >
                    <FormControl >
                        <InputLabel id="demo-simple-select-helper-label">Produto</InputLabel>
                        <Select
                            value={productChoiceCurrent.product}
                            onChange={handleChangeProduct}
                            name="product"
                        >
                            {choiceProduct.length > 0 && selectChoice(choiceProduct)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} >
                    <TextField 
                        label='Total usado'
                        value={productChoiceCurrent.totalUsed}
                        onChange={handleChangeProduct}
                        name='totalUsed'
                        type='number'
                    />
                </Grid>
                <Grid item xs={3} >
                    <Button
                        onClick={onClick}
                        style={{backgroundColor: '#124999', color: '#fff'}}
                    > 
                        <AddIcon/>Adicionar Produto
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={12} justify='space-around' style={{marginTop: '25px'}}>
                {productsUsed.map(productUsed => (
                         <Grid item xs={5} style={{margin: '5px', border: 'solid'}} key={productUsed.product.productId}>
                             <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <IconButton aria-label="delete" onClick={onClickRemoveProduct.bind(this, productUsed)}>
                                    <DeleteIcon fontSize="large" style={{color: '#f44336'}} />
                                </IconButton>
                             </div>
                            <TextField 
                                size="small"
                                disabled={true}
                                label='Produto'
                                value={productUsed.product.name}
                                style={{margin: '5px'}}
                            />
                            <TextField 
                                size="small"
                                disabled={true}
                                label='Total Usado'
                                value={productUsed.totalUsed}
                                style={{margin: '5px'}}
                            />
                            <PriceInputMaterial
                                size="small"
                                disabled={true}
                                label='Valor Unitário'
                                value={productUsed.product.value}
                                textAlign="left"
                                style={{margin: '5px'}}
                                options={{
                                    style: 'currency',
                                    currency: 'BRL',
                                }}
                            />
                            <PriceInputMaterial
                                size="small"
                                disabled={true}
                                label='Valor Total'
                                value={productUsed.product.value*productUsed.totalUsed}
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

export default Step3;