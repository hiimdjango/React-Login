import React, { Component } from 'react';

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBiqZUCWrzJUDc8ClJbMIEyVPttpnGnZYc",
    authDomain: "usurvey-720ac.firebaseapp.com",
    databaseURL: "https://usurvey-720ac.firebaseio.com",
    projectId: "usurvey-720ac",
    storageBucket: "usurvey-720ac.appspot.com",
    messagingSenderId: "580784096796"
  };
  firebase.initializeApp(config);
  
class Authen extends Component {
    render() {
        return(
            <div>
                <input ref='email' id='email' type='email' placeholder='Enter your email' />
                <input ref='password' id='password' type='password' placeholder='Enter your password' /><br/>
                <button>Login</button>
                <button>Sign up</button>
                <button>Logout</button>
            </div>
        )
    }
}

export default Authen;