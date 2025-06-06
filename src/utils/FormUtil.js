import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";


class FormUtil extends React.Component {

    render() {
        const { onSubmit, validation, initialValues, btnName } = this.props;

        return (

            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="sign-form">
                        {Object.keys(initialValues).map((field, index) => (
                            <div className="form-items" key={index}>
                                <label className="form-label">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <Field
                                    className={`form-control ${errors[field] && touched[field] ? 'border-error' : 'border-normal'}`}
                                    type={field.includes("password") ? "password" : field.includes("confirmPass") ? "password" : "text"}
                                    id={field}
                                    name={field}
                                    placeholder={
                                        field.includes("password") || field.includes("confirmPass") ? "********" : `Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`
                                    }
                                    autoComplete={field.includes("password") || field.includes("confirmPass") ? "new-password" : "off"}
                                ></Field>
                                <ErrorMessage className="error-input-message" name={field} component="div"></ErrorMessage>
                            </div>
                        ))}
                        <div className="form-items form-bottom">
                            <button className="btn btn-submit pointer" type="submit" disabled={isSubmitting}>
                                {btnName}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        )

    }
}

export default FormUtil;