import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        
        /*
            Method 2. Using function defined in constructor
            URL: http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html
        */
        this.onSubmit = this.onSubmit.bind(this);
    } // End of constructor
    
    onSubmit(e) {
        e.preventDefault();
        
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        
        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
                this.setState({error: 'Unable to login. Check email and password.'});
            } else {
                this.setState({error: ''});
            }
        });
        
        e.target.email.value = '';
        e.target.password.value = '';
    }
    
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>
                    
                    {/* Below the undefined or null is ignored by JSX */}
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    
                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" autoComplete="off"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Login</button>
                    </form>
                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
        );
    }
}

export default Login;