import config from 'config';
import {postRequest, Get, Post} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';



export const login = (data, callback) => {
    const url = `${config.apiUrl}/login`;
    console.log("login");
    // const callback = (res) => {
    //     if(res.status === 0){
    //         history.push("/");
    //         message.success(data.msg);
    //     }
    // }
    // Post(url, data, callback);
    postRequest(url, data, callback);
};

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

// export const checkSession = (callback) => {
//     const url = `${config.apiUrl}/checkSession`;
//     postRequest(url, {}, callback);
// };

export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    Post(url, {}, callback);
}

