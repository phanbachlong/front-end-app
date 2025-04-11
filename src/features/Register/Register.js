import React, { useState } from "react";
import '../../css/Register.css'
import Validation from "./ValidateRegister";
import SuccessModalRegister from "./SuccessModalRegister";
import FormUtil from "../../utils/FormUtil";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

const Register = () => {

    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('')

    const handleRegisterFormSubmit = async (values, { setSubmitting, resetForm }) => {
        const rsAction = await dispatch(registerUser(values));

        console.log(rsAction);

        if (registerUser.fulfilled.match(rsAction)) {
            setShowModal(true);
            setEmail(values.email);
            resetForm();
        } else if (registerUser.rejected.match(rsAction)) {
            console.error("Đăng ký thất bại: ", rsAction.payload);
        }
        setSubmitting(false);
    }


    const initialValues = { firstName: '', lastName: '', username: '', email: '', password: '', confirmPass: '' };

    return (
        <div className="sign-container">
            <div className="sign-header">
                <p className="sign-header-title">Get start</p>
                <p className="sign-header-description">Create account to experience the course at VTI Academy</p>
            </div>

            {showModal && (
                <SuccessModalRegister email={email} onClose={() => setShowModal(false)} />
            )}

            <div className="sign-body">
                <FormUtil initialValues={initialValues} onSubmit={handleRegisterFormSubmit} validation={Validation} serverError={error} showServerError={!!error} btnName={loading ? "Signing up..." : "Sign up"}></FormUtil>
                <div className="redirect-link">
                    <p>Already have an account?</p>
                    <Link to="/login" className="link">Login</Link>
                </div>
            </div>

        </div>
    )
}



export default Register;