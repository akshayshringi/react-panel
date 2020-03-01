import React, {Component} from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }
  // check if user is authenticated and storing authentication data as states if true
  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
    }
  }
  render() {
    return (
      <div>
        <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
          <div className="col-md-12">
            <h2>My Profile</h2>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th scope="row ">Full Name</th>
                  <td>{this.state.user.first_name} {this.state.user.last_name}</td>
                </tr>
                <tr>
                  <th scope="row ">Email</th>
                  <td>{this.state.user.email}</td>
                </tr>
                <tr>
                  <th scope="row ">Role</th>
                  <td>{this.state.user.role_name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        <Footer/>
      </div>
    )
  }
}
export default Profile