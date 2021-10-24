import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({isEnabled, ...props}) => {
    console.log("protectedRoute: isEnabled:", isEnabled);
    let isAuth = sessionStorage.getItem("isAuth");
    let hasAuth = (isEnabled || (isAuth === "true"));
    console.log("protectedRoute: hasAuth:", hasAuth);
    return hasAuth ? <Route {...props} /> : <Redirect to="/login"/>;
};

// class ProtectedRoute extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             isAuthed: false,
//             hasAuthed: false
//         }
//     }
//
//     checkAuth = (res) => {
//         if (res.status === 200) {
//             if(res.data.status === 0 && res.data.msg === "登录成功！")
//                 this.setState({isAuthed: true, hasAuthed: true})
//             else
//                 this.setState({isAuthed: false, hasAuthed: true})
//         } else {
//             this.setState({isAuthed: false, hasAuthed: true})
//         }
//     }
//     componentDidMount() {
//         console.log("componentWillMount");
//         userService.checkSession(this.checkAuth);
//     }
//
//     render(){
//         console.log("render");
//         if(!this.state.hasAuthed)
//             return null;
//         return <Route render={props=>(
//             this.state.isAuthed?
//                 (<Route {...props} />):
//                 (<Redirect to={{
//                     pathname: '/login',
//                     state: {from: props.location}
//                 }}/>)
//         )}/>
//     }
// }

export default ProtectedRoute;