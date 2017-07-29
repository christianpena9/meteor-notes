import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        
        this.onSubmit = this.onSubmit.bind(this);
    } // End of constructor
    
    
    onSubmit(e) {
        e.preventDefault();
        
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        
        if (password.length < 9) {
            return this.setState({error: 'Password must be more than 8 characters long'});
        }
        
        Accounts.createUser({email, password}, (err) => {
            if (err) {
                this.setState({error: err.reason});
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
                    <h1>Join</h1>
                    
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    
                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" autoComplete="off"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Create Account</button>
                    </form>
                    
                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
} // End of Signup class

export default Signup;