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
      return (<Redirect to='/' />);
    }

    return (
      <div class="container py-5">
        <div class="row">
          <div class="col-md-12">
          <h2 class="text-center text-white mb-4">Login Form</h2>
            <div class="row">
              <div class="col-md-6 mx-auto">
                <span class="anchor" id="formLogin"></span>
                <div class="card rounded-0">
                  <div class="card-header">
                    <h3 class="mb-0">Login</h3>
                  </div>
                  <div class="card-body">
                    <form class="form" role="form" autocomplete="off" id="formLogin">
                      <div class="form-group">
                        <label for="uname1">Email</label>
                        <input type="text" class="form-control form-control-lg rounded-0"  name="email" onChange={this.handleChange} placeholder='email@domain.com' />
                      </div>
                      <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control form-control-lg rounded-0" name="password" onChange={this.handleChange} />
                      </div>
                        <button type="button" onClick={this.onLoginClick} class="btn btn-success btn-lg float-right">Login</button>
                      </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>      
    );
  }
}

export default Login;