import './App.css';
import { Component } from 'react';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

class App extends Component {

  state = {
    user: {}, 
    error: "",
  }

  signUp = user => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user:{
          username: user.username,
          password: user.password,
          first_name: user.firstName,
          last_name: user.lastName
        }
      })
    })
    .then(response => response.json())
    .then(user => this.setState({ user: user }) )
  }

  signIn = (user) => {
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username: user.username,
                password: user.password
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.token){
        localStorage.setItem('token', result.token)
        this.setState({
            user: result.user
            })
        }
        else {
            this.setState({
                error: result.error
            })
        }
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.user.username ? <h2>Welcome {this.state.user.first_name}</h2> : (
          <>
          <SignIn signIn={this.signIn} error={this.state.error} />
          <SignUp signUp={this.signUp} />
          </>)
        }
      </div>
    );
  } 
}

export default App;