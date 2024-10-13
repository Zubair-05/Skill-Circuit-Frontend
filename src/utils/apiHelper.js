import log from "eslint-plugin-react/lib/util/log.js";
import axios from "axios";

export const getApiCall = async (path, param, query, headers) => {
    try{
        const url = process.env.BASE_URL + path;
        const response = await axios.get(url, {
            params: param,
            withCredentials: true
        })
        return response;
    } catch (err){
        console.log(err);
        throw err;
    }
}

export const postApiCall = async (path, body, params, query, headers) => {
    try{
        const url = process.env.BASE_URL + path;
        const response = await axios.post(url, body, {
            withCredentials: true,
            params: params
        })
        console.log(response)
        return response;
    } catch (err){
        console.log(err);
        throw err;
    }
}
