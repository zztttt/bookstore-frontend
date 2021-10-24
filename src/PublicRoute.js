import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from "./utils/auth";
import * as userService from "./services/userService"

const PublicRoute = ({isEnabled, ...props}) => {
    console.log("publicRoute: isEnabled:", isEnabled);
    let isAuth = sessionStorage.getItem("isAuth");
    return (isEnabled || (isAuth === "true")) ? <Redirect to="/"/> : <Route {...props}/>;
};

// class PublicRoute extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             isAuthed: true,
//             hasAuthed: false
//         }
//     }
//
//     checkAuth = (res) => {
//         console.log("public check Auth");
//         if (res.status === 200) {
//             if(res.data.status === 0 && res.data.msg === "登录成功！"){
//                 this.setState({isAuthed: true, hasAuthed: true});
//                 console.log("success.", this.state.isAuthed);
//             }
//             else
//                 this.setState({isAuthed: false, hasAuthed: true})
//         } else {
//             this.setState({isAuthed: false, hasAuthed: true})
//         }
//     }
//
//     componentDidMount() {
//         console.log("componentWillMount");
//         userService.checkSession(this.checkAuth);
//     }
//
//     render(){
//         console.log("render.", this.state.isAuthed);
//         if(!this.state.hasAuthed)
//             return null;
//         return <Route render={props=>(
//             this.state.isAuthed?
//                 (<Redirect to={{
//                     pathname: '/',
//                     state: {from: props.location}
//                 }}/>):
//                 (<Route {...props} />)
//         )}/>
//
//     }
// }

export default PublicRoute;