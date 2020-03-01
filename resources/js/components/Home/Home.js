import React, {Component} from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
class Home extends Component {
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
  componentDidMount() {
    const { prevLocation } = { prevLocation: { pathname: '/login' } };
    if (!this.state.isLoggedIn) {
      return this.props.history.push(prevLocation);
    }
  }
  render() {
    return (
      <div>
        <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
          <span>Welcome to Dashboard</span>
        <Footer/>
      </div>
      )
    }
  }
export default Home