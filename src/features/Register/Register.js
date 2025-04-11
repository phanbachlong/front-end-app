import React, { useState } from "react";
import '../../css/Register.css'
import Validation from "./ValidateRegister";
import RegisterService from "./RegisterService";
import SuccessModalRegister from "./SuccessModalRegister";
import FormUtil from "../../utils/FormUtil";
import { Link } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState('');
    const [serverError, setServerError] = useState('');
    const [showServerError, setShowServerError] = useState(false);
    const [showModal, setShowModal] = useState(false)

   

    const handleRegisterFormSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await RegisterService.createUser(values);
            setEmail(values.email);
            setShowModal(true)
            resetForm();
        } catch (error) {
            let errorMessage = "Failure!!!";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            setServerError(errorMessage);
            setShowServerError(true);
        } finally {
            setTimeout(() => setShowServerError(false), 3000);
            setSubmitting(false);
        }
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
                    <FormUtil initialValues={initialValues} onSubmit={handleRegisterFormSubmit} validation={Validation} serverError={serverError} showServerError={showServerError} btnName="Sign up"></FormUtil>
                    <div className="redirect-link">
                        <p>Already have an account?</p>
                        <Link to="/login" className="link">Login</Link>
                    </div>
                </div>

            </div>
        )
}



export default Register;