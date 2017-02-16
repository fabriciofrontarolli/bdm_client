import React, { Component } from 'react';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import {geolocated}         from 'react-geolocated';

import AddDonorModal        from './views/AddDonorModal';
import MapComponent         from './views/Map';

import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import donorActions         from './actions/donors';

const socket = io.connect('http://localhost:3001');
socket.on('message', msg => console.log(msg));

class App extends Component {

  INITIAL_STATE = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    bloodGroup: '',
    isAddDonorModalOpen: false,
    areFieldsValid: false,
    userSelectedLatLng: ''
  };

  constructor(props) {
      super(props);
      const _this = this;
      _this.onFirstNameChange = _this.onFirstNameChange.bind(_this);
      _this.onLastNameChange = _this.onLastNameChange.bind(_this);
      _this.onContactNumberChange = _this.onContactNumberChange.bind(_this);
      _this.onEmailChange = _this.onEmailChange.bind(_this);
      _this.onBloodGroupChange = _this.onBloodGroupChange.bind(_this);
      _this.onSubmitDonor = _this.onSubmitDonor.bind(_this);
      _this.onCancel = _this.onCancel.bind(_this);
      _this.handleOpenDonorModal = _this.handleOpenDonorModal.bind(_this);

      _this.state = this.INITIAL_STATE;
  }

  handleOpenDonorModal(userLatLng='') {
    this.setState( { isAddDonorModalOpen: !this.state.isAddDonorModalOpen, userSelectedLatLng:  userLatLng });
  }

  componentDidMount() {
    this.props.fetchDonors();
  }

  render() {
    return (
      <div>
          <div className="app-header">
            <div className="container">
              <h2>Blood Donation Management</h2>
            </div>
            <div className="container">
              <a href="#" onClick={ this.handleOpenDonorModal.bind(this, '') }>Become a Donator</a>
            </div>
          </div>
          <div className="app-menu">
            <div className="container"></div>
          </div>

          {
            this.props.coords ?
                <MapComponent position={[ this.props.coords.latitude, this.props.coords.longitude ]}
                              donors={this.props.donors}
                              openAddDonorModal={this.handleOpenDonorModal} />
                : ''
          }

          <AddDonorModal isOpen={this.state.isAddDonorModalOpen}
                         onFirstNameChange={this.onFirstNameChange}
                         onLastNameChange={this.onLastNameChange}
                         onContactNumberChange={this.onContactNumberChange}
                         onEmailChange={this.onEmailChange}
                         onBloodGroupChange={this.onBloodGroupChange}
                         firstName={this.state.firstName}
                         lastName={this.state.lastName}
                         contactnumber={this.state.contactNumber}
                         email={this.state.email}
                         bloodGroup={this.state.bloodGroup}
                         onSubmitDonor={this.onSubmitDonor}
                         onCancel={this.onCancel}
                         />
      </div>
    );
  }

  validateDonorFields() {

    let areFieldsValid =
    (
      this.state.firstName &&
      this.state.lastName &&
      this.state.contactNumber &&
      this.state.email &&
      this.state.bloodGroup
    );


    this.setState({ areFieldsValid });
  }
  onFirstNameChange(e) { this.setState( { firstName: e.target.value } ); }
  onLastNameChange(e) { this.setState( { lastName: e.target.value } ); }
  onContactNumberChange(e) { this.setState( { contactNumber: e.target.value } ); }
  onEmailChange(e) { this.setState( { email: e.target.value } ); }
  onBloodGroupChange(e) { this.setState( { bloodGroup: e.target.value } ); }
  onCancel() { this.setState( this.INITIAL_STATE ); }

  onSubmitDonor(e) {
    const { userSelectedLatLng } = this.state;

    const donor = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      contactNumber: this.state.contactNumber,
      emailAddress: this.state.email,
      bloodGroup: this.state.bloodGroup,
      coordinates: userSelectedLatLng ? `${userSelectedLatLng[0]}, ${userSelectedLatLng[1]}` : `${this.props.coords.latitude}, ${this.props.coords.longitude}`
    }
    this.props.addDonor(donor);
    this.onCancel();
  }
}

function mapStateToProps(state) {
  return {
    donors: state.donors
  }
};

function mapDispatchToProps(dispatch){
    return bindActionCreators({
      fetchDonors: donorActions.fetchDonors,
      setDonors: donorActions.setDonors,
      addDonor: donorActions.addDonor
    }, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000
  })(App)
);
