import React from 'react';
import { BrowserRouter, Router, Switch, Redirect, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import LoginRoute from  './LoginRoute'
import HomeView from "./view/HomeView";
import LoginView from './view/LoginView'
import {history} from "./utils/history";
import BookView from "./view/BookView";
import TestView from "./view/TestView";
import ProtectedRoute from "./ProtectedRoute";
import * as userService from "./services/userService"
import auth from "./utils/auth";
import {message} from "antd";
import PublicRoute from "./PublicRoute";


class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });

        this.state = {
            isAuthed: false
        }
    }

    componentDidMount() {
        console.log("router mount");
        auth.get('/checkSession').then(
            async (response) => {
                const res = await response;
                console.log("response:", res);
                if (res.status === 200 && res.data.status === 0 && res.data.msg === "登录成功！") {
                    sessionStorage.setItem("isAuth", "true");
                    this.setState({isAuthed: true});
                } else {
                    message.error(res.data.msg);
                    this.setState({isAuthed: false});
                }
            })
            .catch(
                async (error) => console.log(error)
            )
    }
// {/*<PrivateRoute exact path="/" component={HomeView} />*/}
// {/*<LoginRoute exact path="/login" component={LoginView} />*/}
// {/*<PrivateRoute exact path="/bookDetails" component={BookView} />*/}
// <Redirect from="/*" to="/" />
// <Route exact path = "/" component={HomeView}/>
// <Route exact path = "login" component = {LoginView}/>
// <ProtectedRoute path = "/" component = {HomeView} isEnabled={this.state.isAuthed}/>
    render(){
        return(
            <Router history = {history}>
                <Switch>
                    <ProtectedRoute exact path = "/" component = {HomeView} isEnabled = {this.state.isAuthed}/>
                    <PublicRoute exact path="/login" component={LoginView} isEnabled={this.state.isAuthed}/>
                    <Route exact path = "/test" component = {TestView}/>
                </Switch>
            </Router>
        )
    }


}

export default BasicRoute;