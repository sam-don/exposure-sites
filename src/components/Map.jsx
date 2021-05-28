import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import exposuresites from './exposuresites.json';

require('dotenv').config()

const containerStyle = {
  width: '90vw',
  height: '80vh'
};

const center = {
  lat: -37.8136,
  lng: 144.9631
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function MyComponent() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState('')

  const handleOpen = (site) => {
    setBody(
      <div id="simple-modal" style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{site['Site_title']}</h2>
        <p id="simple-modal-exposure-date">{site['Exposure_date']}, {site['Exposure_time']}</p>
        <p id="simple-modal-advice-title">
        {site['Advice_title']}
        </p>
        <p id="simple-modal-address">{site['Site_streetaddress']}, {site['Site_state']}, {site['Site_postcode']}</p>
      </div>
    )
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let markers = []

  for(let i = 0; i < exposuresites.length; i++) {
    markers.push(
      <>
        <Marker 
          key={'marker_'+exposuresites[i]['_id']} 
          title={exposuresites[i]['Site_title']} 
          position={exposuresites[i]['location']}
          onClick={e => handleOpen(exposuresites[i])}
        />
      </>
    )
  }

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
        {markers}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)