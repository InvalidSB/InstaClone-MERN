import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
 
  leftPart: {
    width: "55%",
    // borderRight:"4px solid gray"
  },
  lefttop: {
    padding: 10,
    backgroundColor: "#222f3e",
  },

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
  proimage:{
    height:40,
    width:40,
    borderRadius:"50%"
},
  leftdown: {
    marginTop: 30,
    // border: "1px solid white",
    // padding: 20,
  },

  root: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#222f3e",
    color: "white",
    paddding: 0,
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },

  rightpart: {
    width: "40%",
  },
  seperater: {
    height: 80,
    width: "100%",
    backgroundColor: "gray",
    paddding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
  },
}));

function POFuser() {
  const classes = useStyles();
  const { state } = useContext(UserContext);

  const[show ,setShow]=useState(true)
  const [data, setData] = useState([]);
  useEffect(async() => {
    await fetch("/api/followedusersposts", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result)
        setData(result.posts);
        if(result.posts.length != 0 ){
          setShow(true)
        }else{
          setShow(false)

        }
      });
  }, []);

  const likePost = (id) => {
    fetch("/api/likepost", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  const unLikePost = (id) => {
    fetch("/api/unlikepost", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const [cmnt, setCmnt] = useState();

  const comment = (text, postId) => {
    fetch("/api/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };



  return (
     

          <div className={classes.leftdown}>
            {
              show ?
            <div className={classes.seperater}>
            <h1>Post of Following User</h1>
          </div>
:null
            }
            <div className={classes.alignCenter}>
              {data.map((each) => {
                return (
                  <>
                    <Card className={classes.root} key={each._id}>
                      <CardHeader
                        avatar={
                          <img className={classes.proimage} src={each.postedBy.pic} alt="image not loaded"/>

                        }
                        
                      
                        title={<Link to={each.postedBy._id != state._id ? "/profile/"+each.postedBy._id:"/profile"} style={{textDecoration:"none",color:"white"}}>{each.postedBy.name}</Link>}
                        subheader={new Date(each.createdAt).toDateString()}
                      />
                      <CardMedia
                        className={classes.media}
                        image={each.photo}
                        title={
                          each.postedBy.name + " writes about " + each.title
                        }
                      />

                      <CardActions style={{ marginBottom: 0, padding: 0 }}>
                        {each.likes.includes(state._id) ? (
                          <IconButton
                            aria-label="add to favorites"
                            onClick={() => unLikePost(each._id)}
                          >
                            <FavoriteIcon
                              style={{ color: "red", fontSize: 40 }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="add to favorites"
                            onClick={() => likePost(each._id)}
                          >
                            <FavoriteBorderIcon
                              style={{ color: "white", fontSize: 40 }}
                            />
                          </IconButton>
                        )}

                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                      </CardActions>
                      <CardContent
                        style={{
                          marginBottom: 0,
                          textAlign: "left",
                          padding: 0,
                          paddingLeft: 10,
                        }}
                      >
                        <Typography>{each.likes.length} likes</Typography>

                        <Typography component="h3">
                          {each.title}
                          <Typography component="p" style={{ color: "gray" }}>
                            {each.body}
                          </Typography>
                        </Typography>
                          {each.comments.map((indivisual) => {
                            return (
                              <div key={indivisual._id}>
                                <h5 style={{ margin: 0, padding: 0 }}>
                                  {indivisual.postedBy.name}
                                  <span
                                    style={{
                                      fontWeight: "400",
                                      marginLeft: 10,
                                    }}
                                  >
                                    {indivisual.text}
                                  </span>
                                </h5>
                              </div>
                            );
                          })}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 0,
                            padding: 0,
                          }}
                        >
                          <TextField
                            id="standard-basic"
                            label="Add a comment"
                            fullWidth
                            value={cmnt}
                            style={{ margin: 10 }}
                            onChange={(e) => setCmnt(e.target.value)}
                          />
                          <SendIcon
                            onClick={(e) => {
                              e.preventDefault();
                              setCmnt("")
                              comment(cmnt, each._id);
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    {/*  */}
                  </>
                );
              })}
            </div>

            {
              show ?
              <div className={classes.seperater}>
              <h1>You're All Caught UP !!</h1>
            </div>
:null
            }

           
          </div>
            
     
  );
}

export default POFuser;
