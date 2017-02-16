import axios from 'axios';

export function _fetchDonors() {

  return (dispatch) => {
    /* fetch data from API */
    axios.get('https://bdmserver.herokuapp.com/api/donors', {
      headers: {
        'Accept': 'application/json',
        'mode': 'cors'
      }
    })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        dispatch(_setDonors(response.data));
    })
    .catch((err)=> {
      console.log(err);
    });
  };
}

export function _addDonor(donor) {
  return (dispatch) => {
    /* fetch data from API */
    axios.post('https://bdmserver.herokuapp.com/api/donors',donor , {
      headers: {
        'Accept': 'application/json',
        'mode': 'cors'
      }
    })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        dispatch(_fetchDonors());
    })
    .catch((err)=> {
      console.log(err);
    });
  };
}

export function _setDonors(donors) {
  return {
    type: 'SET_DONORS',
    payload: donors
  }
}

export default {
  fetchDonors: _fetchDonors,
  setDonors: _setDonors,
  addDonor: _addDonor
}
