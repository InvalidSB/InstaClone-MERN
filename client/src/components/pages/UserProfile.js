import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../App";

import { useParams } from "react-router-dom";

function UserProfile() {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);


  const { userId } = useParams();
  const [showfollow, setShowFollow] = useState(state ? !state.following.includes(userId):true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/profile/${userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const followUser = () => {
    fetch("http://localhost:5000/api/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  // unfollow

  const unfollowUser = () => {
    fetch("http://localhost:5000/api/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
        
      });
  };

  return (
    <div>
      {userProfile ? (
        <div className="Profilepage" style={{ paddingTop: 100 }}>
          <div className="Upper-Part">
            <div className="image-part">
              <div className="imgWrapper">
                <img src={userProfile ? userProfile.user.pic:"loading"} />
              </div>
            </div>
            <div className="info-part">
              <div className="name">
                <h2 style={{ margin: 0, padding: 0 }}>
                  {userProfile ? userProfile.user.name : "name"}
                </h2>
                <p style={{ fontSize: 20, margin: 0, padding: 0 }}>
                  {userProfile ? userProfile.user.email : "sample@gmail.com"}
                </p>
              </div>
              {showfollow ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => followUser()}
                >
                  Follow
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => unfollowUser()}
                >
                  Unfollow
                </Button>
              )}
              <div className="po-fol-fow">
                <h3>
                  {userProfile.posts.length}
                  <span>posts</span>
                </h3>
                <h3>
                  {userProfile.user.followers.length} <span>followers</span>
                </h3>
                <h3>
                  {userProfile.user.following.length} <span>following</span>
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
              <div className="mygallery">
                {userProfile.posts.map((each) => {
                  return (
                    <img
                      src={each.photo}
                      alt="photo not loaded"
                      key={each._id}
                      
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserProfile;
