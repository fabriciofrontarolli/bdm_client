import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import UserInfoComponent from './DonorInfo';

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.handleMapClicked = this.handleMapClicked.bind(this);
    this.handleOpenDonorModal = this.handleOpenDonorModal.bind(this);

    this.state = {
      userSelectedLatLngMarkerComponent: null
    };
  }

  handleOpenDonorModal(selectedLatLng) {
    const { userSelectedLatLngMarkerComponent } = this.state;
    this.props.openAddDonorModal(selectedLatLng);
    this.setState( { userSelectedLatLngMarkerComponent: null } );
  }

  handleMapClicked(e) {
    const selectedLatLng = [e.latlng.lat, e.latlng.lng];
    const _this = this;

    const preAddDonorMarker = (
        <Marker position={selectedLatLng} key={'selectedLatLng'}>
          <Popup onClick={() => { }}>
            <div>
              <p>
                Do you want to become a donor in this area? &nbsp;&nbsp;
                <a href="#" onClick={_this.handleOpenDonorModal.bind(_this, selectedLatLng)}>Yes</a>
              </p>
            </div>
          </Popup>
        </Marker>
    );

    this.setState( { userSelectedLatLngMarkerComponent: preAddDonorMarker } );
  }

  render() {

    const {userSelectedLatLngMarkerComponent} = this.state;
    let donorsMarkers = [];

    if(this.props.donors.donors){
      donorsMarkers = this.props.donors.donors.map((donor, index) => {
                        const coordinate = donor.coordinates.split(',');

                        const donorMarker = <Marker position={coordinate} key={index} className="myTest">
                                              <Popup onClick={() => { }}>
                                                <UserInfoComponent user={donor} />
                                              </Popup>
                                            </Marker>
                        return donorMarker;
                      });
    }

    return (

      <Map center={this.props.position} zoom={13} onClick={ this.handleMapClicked }>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        { donorsMarkers }
        { userSelectedLatLngMarkerComponent }
      </Map>
    );
  }
}

export default MapComponent;
