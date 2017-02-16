import React, {Component} from 'react';
import Modal              from 'react-modal';
import FormInput          from 'react-input-validation';

class AddDonorModal extends Component {

  constructor(props) {
    super(props);
  }

  validateEmailAddress(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateDonorFields(props) {

    let areFieldsValid =
    (
      props.firstName !== '' &&
      props.lastName !== '' &&
      props.contactNumber !== '' &&
      (props.email !== '' && this.validateEmailAddress(props.email) ) &&
      props.bloodGroup !== ''
    );

    return areFieldsValid;
  }

  render() {
    return (
        <Modal isOpen={this.props.isOpen}
               contentLabel="Modal"
               style={
                 {
                     overlay : {
                       position          : 'fixed',
                       top               : 0,
                       left              : 0,
                       right             : 0,
                       bottom            : 0,
                       backgroundColor   : 'rgba(0,0,0, 0.85)'
                     },
                     content : {
                       width                      : '28%',
                       position                   : 'relative',
                       top                        : '10%',
                       left                       : '30%',
                       right                      : '0',
                       bottom                     : '0',
                       border                     : '1px solid #ccc',
                       background                 : '#fff',
                       overflow                   : 'auto',
                       WebkitOverflowScrolling    : 'touch',
                       borderRadius               : '4px',
                       outline                    : 'none',
                       padding                    : '20px'
                     }
                   }
               }>
               <div className="modal">
                 <div className="modal-header">
                    <h3>Donor Details</h3>
                 </div>
                 <div className="modal-content">
                   <div className="input-box">
                     <label><span className="required">*</span> First Name</label><br/>
                     <input id="firstname" onChange={this.props.onFirstNameChange}
                                           placeholder="John"
                                           type="text"
                                           value={this.props.firstName} />
                   </div>
                   <div className="input-box">
                     <label><span className="required">*</span>Last Name</label><br/>
                     <input id="lastname" onChange={this.props.onLastNameChange}
                                          placeholder="Doe"
                                          type="text"
                                          value={this.props.lastName} />
                   </div>
                   <div className="input-box">
                     <label><span className="required">*</span>Contact Number</label><br/>
                     <input id="contactnumber" onChange={this.props.onContactNumberChange}
                                               placeholder="+55 19 993134840"
                                               type="phone"
                                               value={this.props.contactnumber} />
                   </div>
                   <div className="input-box">
                     <label><span className="required">*</span>Email</label><br/>
                     <input id="email" onChange={this.props.onEmailChange}
                                           placeholder="john@doe.com"
                                           type="email"
                                           value={this.props.email} />
                   </div>
                   <div className="input-box">
                     <label><span className="required">*</span>Blood Group</label><br/>
                     <select onChange={this.props.onBloodGroupChange}>
                       <option value="">Select Your Blood Group</option>
                       <option value="A">A</option>
                       <option value="A-">A-</option>
                       <option value="B">B</option>
                       <option value="B-">B-</option>
                       <option value="AB">AB</option>
                       <option value="O">O</option>
                     </select>
                   </div>

                   <div className="input-box">
                     <button onClick={this.props.onCancel} className="cancel">Cancel</button>
                     <button onClick={this.props.onSubmitDonor} disabled={!this.validateDonorFields(this.props)} className="submit">Submit</button>
                   </div>
                 </div>
               </div>
        </Modal>
    );
  }
}

export default AddDonorModal;
