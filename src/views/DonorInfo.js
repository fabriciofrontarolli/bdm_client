import React, { Component } from 'react';

export class DonorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDonorEmailVisible: false,
      isDonorContactVisible: false
    };
    this.handleShowDonorEmail = this.handleShowDonorEmail.bind(this);
    this.handleShowDonorContact = this.handleShowDonorContact.bind(this);
  }

  handleShowDonorEmail() {
    this.setState( { isDonorEmailVisible: true } );
  }
  handleShowDonorContact() {
    this.setState( { isDonorContactVisible: true } );
  }

  render() {
    const { isDonorEmailVisible, isDonorContactVisible } = this.state;
    const { user } = this.props;

    return (
      <div>
        <div>
          <span><p><b>First Name:</b> {user.firstName}</p></span>
        </div>
        <div>
          <span><p><b>Last Name:</b> {user.lastName}</p></span>
        </div>
        <div>
          <span><p><b>Blood Group:</b> {user.bloodGroup}</p></span>
        </div>
        <div>
        <span>
          <p><b>Email: </b>
            {
              !isDonorEmailVisible ?
               <a href="#" onClick={this.handleShowDonorEmail}>click to show</a>
               : user.emailAddress
            }
          </p>
        </span>
        </div>
        <span>
          <p><b>Contact: </b>
            {
              !isDonorContactVisible ?
               <a href="#" onClick={this.handleShowDonorContact}>click to show</a>
               : user.contactNumber
            }
          </p>
        </span>
      </div>
    );
  }
}

export default DonorInfo;
