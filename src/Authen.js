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
    state = {
        msg:'',
        isLoggedIn:false
    }

    //Authentification with Firebase and return Message ( this.state.msg)
    login = ( event ) => {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);

        promise
        .then(user => {
            // Customise Msg with user email.
            let msg = 'Welcome back '+ email;
            const welcomeMsg = document.getElementById('msg');
            // Show msg in green
            welcomeMsg.classList.add('green');
            this.setState({msg:msg,isLoggedIn:true});
        })
        promise
        .catch(e => {
            let err = e.message; //Get error message
            const errMsg = document.getElementById('msg');
            //Show message in Red
            errMsg.classList.remove('green');
            errMsg.classList.add('red');
            this.setState({msg:err});
        });   
    }
    //Sign up with Firebase and return Message ( this.state.msg )
    signUp = ( event ) => {
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email,password);

        promise
        .then(user => {
            let msg='Welcome '+user.user.email +'! You can login with your new account!'; //Set custon msg
            //Add user to database 
            firebase.database().ref('users/'+user.user.uid).set({
                email: email,
                password: password
            });
            const welcomeMsg = document.getElementById('msg');
            //Show Msg in Green
            welcomeMsg.classList.add('green');
            this.setState({msg:msg});
        });
        promise
        .catch(e => {
            let err=e.message; //Get error msg
            const errMsg = document.getElementById('msg');
            //Show Msg in red
            errMsg.classList.remove('green');
            errMsg.classList.add('red');
            this.setState({msg:err});
        });

    }

    signOut = () => {
        firebase.auth().signOut();
        this.setState({isLoggedIn:false,msg:'You have succesfuly logged Out'});
    }

    render() {
        return(
            <div className='Authen'>
                {!this.state.isLoggedIn ? <div>
                    <input ref='email' id='email' type='email' placeholder='Email' /><br/>
                    <input ref='password' id='password' type='password' placeholder='Password' /><br/>
                </div> : null }   
                <p id="msg">{this.state.msg}</p>
                {!this.state.isLoggedIn ? <button onClick={this.login}>Login</button> : null}
                {!this.state.isLoggedIn ? <button onClick={this.signUp} className='register'>Sign up</button> : null}
                {this.state.isLoggedIn ? <button onClick={this.signOut} id="logout" >Logout</button> : null}
            </div>
        )
    }
}

export default Authen;