import React,{useState,useEffect,useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { TextField, Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  adjust: {
    width: "80%",
    margin: "auto",
  },
  flexpart: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid gray",
    boxShadow: "1px 1px 1px gray",
  },
  media: {
    height: 610,
    width: 500,
  },
  rightpart: {
    width: "50%",
    padding: 10,
  },
  innercomp: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  topflex: {
    display: "flex",
    // width: "100%",
    margin: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "teal",
    position: "relative",
    top:0,
    height: 70,
    padding: "0px 30px",
    borderBottom: "0.5px solid gray",
  },
  comments: {
    height: 300,
    overflowY: "scroll",
  },
  downpart:{
    position: "absolute",
    bottom:0,
    width: "37%"
  }
}));

function SinglePost({ match }) {
  const classes = useStyles();
  const history = useHistory();
  const { state } = useContext(UserContext);

// console.log(match.params.postId)
const[data,setData]=useState('')
const[title,setTitle]=useState('')
const[photo,setPhoto]=useState('')
const[body,setBody]=useState('')
const[createdAt,setCreatedAt]=useState('')
const[likes,setLikes]=useState([])
const[comments,setComments]=useState([])
const[postedBy,setPostedBy]=useState([])
  useEffect(() => {
    const fetchPost = async () => {
      fetch(`/api/singlepost/${match.params.postId}`, {
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then(res=>res.json())
        .then((data) => {
          setData(data)
          
          console.log(data);
          setTitle(data.title)
          setPhoto(data.photo)
          setBody(data.body)
          setLikes(data.likes)
          setComments(data.comments)
          setCreatedAt(data.createdAt)
          setPostedBy(data.postedBy)
         
        })
        .catch(() => {
          console.log("the post is not being fetched");
        });
    };
    fetchPost();
  }, []);





  // like the post
  // const likePost = (id) => {
  //   fetch("/api/likepost", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       postId: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const newData = data.map((item) => {
  //         if (item._id === result._id) {
  //           return result;
  //         } else {
  //           return item;
  //         }
  //       });
  //       setData(newData);
  //     });
  // };
  // // unlike the post
  // const unLikePost = (id) => {
  //   fetch("/api/unlikepost", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       postId: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const newData = data.map((item) => {
  //         if (item._id === result._id) {
  //           return result;
  //         } else {
  //           return item;
  //         }
  //       });
  //       setData(newData);
  //     });
  // };

  // const [cmnt, setCmnt] = useState(null);
  // // do comment
  // const comment = (text, postId) => {
  //   if (text != null) {
  //     fetch("/api/comment", {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("jwt"),
  //       },
  //       body: JSON.stringify({
  //         postId,
  //         text,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         // console.log(result);
  //         const newData = data.map((item) => {
  //           if (item._id === result._id) {
  //             return result;
  //           } else {
  //             return item;
  //           }
  //         });
  //         setData(newData);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  // // delete comment
  // const deletecomment = (text, postId) => {
  //   fetch("/api/uncomment", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       postId,
  //       text,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       // console.log(result);
  //       const newData = data.map((item) => {
  //         if (item._id === result._id) {
  //           return result;
  //         } else {
  //           return item;
  //         }
  //       });
  //       setData(newData);
  //     })
  //     .catch((err) => console.log(err));
  // };




  return (
    <div style={{ paddingTop: 100, position: "relative" }}>
      <div className={classes.adjust}>
        <div className={classes.flexpart}>
          <CardMedia
            className={classes.media}
            image={photo}
            // image={"https://www.smfigure.com/public/uploads/news-261.webp"}
            title={
                postedBy.name + " writes about " + title
              
            }
          />
          <div className={classes.rightpart}>
            <div className={classes.topflex}>
              <img
                src={
                  postedBy.pic
                  // "https://assets.teenvogue.com/photos/5c45f4a3b4e25c2282ebc06f/master/pass/tout.jpg"
                }
                style={{ height: 45, width: 45, borderRadius: "50%" }}
              />
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h4>{postedBy.name}</h4>
                <MoreVertIcon />
              </div>
            </div>
            <p style={{margin:0,padding:0,fontWeight:"bold"}}>{title}</p>
            <p style={{margin:0,padding:5,color:"gray",textAlign:"left",backgroundColor:"#f2f2f2"}}>{body}</p>
           
            <div className={classes.innercomp}>
              <hr />
              <div className={classes.comments}>
                {comments.map((indivisual) => {
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
                </div>
                );
                            })} 
              </div>
              <div className={classes.downpart}>
                <div >
                  <CardActions style={{ marginBottom: 0, padding: 0 }}>
                  {likes.includes(state._id) ? (
                          <IconButton
                            aria-label="add to favorites"
                            // onClick={() => unLikePost(match.params.postId)}
                          >
                            <FavoriteIcon
                              style={{ color: "red", fontSize: 40 }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="add to favorites"
                            // onClick={() => likePost(match.params.postId)}
                          >
                            <FavoriteBorderIcon
                              style={{ color: "gray", fontSize: 40 }}
                            />
                          </IconButton>
                        )}

                    <IconButton aria-label="share">
                      <ShareIcon style={{ color: "gray", fontSize: 25 }} />
                    </IconButton>
                  </CardActions>
                </div>
                <div >
                <div style={{ margin: 0, padding: "0px 30px" }}>
                  <p style={{ textAlign: "left", margin: 5, padding: 0 }}>
                    {/* Liked by you & 2M others */}
                    {likes.length} likes 
                  </p>
                </div>
                <p style={{ textAlign: "left",margin: 5, padding: 0,color:"teal" }}>{new Date(createdAt).toDateString()}</p>
                </div>{/* <hr /> */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 10,
                    padding: 0,
                    borderRadius:10,
                    boxShadow:"-2px -3px -1px gray",
                    backgroundColor:"#f2f2f2"
                  }}
                >
                  <TextField
                    id="standard-basic"
                    label="Add a comment"
                    fullWidth
                    // value={cmnt}
                    style={{ margin: "0px 0px 10px 10px" }}
                    // onChange={(e) => setCmnt(e.target.value)}
                  />
                  <Typography
                    onClick={(e) => {
                      e.preventDefault();
                      //   setCmnt(null);
                      //   comment(cmnt, each._id);
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
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default SinglePost;
