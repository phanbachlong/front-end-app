import React from "react";
import '../../css/Login.css';
import Validation from "./ValidateLogin";
import LoginApi from "../../api/LoginApi";
import FormUtil from "../../utils/FormUtil";
import LogoLogin from "../../assets/img/f.jpg"
import { Link } from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLoginFormSubmit = async (value, { setSubmitting }) => {
        try {
            await LoginApi.login(value);
        } catch (error) {

        }
    }

    render() {

        const initialValues = { username: '', password: '' };


        return (
            <div className="sign-container">
                <div className="sign-header">
                    <p className="sign-header-title">Welcome to VTI Academy</p>
                    <p className="sign-header-description">Sign to your account to continue</p>
                </div>

                <div className="sign-body">
                    <div className='img-content'>
                        <img src={LogoLogin} width="50%" className='login-img-detal' />
                    </div>
                    <FormUtil initialValues={initialValues} onSubmit={this.handleLoginFormSubmit} validation={Validation} btnName='Login'></FormUtil>

                    <div className="redirect-link">
                        <p>Don't have account?</p>
                        <Link to="/register" className="link">Sign up here</Link>
                    </div>
                </div>

            </div>
        )
    }

}

export default Login;