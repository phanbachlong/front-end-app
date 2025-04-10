import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";



class RegisterForm extends React.Component{

    render(){
        const {onSubmit, validationSchema,serverError, showServerError } = this.props;

        return(
            <Formik
                initialValues={{firstName: '', lastName: '', username: '', email: '', password: '', confirmPass: ''}}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({isSubmitting, errors, touched}) => (
                    <Form className="sign-form">
                        {['firstName', 'lastName', 'username', 'email', 'password', 'confirmPass'].map((field, index) => (
                            <div className="form-items" key={index}>
                                <label className="form-label">
                                    {field === 'confirmPass' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <Field 
                                    className={`form-control ${errors[field] && touched[field] ? 'border-error' : 'border-normal'}`}
                                    type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                                    id={field}
                                    name={field}
                                    placeholder={
                                        field === "email"
                                            ? "Enter email (Ex: abc@gmail.com)"
                                            : field.includes("password")
                                                ? "********"
                                                : `Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`
                                    }
                                    autoComplete={field.includes("password") ? "new-password" : "off"}
                                ></Field>
                                <ErrorMessage className="error-input-message" name={field} component="div"></ErrorMessage>
                            </div>
                        ))}
                        {showServerError && (
                            <div className="error-server-message show">{serverError}</div>
                        )}

                        <div className="form-items form-bottom">
                            <button className="btn btn-submit" type="submit" disabled={isSubmitting}>
                                Sign up
                            </button>
                        </div>
                    </Form>
                    )}
            </Formik>
        )

    }
}

export default RegisterForm;