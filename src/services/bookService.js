import config from 'config';
import {postRequest, postRequest_v2, Get} from "../utils/ajax";


export const getBooks = (data, callback) => {
    const url = `${config.apiUrl}/getBooks`;
    //postRequest(url, data, callback);
    Get(url, data, callback);
};

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = `${config.apiUrl}/getBook`;
    postRequest_v2(url, data, callback);

};