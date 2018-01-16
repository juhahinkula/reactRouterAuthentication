import React, { Component } from 'react';
import { firebaseAuth } from './config';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = { email: '', password: '', redirect: false};

  onLoginClick = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    firebaseAuth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirect 
        this.setState({ redirect: true }); 
      })
      .catch(() => {
        // No account found. Create a new one and send verification email
        firebaseAuth().createUserWithEmailAndPassword(email, password)
          .then(() => { 
            var user = firebaseAuth().currentUser;
            user.sendEmailVerification().then(function() {
              toast.success("Verifiaction email sent.", {
                position: toast.POSITION.TOP_RIGHT
              });
            }).catch(function(error) {
              toast.error("Error in authentication.", {
                position: toast.POSITION.TOP_RIGHT
              });
            });
           })
          .catch(() => {
            toast.warn("Could not login. Check your email and password.", {
              position: toast.POSITION.TOP_RIGHT
            });           
          });
      });
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to='/home' />);
    }

    return (
      <div className="container">
        <h2 className="text-center">Login Form</h2>
        <div className="form-signin">
        <div className="col-md-6">
        <div className="row">
          <input 
            type="email" className="form-control" style={{margin: "10px"}} placeholder='email@domain.com'
            name="email" onChange={this.handleChange}
          />
        </div>
        <div className="row">
          <input 
            style={{margin: "10px"}} className="form-control" type='Password'
            name="password" onChange={this.handleChange}
          />
        </div>
        <div className="row">
          <button onClick={this.onLoginClick} className="btn btn-primary">Login</button>
        </div>
        </div>
        </div>
        <ToastContainer />
        </div>
      );
  }
}

export default Login;