import React from "react";
import '../../css/Register.css'
import RegisterService from "./RegisterService";

class SuccessModalRegister extends React.Component{
    constructor(props){
        super(props)
        this.state={
            message: '',
            isResending: false,
            resendDisabled: false,
        }
    }

    handleResendCode = async () =>{

        this.setState({ isResending: true, resendDisabled: true });

        try {
            await RegisterService.resendEmail(this.props.email);
            this.setState({message: "Resend successful. Please check your email."})
        } catch (error) {
            this.setState({ message: "Resend failed. Please try again." });
        }

        setTimeout(() => {
            this.setState({ resendDisabled: false });
          }, 5000);
      
          this.setState({ isResending: false });

        setTimeout(() => this.setState({ message: "" }), 5000);
    }

    render(){

        const {email, onClose} = this.props;
        const {message, resendDisabled} = this.state;

        return(
            <div className="modal-overlay">
        <div className="modal">
            <div className="modal-header">
                <div className="modal-title">
                    You need to confirm your account
                </div>
            </div>
            <hr/>

            <div className="modal-body">
                <p className="modal-paragraph">
                    We have sent an email to <strong>{email}</strong>.
                </p>
                <p className="modal-paragraph">
                    Please check your email to active account.
                </p>
                {message && <p className="modal-paragraph modal-paragraph-message">
                    {message}
                </p>}
            </div>
            <hr/>

            <div className="modal-footer">
                <button className="resend-btn btn" onClick={this.handleResendCode} disabled={resendDisabled}>{resendDisabled ? "Please Wait..." : "Resend"}</button>
                <button className="close-btn btn" onClick={onClose}>Got it</button>
            </div>
        </div>
    </div>
        )
    }
}


export default SuccessModalRegister;