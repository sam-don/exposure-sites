import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import exposuresites from './exposuresites.json';
import location_marker_1 from '../assets/location_marker_1.png'
import location_marker_2 from '../assets/location_marker_2.png'
import location_marker_3 from '../assets/location_marker_3.png'
import location_marker_4 from '../assets/location_marker_4.png'

require('dotenv').config()

const containerStyle = {
  width: '90vw',
  height: '80vh'
};

const center = {
  lat: -37.8136,
  lng: 144.9631
};

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     maxWidth: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

const marker_icons = [
  null,
  location_marker_1,
  location_marker_2,
  location_marker_3,
  location_marker_4
]

function MyComponent() {
  // const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState('')

  const handleOpen = (site) => {
    setBody(
      // <div id="simple-modal" style={modalStyle} className={classes.paper}>
      //   <h2 id="simple-modal-title">{site['Site_title']}</h2>
      //   <p id="simple-modal-exposure-date">{site['Exposure_date']}, {site['Exposure_time']}</p>
      //   <p id="simple-modal-advice-title">
      //   {site['Advice_title']}
      //   </p>
      //   <p id="simple-modal-address">{site['Site_streetaddress']}, {site['Suburb']}, {site['Site_state']}, {site['Site_postcode']}</p>
      // </div>
      <>
        <DialogTitle id="alert-dialog-title">{site['Site_title']}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p id="simple-modal-exposure-date">{site['Exposure_date']}, {site['Exposure_time']}</p>
            <p id="simple-modal-advice-title">
            {site['Advice_title']}
            </p>
            <p id="simple-modal-address">{site['Site_streetaddress']}, {site['Suburb']}, {site['Site_state']}, {site['Site_postcode']}</p>
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </>
    )
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let markers = []

  fetch('https://search-vicexposuresites-jcti7yn2e5lkeq2bzjg3db3fqm.ap-southeast-2.es.amazonaws.com/exposuresites/_search?size=1000', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic c2FtZG9uOlB0Y2pxMTgu'
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        // sites = result.hits.hits
        // console.log(sites)
        // exposuresites = result['result']['records']
        result.hits.hits.map(site => {
          // console.log(site['_id'])
          markers.push(
              <Marker 
                key={site['_id']} 
                title={site['_source']['Site_title']} 
                position={site['_source']['location']}
                onClick={e => {
                  handleOpen(site['_source'])
                }}
                icon={marker_icons[site['_source']['Advice_title'][5]]}
              />
          )
          return(true)
        })
      }
    )

  console.log(markers)

  // for(let i = 0; i < exposuresites.length; i++) {
  //   markers.push(
  //     <>
  //       <Marker 
  //         key={'marker_'+exposuresites[i]['_id']} 
  //         title={exposuresites[i]['Site_title']} 
  //         position={exposuresites[i]['location']}
  //         onClick={e => {
  //           handleOpen(exposuresites[i])
  //         }}
  //         icon={marker_icons[exposuresites[i]['Advice_title'][5]]}
  //       />
  //     </>
  //   )
  // }

  // for(let i = 0; i < sites.length; i++) {
  //   console.log(sites[i]['_source']['_id'])
  //   markers.push(
  //     <>
  //       <Marker 
  //         key={'marker_'+sites[i]['_source']['_id']} 
  //         title={sites[i]['_source']['Site_title']} 
  //         position={sites[i]['_source']['location']}
  //         onClick={e => {
  //           handleOpen(sites[i]['_source'])
  //         }}
  //         icon={marker_icons[sites[i]['_source']['Advice_title'][5]]}
  //       />
  //     </>
  //   )
  // }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {console.log(markers[0])}
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {body}
        </Dialog>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)