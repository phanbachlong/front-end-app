import React from "react";
import '../../css/Login.css';
import Validation from "./ValidateLogin";
import FormUtil from "../../utils/FormUtil";
import LogoLogin from "../../assets/img/f.jpg"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {

    const dispatch = useDispatch();
    const {error, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);
    console.log("Auth state:", authState);


  
    
    const handleLoginFormSubmit = async (values, {setSubmitting}) => {
        console.log("Form submitted with:", values);
        try {
            const res = await dispatch(login(values));
            console.log("Login payload:", res.payload);
            if (login.fulfilled.match(res) && res.payload?.token) {
                console.log("Login success, Redirecting...");
                localStorage.setItem('token', res.payload.token);
                navigate('/home');
            }
            
        } catch (error) {
            console.log(error)
        }finally{
            setSubmitting(false)
        }
    }

    const initialValues = { username: '', password: '' };

    return (
        <div className="sign-container">
            <div className="sign-header">
                <p className="sign-header-title">Welcome to VTI Academy</p>
                <p className="sign-header-description">Sign to your account to continue</p>
            </div>

            <div className="sign-body">
                <div className='img-content'>
                    <img alt="login" src={LogoLogin} width="50%" className='login-img-detail' />
                </div>
                <FormUtil initialValues={initialValues} onSubmit={handleLoginFormSubmit} validation={Validation} btnName={loading ? 'Logging in...' : 'Login'} ></FormUtil>
                {error && <p className="error-msg">{error}</p>}

                <div className="redirect-link">
                    <p>Don't have account?</p>
                    <Link to="/register" className="link">Sign up here</Link>
                </div>
            </div>

        </div>
    )   

}

export default Login;