import React, {Component} from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }
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
            <h2>Welcome to Dashboard - {this.state.user.first_name} {this.state.user.last_name}</h2>
          </div>
        <Footer/>
      </div>
    )
  }
}
export default Dashboard