import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FlashMessage from 'react-flash-message';

export default class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false, 
      isSubmited: false,
      error: '',
      formSubmitting: false,
      modal: false, 
      user: {}, 
      userDetail:props.userDetail
    };

    this.toggle = this.toggle.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeDOB = this.handleChangeDOB.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChangeFirstName(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      userDetail: {
        ...prevState.userDetail, first_name: value
      }
    }));
  }
  handleChangeLastName(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      userDetail: {
        ...prevState.userDetail, last_name: value
      }
    }));
  }
  handleChangeEmail(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      userDetail: {
        ...prevState.userDetail, email: value
      }
    }));
  }
  handleChangeDOB(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      userDetail: {
        ...prevState.userDetail, dob: value
      }
    }));
  }
  handleChangeRole(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      userDetail: {
        ...prevState.userDetail, role: value
      }
    }));
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({formSubmitting: true});
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.user.access_token
      }
    }
    let userData = this.state.userDetail;
    axios.put("/api/v1/user/"+this.state.userDetail.id, userData, config).then(response => {
      return response;
    }).then(json => {
      if (json.data.success) {
        this.setState({
          isSubmited: true,
          error: ''
        });
        location.reload();
      }
      else {
        alert(`Our System Failed To update!`);
      }
    }).catch(error => {if (error.response) {
        let err = error.response.data;
        this.setState({
          error: err.message,
          errorMessage: err.errors,
          formSubmitting: false
        })
      }
      else if (error.request) {
        let err = error.request;
        this.setState({
          error: err,
          formSubmitting: false
        })
     } else {
       let err = error.message;
       this.setState({
         error: err,
         formSubmitting: false
       })
      }
    }).finally(this.setState({error: ''}));
  }


  render() {

    const { error } = '';

    return (

        <div>
        <a className="nav-link" onClick={this.toggle}>Edit</a>
        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>Edit User</ModalHeader>
          {this.state.isSubmited ? <FlashMessage duration={60000} persistOnHover={true}>
          <h5 className={"alert alert-success"}>Updated successful, redirecting...</h5></FlashMessage> : ''}
          {this.state.error ? <FlashMessage duration={100000} persistOnHover={true}>
          <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5></FlashMessage> : ''}
          {error && !this.state.isSubmited ? <FlashMessage duration={100000} persistOnHover={true}>
          <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
          <ModalBody>
          <div className="row">
            <div className="form-group col-md-12">
            <label>First Name:</label>
            <input type="text" value={this.state.userDetail.first_name || ''} onChange={this.handleChangeFirstName} className="form-control" />
              </div>
              </div>
            <div className="row">
             <div className="form-group col-md-12">
            <label>Last Name:</label>
                <input type="text" value={this.state.userDetail.last_name || ''} onChange={this.handleChangeLastName} className="form-control" />
               </div>
              </div>
            <div className="row">
             <div className="form-group col-md-12">
            <label>Email:</label>
                <input type="email" value={this.state.userDetail.email || ''} onChange={this.handleChangeEmail} className="form-control" />
               </div>
              </div>
            <div className="row">
             <div className="form-group col-md-12">
              <label>Date Of Birth:</label>
                <input type="text" value={this.state.userDetail.dob || ''} onChange={this.handleChangeDOB} className="form-control" />
               </div>
              </div>
            <div className="row">
             <div className="form-group col-md-12">
              <label>Role:</label>
                <select value={this.state.userDetail.role || ''} onChange={this.handleChangeRole} className="form-control">
                  <option value="">Select</option>
                  <option value="2">Manager</option>
                  <option value="3">Employee</option>
                </select>
               </div>
              </div>
          </ModalBody>
          <ModalFooter>
            <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>
      
    );
  }
}