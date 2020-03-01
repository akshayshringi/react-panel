import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
class Header extends Component {
  constructor(props) {
    super(props);
      this.state = {
        user: props.userData,
        isLoggedIn: props.userIsLoggedIn
      };
      this.logOut = this.logOut.bind(this);
  }
  logOut() {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
    this.props.history.push('/login');
  }
  render() {
    const aStyle = {
      cursor: 'pointer'
    };

    const aRoles = [1,2];
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <li className="navbar-brand"><Link to="/dashboard">Dashboard</Link></li>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav pull-right">
            {this.state.isLoggedIn? <li className="nav-item"><Link className="nav-link" to="/profile">My Profile</Link></li>: ""}
            {this.state.isLoggedIn && aRoles.includes(this.state.user.role)  ? <li className="nav-item"><Link className="nav-link" to="/userdetail">Users</Link></li>: ""}
            {this.state.isLoggedIn ? <li className="nav-item"><a className="nav-link" href={void(0)} onClick={e=>this.logOut()}>Logout</a></li>: ""}
          </ul>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)