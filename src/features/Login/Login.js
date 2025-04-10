import React from "react";
import '../../css/Login.css';
import Validation from "./ValidateLogin";
import LoginForm from "./LoginForm";
import LoginApi from "../../api/LoginApi";
import LoginLogo from "../../assets/img/f.jpg"                    

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLoginFormSubmit = async (value, {setSubmitting}) => {
        try {
            LoginApi.login(value);
        } catch (error) {
            
        }
    }

    render() {
        return (
            <div className="sign-container">
                
                

                <div className="sign-header">
                    <p className="sign-header-title">Welcome to VTI Academy</p>
                    <p className="sign-header-description">Sign to your account to continue</p>
                </div>

                <div className="sign-body">
                    
                    <LoginForm src={LoginLogo} onSubmit={this.handleLoginFormSubmit} validation={Validation}></LoginForm>
                </div>

            </div>
        )
    }

}

export default Login;