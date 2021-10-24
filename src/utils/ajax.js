import axios from 'axios'


let Get = (url, data, callback) => {
    axios.get(url)
        .then(res => {
            //console.log(res);
            callback(res);
        })
        .catch(error => {
            console.log(error)
        })
}

let Post = (url, data, callback) => {
    axios.post(url, data)
        .then(res => {
            callback(res);
            return res;
        })
        .catch(error => {
            console.log(error);
        })
}


let postRequest_v2 = (url, data, callback) => {
    let formData = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "POST",
        body: formData,
        credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
           console.log(error);
        });
};

let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {postRequest,postRequest_v2, Get, Post};