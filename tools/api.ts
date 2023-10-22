import axios from "axios";

const GET_PRESIGNED_URLS = (strings: TemplateStringsArray, num: number) => `/media/report/upload/${num}`
const CREATE_ISSUE = `/report/create`
export const GET_PRODUCTS_FAULTS = (strings: TemplateStringsArray, product: string) => encodeURI(`/report/list/products/${product}`)
export const GET_PRODUCT_FAULTS = (strings: TemplateStringsArray, product: string) => encodeURI(`/report/list/product/${product}`)

const request = axios.create({
    baseURL: 'http://172.22.151.63:3000/'
})

export type FetchPresignedUrlsResponse = {
    urlToDownload: string,
    urlToUpload: string,
}[]

export const fetchPresignedUrls = async (num: number) => {
    const response = await request.post<FetchPresignedUrlsResponse>(GET_PRESIGNED_URLS`${num}`);
    return response.data;
}

export type CreateIssueRequest = {
    title: string,
    description: string,
    mediaUrls: string[],
    sellerName: string,
    productName: string,
    productSN: string,
    productCompany: string,
    transactionDate: string,
    consumerAddress: string,
    email: string,
    returnOrExchange?: "return" | "exchange";
    accountNumber?: string;
    desiredAmountToReturn?: number;
}

export type CreateIssueResponse = {
    "_id": "65345842d75fa47c5fac9baa",
    "consumerAddress": string,
    "createdAt": string,
    "description": string,
    "email": string,
    "mediaUrls": string[],
    "productCompany": string,
    "productName": string,
    "returnOrExchange": string,
    "sellerName": string,
    "state": string,
    "title": string,
    "transactionDate": string,
    "updatedAt": string,
    "userId": string
}


export const createIssue = async (req: CreateIssueRequest) => {
    const response = await request.post<CreateIssueResponse>(CREATE_ISSUE, req)
    return response.data;
}

export type FetchProductsFaultsResponse = {
    "name": string,
    "href": string,
    "decisionDate": string,
    "ean": string,
    "decisionDescription": string,
    "model": string,
    "type": string
}[]

export const fetchProductsFaults = async (product: string) => {
    const response = await request.get<FetchProductsFaultsResponse>(GET_PRODUCTS_FAULTS`${product}`);
    return response.data;
}

export type FetchProductFaultsResponse = {
    reason: string,
    count: number
}[]

export const fetchProductFaults = async (product: string) => {
    const response = await request.get<FetchProductFaultsResponse>(GET_PRODUCT_FAULTS`${product}`);
    return response.data;
}
