import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button } from "@material-ui/core";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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
    backgroundColor: "#fff",
  },

  proimage: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    objectFit: "center",
    alignSelf: "center",
  },
  leftdown: {
    marginTop: 30,
    // border: "1px solid white",
    // padding: 20,
  },

  root: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#fff",
    color: "black",
    paddding: 0,
    boxShadow: "2px 1px 1px 1px gray",
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
    position: "sticky",
    color: "black",
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
    marginBottom: 60,
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
  ptext: {
    marginRight: 10,
    fontSize: 14,
    marginBottom: 0,
    curser: "poiter",
    textTransform: "uppercase",
    "& >a": {
      textDecoration: "none",
      color: "gray",
    },
  },
}));

function Home() {
  const classes = useStyles();
  const { state } = useContext(UserContext);
  // console.log(state.following)

  const [data, setData] = useState([]);
  const [someUser, setSomeUser] = useState([]);
  useEffect(() => {
    fetch("/api/allposts", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(typeof result.posts);
        // console.log(result.posts)
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

  const [cmnt, setCmnt] = useState(null);
  // do comment
  const comment = (text, postId) => {
    if (text != null) {
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
    }
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

  // sugestion part
  const getSomeRandomUser = () => {
    fetch("http://localhost:5000/api/somerandomuser", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSomeUser(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSomeRandomUser();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOptionmenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  };

const[rfsth,setRfsth]=useState()


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
                    {each.postedBy._id == state._id ? null : (
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
                            // try for menu start
                            <>
                              <Button onClick={()=>setRfsth(each._id)}>
                                <MoreVertIcon onClick={handleOptionmenu} />
                              </Button>
                              <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleOptionMenuClose}
                              >
                                <MenuItem onClick={handleOptionMenuClose}>
                                  <Link
                                    to={`/post/${rfsth}`}
                                    // to={{
                                    //   pathname: `/post/${each._id}`,
                                    //   // state: { yo:"k vayo" }
                                    //   state: { postid: each._id, postof: each.postedBy.name }
                                    // }}
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                    }}
                                    // onClick={alert("First follow the user")}
                                  >
                                    Go to Post
                                  </Link>
                                </MenuItem>
                                <MenuItem onClick={handleOptionMenuClose}>
                                  Copy Link
                                </MenuItem>
                                <MenuItem onClick={handleOptionMenuClose}>
                                  Report
                                </MenuItem>
                              </Menu>
                              {each.postedBy._id === state._id && (
                                <MenuItem>
                                  <DeleteForeverIcon
                                    onClick={() => deletePost(each._id)}
                                  />
                                </MenuItem>
                              )}
                            </>
                            // try for menu end
                          }
                          title={
                            <Link
                              to={
                                each.postedBy._id != state._id
                                  ? "/profile/" + each.postedBy._id
                                  : "/profile"
                              }
                              style={{
                                textDecoration: "none",
                                color: "black",
                                fontSize: 22,
                                textTransform: "capitalize",
                              }}
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
                                style={{ color: "gray", fontSize: 40 }}
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
                            padding: "0px 20px ",
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
                              <div
                                key={indivisual._id}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "0px 30px",
                                }}
                              >
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
                                  {indivisual.postedBy._id === state._id ? (
                                    <HighlightOffIcon
                                      onClick={() =>
                                        deletecomment(indivisual.text, each._id)
                                      }
                                      style={{ fontSize: 20 }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                          <hr />

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            <TextField
                              id="standard-basic"
                              label="Add a comment"
                              fullWidth
                              value={cmnt}
                              style={{ margin: "0px 0px 10px 10px" }}
                              onChange={(e) => setCmnt(e.target.value)}
                            />
                            <Typography
                              onClick={(e) => {
                                e.preventDefault();
                                setCmnt(null);
                                comment(cmnt, each._id);
                              }}
                              style={{
                                marginRight: 20,
                                color: "tomato",
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              Post
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    )}
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
                src={state ? state.pic : "loading"}
                alt="image not loaded"
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: "50%",
                  objectFit: "center",
                  alignSelf: "center",
                }}
              />
              <Link to={"/profile"} style={{ textDecoration: "none" }}>
                <div className={classes.aafnodetail}>
                  <h3
                    style={{
                      textDecoration: "none",
                      color: "black",
                      textAlign: "left",
                    }}
                  >
                    {state ? state.name : "loading"}
                  </h3>
                  <p style={{ textDecoration: "none", color: "black" }}>
                    {state ? state.email : "loading"}
                  </p>
                </div>
              </Link>
            </div>
            <div className={classes.suggestionpart}>
              <div className={classes.sugline}>
                <h2 style={{ margin: 0 }}>SUGGESTIONS FOR YOU </h2>
              </div>
              <hr />

              <div className={classes.peoplesug}>
                {someUser?.map((oneuser) => {
                  return (
                    <>
                      {oneuser._id == state._id ? null : (
                        <div
                          className={classes.centeralign}
                          style={{
                            backgroundColor: "#f2f2f2",
                            borderRadius: 20,
                            width: "100%",
                            marginBottom: 20,
                            padding: "10px 0px",
                          }}
                        >
                          <div className={classes.aafnopro}>
                            <img
                              src={oneuser.pic}
                              alt="image not loaded"
                              style={{
                                height: 60,
                                width: 60,
                                borderRadius: "50%",
                                objectFit: "center",
                                alignSelf: "center",
                              }}
                            />
                            <div
                              className={classes.aafnodetail}
                              style={{ width: "80%" }}
                            >
                              <Link
                                to={
                                  oneuser._id != state._id
                                    ? "/profile/" + oneuser._id
                                    : "/profile"
                                }
                                style={{
                                  textDecoration: "none",
                                  width: "70%",
                                  color: "black",
                                }}
                              >
                                <h3 style={{ margin: 0 }}>{oneuser.name} </h3>
                                <p style={{ margin: 0 }}>{oneuser.email} </p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>

              <Button
                variant="outlined"
                color="secondary"
                style={{ float: "left" }}
              >
                SEE ALL
              </Button>
            </div>

            <div
              style={{
                marginTop: "40px",
                color: "gray",
                width: "fitContent",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <p className={classes.ptext}>
                  <a href="#">About</a>
                </p>
                <p className={classes.ptext}>
                  <a href="#">Jobs</a>
                </p>

                <p className={classes.ptext}>
                  <a href="#">Help</a>
                </p>
                <p className={classes.ptext}>
                  <a href="#">Locations</a>
                </p>

                <p className={classes.ptext}>
                  <a href="#">Terms</a>
                </p>

                <p className={classes.ptext}>
                  <a href="#">Policy</a>
                </p>
                <p className={classes.ptext}>
                  <a href="#">Hashtags</a>
                </p>

                <p className={classes.ptext}>
                  <a href="#">Top Account</a>
                </p>

                <p className={classes.ptext}>
                  <a href="#">Languages</a>
                </p>
              </div>
              <div
                className="copyright"
                style={{
                  marginTop: 20,
                  fontSize: 14,
                  fontFamily: "poppins",
                  textTransform: "uppercase",
                }}
              >
                <h3>
                  {" "}
                  &#169;{new Date().getFullYear()} initGram From initDevelops
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
