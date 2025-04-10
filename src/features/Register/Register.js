import React from "react";
import '../../css/Register.css'
import Validation from "./ValidateRegister";
import RegisterService from "./RegisterService";
import SuccessModalRegister from "./SuccessModalRegister";
import FormUtil from "../../utils/FormUtil";
import { Link } from "react-router-dom";

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

    handleRegisterFormSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await RegisterService.createUser(values);
            this.setState({
                email: values.email,
                serverError: "Success!!!",
                showModal: true

            });
            resetForm();
        } catch (error) {
            let errorMessage = "Failure!!!";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            this.setState({ serverError: errorMessage, showServerError: true })
        } finally {
            setTimeout(() => this.setState({ showServerError: false }), 3000);
            setSubmitting(false);
        }
    }

    render() {

        const initialValues = { firstName: '', lastName: '', username: '', email: '', password: '', confirmPass: '' };

        return (
            <div className="sign-container">
                <div className="sign-header">
                    <p className="sign-header-title">Get start</p>
                    <p className="sign-header-description">Create account to experience the course at VTI Academy</p>
                </div>

                {this.state.showModal && (
                    <SuccessModalRegister email={this.state.email} onClose={() => this.setState({ showModal: false })} />
                )}

                <div className="sign-body">
                    <FormUtil initialValues={initialValues} onSubmit={this.handleRegisterFormSubmit} validation={Validation} serverError={this.state.serverError} showServerError={this.state.showServerError} btnName="Sign up"></FormUtil>
                    <div className="redirect-link">
                        <p>Already have an account?</p>
                        <Link to="/login" className="link">Login</Link>
                    </div>
                </div>

            </div>
        )
    }
}



export default Register;