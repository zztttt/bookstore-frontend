import React from 'react';
import {List, message} from 'antd'
import {Book} from './Book'
import {getBooks} from "../services/bookService";
import {history} from '../utils/history';


export class BookList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {books:[]};
    }

    componentDidMount() {
        const callback =  (res) => {
            if(res.status === 200)
                if(res.data.hasOwnProperty("msg") && res.data.hasOwnProperty("status")){
                    history.push("/");
                    sessionStorage.setItem("isAuth", "false");
                    message.error(res.data.msg);
                }else{
                    console.log("set books:", res.data);
                    this.setState({books: res.data});
                }
            else{

                message.error(res.data.msg);
            }
        };
        getBooks({"search":null}, callback);
    }

    render() {
        return (
            <List
                grid={{gutter: 10, column: 4}}
                dataSource={this.state.books}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 16,
                }}

                renderItem={item => (
                    <List.Item>
                        <Book info={item} />
                    </List.Item>
                )}
            />
        );
    }

}