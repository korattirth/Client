import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../model/Pagination";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve,500));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

interface responseDataType {
    title : string,
    status : number,
    errors? : { [key: string]: string } 
}

const responseBody = (response : AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.User?.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if(process.env.NODE_ENV === 'development') await sleep();
    const pagination = response.headers['pagination'];
    if(pagination){
        response.data = new PaginatedResponse(response.data , JSON.parse(pagination));
        return response
    }
    return response;
}, (error:AxiosError) => {
    
    const { status} = error.response!;
    const data = error.response?.data as responseDataType
    switch(status){
        case 400:
            if(data.errors){
               const modelStateErrors : string[] = [];
               for(const key in data.errors){
                if(data.errors[key]){
                    modelStateErrors.push(data.errors[key])
                }
               }
               throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error('You are not allowed to do that!');
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            history.push('/server-error',  {errors : data})
            break;
    }
    return Promise.reject(error.response)
}
)

const request = {
    get : (url : string , params? : URLSearchParams) => axios.get(url,{params}).then(responseBody),
    post : (url : string , body : {}) => axios.post(url,body).then(responseBody),
    put : (url : string, body : {}) => axios.put(url,body).then(responseBody),
    delete : (url : string) => axios.delete(url).then(responseBody),
    postForm : (url :string , data: FormData) => axios.post(url , data , {
        headers : {'Contetnt-type' : 'multipart/form-data'}
    }).then(responseBody),
    putForm : (url : string , data : FormData) => axios.put(url , data ,{
        headers : {'Content-type' : 'multipart/form-data'}
    }).then(responseBody)
}

const createFormData = (item : any) => {
    let formData = new FormData();
    for (const key in item){
        formData.append(key , item[key])
    }
    return formData;
}

const Admin = {
    createProduct : (product : any) => request.postForm('products' , createFormData(product)),
    updateProduct : (product : any) => request.putForm('products' , createFormData(product)),
    deleteProduct : (id : number) => request.delete(`products?Id=${id}`)
}

const Catalog = {
    list : (params : URLSearchParams) => request.get('products',params),
    details : (id:number) => request.get(`products/${id}`),
    fetchFilters : () => request.get('products/filters')
}

const Orders = {
    list : () => request.get('orders'),
    fetch : (id : number) => request.get(`orders/${id}`),
    create : (values : any) => request.post('orders',values)
}

const TestErrors = {
    get400Error : () => request.get('buggy/bad-request'),
    get401Error : () => request.get('buggy/unauthorised'),
    get404Error : () => request.get('buggy/not-found'),
    get500Error : () => request.get('buggy/server-error'),
    getValidationError : () => request.get('buggy/validation-error'),
}

const Basket = {
    get: () => request.get('basket'),
    addItem : (productId:number,quantity = 1) => request.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem : (productId:number,quantity = 1) => request.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login : (value : any) => request.post('account/login',value),
    register : (value : any) => request.post('account/register',value),
    currentUser : () => request.get('account/currentUser'),
    fetchAddress : () => request.get('account/savedAddress')
}

const Payments = {
    createPaymentIntent: () => request.post('payment', {}),
}
const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Orders,
    Payments,
    Admin
}

export default agent;
