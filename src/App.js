import './App.css';
import axios from 'axios';
import { Component } from 'react';
import Loading from './Loading';

class App extends Component{
  constructor(props){
    super(props);
    //state
    this.state = {
      users: [],
      loading: false
    }
    //binding
    this.handleSubmit = this.handleSubmit(this);
  }

  getUsers(){
    this.setState({
      loading: true
    });
    axios('https://randomuser.me/api/?nat=gb&results=5').then(response=>this.setState({
        users: [... this.state.users , ... response.data.results],
        loading: false
    }));
  }

  componentWillMount(){
    this.getUsers()
  }

  handleSubmit(){
    this.getUsers();
  }

  render() {
    return (<div className="App">  
            <form onSubmit = {this.handleSubmit}>
                <input type = "submit" value= "Load users"></input>
            </form>
          {!this.state.loading ? this.state.users.map(user=>
            <div key={user.email}>
              <h3>{user.name.first}</h3>
              <h4>{user.email}</h4>
              <hr></hr>
            </div>) : (<Loading/>)}
          </div>);
  }
}

export default App;