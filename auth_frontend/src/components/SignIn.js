import { Component } from 'react'

export default class SignIn extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.signIn(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign In Form</h1>
                    <label>Username :</label>
                    <input name='username' value={this.state.username} onChange={this.handleChange}/>
                    <label>Password :</label>
                    <input type="password" name='password' value={this.state.password} onChange={this.handleChange}/>
                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null}
                    <input type="submit" value="Authenticate"/>
                </form>
            </div>
        )
    }
}
