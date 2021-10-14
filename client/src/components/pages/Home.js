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
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import POFuser from "./POFuser";
import Toppart from "./Toppart";

const useStyles = makeStyles((theme) => ({
  Home: {
    paddingTop: 100,
    padding: 20,
  },
  
  alignCenterpart: {
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  leftPart: {
    width: "55%",
    // borderRight:"4px solid gray"
  },
  lefttop: {
    padding: 10,
    backgroundColor: "#222f3e",
  },

  proimage: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    objectFit:"center",
    alignSelf:"center"
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
    width: "35%",
    position: "static",
    color: "White",
    fontFamily: "poppins",
    borderLeft: "1px solid gray",
  },
  centeralign: {
    width: "90%",
    margin: "auto",
  },
  aafnopro: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "auto",
  },
  aafnodetail: {
    margin: 0,
    "& > *": {
      margin: 0,
      paddding: 0,
    },
  },
  suggestionpart: {
    margin: "40px 0px",
  },
  sugline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "&>h2": {
      fontSize: 20,
    },
    "&>p": {
      fontSize: 16,
    },
  },
  peoplesug: {
    display: "flex",
    alignContent: "center",
    flexDirection: "column",
    fontWeight: 400,

    "& > div": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      margin: 0,
      padding: 0,
      "& > img": {
        height: 40,
        width: 40,
        borderRadius: "50%",
      },
    },
  },
}));

function Home() {
  const classes = useStyles();
  const { state } = useContext(UserContext);
  // console.log(state.following)

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/allposts", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result.posts)
        setData(result.posts);
      });
  }, []);

  // like the post
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
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  // unlike the post
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
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const [cmnt, setCmnt] = useState();
// do comment
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
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

// delete comment
const deletecomment = (text, postId) => {
  fetch("/api/uncomment", {
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
      // console.log(result);
      const newData = data.map((item) => {
        if (item._id === result._id) {
          return result;
        } else {
          return item;
        }
      });
      setData(newData);
    })
    .catch((err) => console.log(err));
};

  // delete functionality
  const deletePost = (postId) => {
    // console.log("delete garne ho yo post")

    fetch(`/api/delete/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.filter((each) => {
          return each._id != result._id;
        });
        setData(newData);
      });
  };




  return (
    

    <div className={classes.Home}>
      <div className={classes.alignCenterpart}>
        <div className={classes.leftPart}>
          <div className={classes.lefttop}>
            <Toppart />
          </div>

          {/* main kaam */}
          

          <POFuser />
        
 
          <div className={classes.leftdown}>
            <div className={classes.alignCenter}>
              {data.map((each) => {
                return (
                  <>
                    <Card className={classes.root} key={each._id}>
                      <CardHeader
                        avatar={
                          <img
                            className={classes.proimage}
                            src={each.postedBy.pic}
                            alt="image not loaded"
                          />
                        }
                        action={
                          each.postedBy._id === state._id && (
                            <IconButton aria-label="settings">
                              <DeleteForeverIcon
                                onClick={() => deletePost(each._id)}
                              />
                            </IconButton>
                          )
                        }
                        title={
                          <Link
                            to={
                              each.postedBy._id != state._id
                                ? "/profile/" + each.postedBy._id
                                : "/profile"
                            }
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            {each.postedBy.name}
                          </Link>
                        }
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
                            <div key={indivisual._id} style={{display:"flex",flexDirection:"row", justifyContent:"space-between",alignItems:"center",padding:"0px 30px"}}>
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
                                <div>
                              {
                                indivisual.postedBy._id === state._id ?
                                <HighlightOffIcon onClick={()=>deletecomment(indivisual.text,each._id)} style={{fontSize:20}}/>
                                :null
                              }
                              
                            </div>
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
                              setCmnt("");
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
          </div>
        </div>

        <div className={classes.rightpart}>
          <div className={classes.centeralign}>
            <div className={classes.aafnopro}>
              <img
                // src={state.pic}
                alt="image not loaded"
                style={{ height: 70, width: 70, borderRadius: "50%",objectFit:"center",alignSelf:"center" }}
              />
              <div className={classes.aafnodetail}>
                <h3>{state.name}</h3>
                <p>{state.email}</p>
              </div>
            </div>
            <div className={classes.suggestionpart}>
              <div className={classes.sugline}>
                <h2>SOME SUGGESTION FOR YOU </h2>
                <p>SEE ALL</p>
              </div>
              <hr />

              <div className={classes.peoplesug}>
                <div>
                  <img
                    alt="not loaded"
                    src="https://images6.fanpop.com/image/photos/41400000/Katherine-Langford-actresses-41401047-886-886.jpg"
                  />
                  <h3>Katherine Langford</h3>
                  <p>Follow</p>
                </div>
                <div>
                  <img
                    alt="not loaded"
                    src="https://images2.fanpop.com/images/photos/7000000/Scarlett-Johansson-actresses-7093421-810-1222.jpg"
                  />
                  <h3>Scarlett Johansson</h3>
                  <p>Follow</p>
                </div>
                <div>
                  <img
                    alt="not loaded"
                    src="https://images6.fanpop.com/image/photos/41400000/Katherine-Langford-actresses-41401047-886-886.jpg"
                  />
                  <h3>Katherine Langford</h3>
                  <p>Follow</p>
                </div>
                <div>
                  <img
                    alt="not loaded"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg/800px-Andrew_Garfield_by_Gage_Skidmore_%28cropped%29.jpg"
                  />
                  <h3>Andrew Garfield</h3>
                  <p>Follow</p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
            
  );
}

export default Home;
