import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  eachperson: {
    margin: 10,
    display: "flex",
    justifyContent: "space-between",
    overflowX: "scroll",
    overflow: "hidden",
  },
  image: {
    height: 120,
    margin: 0,
    padding: 0,
    "& > img": {
      height: 70,
      width: 70,
    },
  },
}));
function Toppart() {
  const classes = useStyles();
  const { state } = useContext(UserContext);

  return (
    <div>
      <div className={classes.eachperson}>
       
        {
          state ? state.following.map((item) => {
          
            <div className={classes.image}>
              <img
                style={{ borderRadius: "50%" }}
                src={item.pic}
                alt="image not found"
              />
              <p>{item.name}</p>
            </div>
          } ):null
        }
        
      </div>
    </div>
  );
}

export default Toppart;
