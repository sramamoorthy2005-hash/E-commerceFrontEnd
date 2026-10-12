import axios, { create } from "axios";

const url = 'https://dummyjson.com' ;

const productApi = axios.create({
    baseURL:url,
    headers:{
        'Content-Type' : 'application/json',
    },
});

export const getProducts = ()=>productApi.get('/products');
// const productId = (id)=>productApi.get(`/products/${id}`);
