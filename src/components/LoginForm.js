import React from 'react';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import 'antd/dist/antd.css';
import '../css/login.css'
import * as userService from '../services/userService'
import {history} from "../utils/history";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginSuccess: false
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const callback = (data, value) => {
            if(data.status >= 0) {
                //localStorage.setItem('user', JSON.stringify(data.data));
                history.push("/");
                sessionStorage.setItem("isAuth", "true");
                message.success(data.msg);
                this.render();
                // this.timer = setTimeout(()=>{
                //     this.forceUpdate();
                // }, 1000)
            }
            else{
                message.error(data.msg);
            }
        };
        this.props.form.validateFields((err, data) => {
            if (!err) {
                console.log('Received values of form: ', data);
                userService.login(data, callback);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedLoginForm
