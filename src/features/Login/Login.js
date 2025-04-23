import '../../css/Login.css';

import LogoLogin from "../../assets/img/f.jpg"
import {  Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import Validation from "./ValidateLogin";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Sử dụng useForm từ React Hook Form để đăng ký các trường trong form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(Validation),
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = (data) => {
    dispatch(login(data)).then((rs) => {
      if (rs.payload) {
        navigate('/home');
      }
    });
  };

  return (
    <div className="sign-container">
      <div className="sign-header">
        <p className="sign-header-title">Welcome to VTI Academy</p>
        <p className="sign-header-description">Sign in to your account to continue</p>
      </div>

      <div className="sign-body">
        <div className='img-content'>
          <img alt="login" src={LogoLogin} width="50%" className='login-img-detail' />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="sign-form">
          <div className="form-items">
            <label className="form-label">Username</label>
            <input
              {...register("username")}
              className={`form-control ${errors.username ? 'border-error' : 'border-normal'}`}
              type="text"
              placeholder="Enter username"
            />
            {errors.username && <div className="error-input-message">{errors.username.message}</div>}
          </div>

          <div className="form-items">
            <label className="form-label">Password</label>
            <input
              {...register("password")}
              className={`form-control ${errors.password ? 'border-error' : 'border-normal'}`}
              type="password"
              placeholder="********"
            />
            {errors.password && <div className="error-input-message">{errors.password.message}</div>}
          </div>

          <div className="form-items form-bottom">
            <button className="btn btn-submit pointer" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        
        {error && <p className="error-msg">{error}</p>}

        <div className="redirect-link">
          <p>Don't have an account?</p>
          <Link to="/register" className="link">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;