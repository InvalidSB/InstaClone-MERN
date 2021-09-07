import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import {Button,TextField} from "@material-ui/core";
import CoolTabs from "react-cool-tabs";
import { UserContext } from "../../App";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "gray",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign:"center",
    width:"500px"
  },
  choosefile: {
    margin: "10px 0px",
    color: "white",
    padding:5,
    backgroundColor:"#333333",
    borderRadius:5,
    "&>input": {
      padding: "15px 15px",
      backgroundColor: "gray",
      borderRadius: "10px",
    },
  },
}));

function Content1(data) {
  return (
    <div className="mygallery">
      {data.data.map((each) => {
        return <img src={each.photo} alt="photo not loaded" key={each._id} />;
      })}
    </div>
  );
}
function Content2() {
  return <h1>this is my saved post component</h1>;
}

function Profile() {


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { state ,dispatch} = useContext(UserContext);
  const [data, setData] = useState([]);

   const [image,setImage]=useState("")

  useEffect(() => {
    fetch("/api/myposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.myposts);
      })
      .catch((err) => console.log(err));
  }, []);

useEffect(() => {
 if(image){
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "initGram");
  data.append("cloud_name", "init");
  fetch(" https://api.cloudinary.com/v1_1/init/image/upload", {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((result) => {
      localStorage.setItem('user',JSON.stringify({...state,pic:result.url}))
      dispatch({type:"UPDATEPIC",payload:result.url})
      fetch('/api/updatepropic', {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body:JSON.stringify({pic:result.url})
      }).then((res)=>res.json()).then((result)=>{
      localStorage.setItem('user',JSON.stringify({...state,pic:result.pic}))
      dispatch({type:"UPDATEPIC",payload:result.pic})}
      
      ).catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
 }

}, [image])


const UploadProfile=(file)=>{
  setImage(file)
  
  };



  return (
    <div>
      <div className="Profilepage" style={{ paddingTop: 50 }}>
        <div className="Upper-Part">
          <div className="image-part">
            <div className="imgWrapper">
              <img src={state ? state.pic : "loading..."} />
              <label htmlFor="fileinput">
          <AddCircleOutlineIcon fontSize="large" color="secondary"  style={{cursor:"pointer"}}/>
          </label>
          <input type="file" id="fileinput" style={{display:"none"}} 
          onChange={(e)=>UploadProfile(e.target.files[0])}
          />
            </div>
          </div>
          <div className="info-part">
            <div className="name">
              <h2 style={{ margin: 0, padding: 0 }}>
                {state ? state.name : "name"}
              </h2>
              <p style={{ fontSize: 20, margin: 0, padding: 0 }}>
                {state ? state.email : "sample@gmail.com"}
              </p>
            </div>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpen}            >
              Edit Profile
            </Button>
            <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <div className={classes.choosefile}>
            <p>Upload Photo</p>
              <input
                type="file"
                // onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

               <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              value={state.name}
              autoComplete="name"
              // onChange={(e) => setName(e.target.value)}
            />
           
            {/* <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // value={password}
              autoComplete="current-password"
              // onChange={(e) => setPassword(e.target.value)}
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="bio"
              label="Bio"
              type="text"
              id="bio"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
             <Button
             style={{marginTop:20}}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              // onClick={handleClick}
            >
              Update Profile
            </Button>
          </div>
        </Fade>
      </Modal>
              <div className="po-fol-fow">
                <h3>
                  {data.length}
                  <span>posts</span>
                </h3>
                <h3>
                  { state ?  state.followers.length:"000"} <span>followers</span>
                </h3>
                <h3>
                  {state ? state.following.length:"000"} <span>following</span>
                </h3>
              </div>
           
            <div className="Short_bio">
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                laboriosam,
              </p>
            </div>
          </div>
        </div>

        <hr />
        <div className="Lower-part">
          <div className="lowerpart-align-center">
            <CoolTabs
              tabKey={"1"}
              style={{ width: "100%", height: 500, margin: "auto" }}
              activeTabStyle={{ background: "#576574", color: "white" }}
              unActiveTabStyle={{ background: "#222f3e", color: "white" }}
              activeLeftTabBorderBottomStyle={{ background: "gray", height: 4 }}
              activeRightTabBorderBottomStyle={{
                background: "gray",
                height: 4,
              }}
              tabsBorderBottomStyle={{ background: "#222f3e", height: 4 }}
              //  leftContentStyle={{ background:  'lightgreen' }}
              //  rightContentStyle={{ background:  'lightblue' }}
              leftTabTitle={"My Posts"}
              rightTabTitle={"Saved Post"}
              leftContent={<Content1 data={data} />}
              rightContent={<Content2 />}
              contentTransitionStyle={"transform 0.3s ease-in"}
              borderTransitionStyle={"all 0.6s ease-in"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
