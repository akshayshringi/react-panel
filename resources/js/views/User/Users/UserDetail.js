import React, {Component} from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import EditModal from '../../../components/Modals/EditModal';
import AddModal from '../../../components/Modals/AddModal';

class UserDetail extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {},
      userDetails: [],
      aRoles: [1,2],
    }
  }
  deleteUser(userData){
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.user.access_token
      }
    }
    axios.delete("/api/v1/user/"+userData.id, config).then(response => {
      return response;
    }).then(json => {
      if (json.data.success) {
        location.reload();
      }
      else {
        alert('Our System Failed To fetch User Data');
      }
    }).catch(error => {if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        let err = error.response.data;
        this.setState({
          error: err.message,
          errorMessage: err.errors
        })
      }
      else if (error.request) {
        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        let err = error.request;
        this.setState({
          error: err,
        })
      } else {
         // Something happened in setting up the request that triggered an Error
         let err = error.message;
         this.setState({
           error: err,
         })
      }
    }).finally(this.setState({error: ''}));
  }
  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
    }
  }
  componentDidMount() {
    const { prevLocation } = { prevLocation: { pathname: '/dashboard' } };
    if (this.state.user.role==3) {
      return this.props.history.push(prevLocation);
    }
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.user.access_token
      }
    }
    axios.get("/api/v1/user", config).then(response => {
      return response;
    }).then(json => {
      if (json.data.success) {
        let appState = {
          isLoggedIn: this.state.isLoggedIn,
          user: this.state.user,
          userDetails:json.data.details
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isLoggedIn: appState.isLoggedIn,
          user: appState.user,
          userDetails:appState.userDetails,
          error: ''
        });
      }
      else {
        alert('Our System Failed To fetch User Data');
      }
    }).catch(error => {if (error.response) {
        let err = error.response.data;
        this.setState({
          error: err.message,
          errorMessage: err.errors
        })
      }
      else if (error.request) {
        let err = error.request;
        this.setState({
          error: err,
        })
      } else {
         let err = error.message;
         this.setState({
           error: err,
         })
      }
    }).finally(this.setState({error: ''}));
  }
  render() {
    return (
      <div>
        <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
          <div className="col-md-12">
            <h2>Users <AddModal /></h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Role</th>
                  {this.state.user.role==1 ? <th>Action</th> : '' }
                </tr>
              </thead>
              <tbody>
                {this.state.userDetails.map((user,index) => (
                  <tr key={user.id}>
                    <td>
                      {index+1}
                    </td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>
                      {user.email}
                    </td>
                    <td>
                      {user.dob}
                    </td>
                    <td>
                      {user.role_name}
                    </td>
                    <td>
                    {this.state.user.role==1 ? <EditModal userDetail={user} /> : ''}
                    {this.state.user.role==1 ? <a className="nav-link" href={void(0)} onClick={() => {if(window.confirm('Are you sure to delete this record?')){ this.deleteUser(user)};}}>Delete</a> : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <Footer/>
      </div>
    )
  }
}
export default UserDetail