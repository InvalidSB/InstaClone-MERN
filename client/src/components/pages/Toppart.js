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
console.log(state.following)
console.log(typeof(state.following))
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   console.log("yaha aayo");
  //   fetch("/api/followeduserpn", {
  //     method: "get",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setData(result);
  //     });
  // }, []);
  return (
    <div>
      <div className={classes.eachperson}>
       
        {
          state.following.map((item) => {
          
            <div className={classes.image}>
              <img
                style={{ borderRadius: "50%" }}
                src={item.pic}
                alt="image not found"
              />
              <p>{item.name}</p>
            </div>
          })
        }
        
      </div>
    </div>
  );
}

export default Toppart;
