import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";


class LoginForm extends React.Component{
    
    render(){
        const {onSubmit, validation, src} = this.props;

        return(

            <Formik
                initialValues={{username: '', password: ''}}
                validationSchema={validation}
                onSubmit={onSubmit}
            >
                {({isSubmitting, errors, touched}) => (
                    <Form className="sign-form">
                        <div className="sign-img">
                            <img src={src} className="sign-img-detail"></img>
                        </div>

                        {['username', 'password'].map((field, index) => (
                            <div className="form-items" key={index}>
                                <label className="form-label">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <Field
                                    className={`form-control ${errors[field] && touched[field] ? 'border-error' : 'border-normal'}`}
                                    type={field.includes("password") ? "password" : "text"}
                                    id={field}
                                    name={field}
                                    placeholder={
                                        field.includes("password") ? "********" : `Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`
                                    }
                                    autoComplete={field.includes("password") ? "new-password" : "off"}
                                ></Field>
                                <ErrorMessage className="error-input-message" name={field} component="div"></ErrorMessage>
                            </div>
                        ))}
                        <div className="form-items form-bottom">
                            <button className="btn btn-submit" type="submit" disabled={isSubmitting}>
                                Sign in
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        )

    }
}

export default LoginForm;