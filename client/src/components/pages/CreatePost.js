import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import { TextField, Button, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
const useStyles = makeStyles((theme) => ({
  createpost: {
    margin: "auto",
    // height:"100vh",
    padding: 100,
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  card: {
    padding: 30,
    width: "30%",
    borderRadius: 20,
  },
  choosefile: {
    margin: "30px 0px",
    color: "white",
    "&>input": {
      padding: "15px 15px",
      backgroundColor: "gray",
      borderRadius: "10px",
    },
  },
}));

function CreatePost() {
  const classes = useStyles();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (photo) {
      // aba cloudinary bata data tanne
      fetch("/api/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          photo,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [photo]);

  const UploadPost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "initGram");
    data.append("cloud_name", "init");

    // first cloudinary ma upload garne
    fetch(" https://api.cloudinary.com/v1_1/init/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPhoto(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.createpost}>
      <Typography
        style={{ marginBottom: 30, color: "white", textTransform: "uppercase" }}
      >
        Create your post here
      </Typography>
      <ArrowDownwardIcon style={{ fontSize: 60 }} />
      <div className={classes.alignCenter}>
        <Card className={classes.card}>
          <div>
            <TextField
              style={{ marginBottom: 20 }}
              id=" outlined-basic"
              label="On what regard"
              variant="outlined"
              fullWidth
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id=" outlined-basic"
              label="What do you want to say"
              variant="outlined"
              fullWidth
              value={body}
              name="body"
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className={classes.choosefile}>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <Button variant="outlined" color="secondary" onClick={UploadPost}>
            Publish
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default CreatePost;
