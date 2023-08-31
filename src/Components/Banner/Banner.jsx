import React from 'react'
import { Container, Typography } from '@mui/material';
import Carousal from './Carousal';

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url(./banner2.jpg)" }}>
      <Container sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 10, 
        justifyContent: "space-around"
      }}>
        <div sx={{
          display: "flex",
          height: "40%",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: 5, 
              fontFamily: "Montserrat"
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              marginTop: 5, 
            }}
          >
            Get All the Info Regarding Your Favorite Crypto
          </Typography>
        </div>
        <Carousal/>
      </Container>
    </div>
  )
}

export default Banner
