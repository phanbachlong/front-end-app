import React from "react";
import '../css/Register.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Validation from "../validate/validate";
import RegisterService from "./RegisterService";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            serverError: '',
            showServerError: false,
            showModal: false
        }
    }



    render() {
        return (
            <div className="register-container">
                <div className="register-header">
                    <p className="register-header-title">Get start</p>
                    <p className="register-header-description">Create account to experience the course at VTI Academy</p>
                </div>

                {this.state.showModal && (
                    <SuccessModal onClose={() => this.setState({ showModal: false })} />
                )}

                <div className="register-body">
                    <Formik
                        initialValues={{ firstName: '', lastName: '', username: '', email: '', password: '', confirmPass: '' }}
                        validationSchema={Validation}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                const res = await RegisterService.createUser(values);
                                resetForm();
                                this.setState({ serverError: "Success!!!", showModal: true });
                            } catch (error) {
                                let errorMessage = "Failure!!!";
                                if (error.response && error.response.data && error.response.data.message) {
                                    errorMessage = error.response.data.message;
                                }
                                this.setState({ serverError: errorMessage, showServerError: true });
                            } finally {
                                setTimeout(() => {
                                    this.setState({ showServerError: false });
                                }, 3000);
                                setSubmitting(false);
                            }
                        }}>

                        {({ isSubmitting, errors, touched }) => (
                            <Form className="reigster-form" >
                                <div className="form-items">
                                    <label className="form-label">First Name</label>
                                    <Field className={`form-control ${errors.firstName && touched.firstName ? 'border-error' : 'border-normal'}`} type="text" id="firstName" name="firstName" placeholder="Enter first name"></Field>
                                    <ErrorMessage className="error-input-message" name="firstName" component="div"></ErrorMessage>
                                </div>

                                <div className="form-items">
                                    <label className="form-label">Last Name</label>
                                    <Field className={`form-control ${errors.lastName && touched.lastName ? 'border-error' : 'border-normal'}`} type="text" id="lastName" name="lastName" placeholder="Enter last name"></Field>
                                    <ErrorMessage className="error-input-message" name="lastName" component="div"></ErrorMessage>
                                </div>

                                <div className="form-items">
                                    <label className="form-label">Username</label>
                                    <Field className={`form-control ${errors.username && touched.username ? 'border-error' : 'border-normal'}`} type="text" id="username" name="username" placeholder="Enter user name"></Field>
                                    <ErrorMessage className="error-input-message" name="username" component="div"></ErrorMessage>
                                </div>

                                <div className="form-items">
                                    <label className="form-label">Email</label>
                                    <Field className={`form-control ${errors.email && touched.email ? 'border-error' : 'border-normal'}`} type="email" id="email" name="email" placeholder="Enter email (Ex: abc@gmail.com)"></Field>
                                    <ErrorMessage className="error-input-message" name="email" component="div"></ErrorMessage>
                                </div>

                                <div className="form-items">
                                    <label className="form-label">Password</label>
                                    <Field className={`form-control ${errors.password && touched.password ? 'border-error' : 'border-normal'}`} type="password" id="password" name="password" placeholder="********" autoComplete="current-password"></Field>
                                    <ErrorMessage className="error-input-message" name="password" component="div"></ErrorMessage>
                                </div>

                                <div className="form-items">
                                    <label className="form-label">Confirm Password</label>
                                    <Field className={`form-control ${errors.confirmPass && touched.confirmPass ? 'border-error' : 'border-normal'}`} type="password" id="confirmPass" name="confirmPass" placeholder="********" autoComplete="new-password"></Field>
                                    <ErrorMessage className="error-input-message" name="confirmPass" component="div"></ErrorMessage>
                                </div>

                                {this.state.showServerError && (
                                    <div className="error-server-message show ">{this.state.serverError}</div>
                                )}

                                <div className="form-items form-bottom">
                                    <button className="btn btn-submit" type="submit" disabled={isSubmitting}>Sign up</button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        )
    }
}

const SuccessModal = ({ onClose }) => (
    <div className="modal-overlay">
        <div className="modal">
            <div className="modal-header">
                <div className="modal-title">
                    You need to confirm your account
                </div>
            </div>

            <div className="modal-body">
                <p className="modal-paragraph">
                    We have sent an email to <strong>{this.state.email}</strong>.
                </p>
                <p className="modal-paragraph">
                    Please check your email to active account.
                </p>
            </div>

            <div className="modal-footer">
                <button className="resend-btn btn">Resend</button>
                <button className="close-btn btn">Got it</button>
            </div>
        </div>
    </div>
);




export default Register;