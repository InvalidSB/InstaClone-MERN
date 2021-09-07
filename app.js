const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose= require("mongoose")
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")
const userRoutes = require("./routes/user")

// middleware

app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 50000 }));
app.use(express.json())
app.use(cors());

// connection with database

const MURI = "mongodb+srv://sujan123:1234@instaclone.hgkrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify:true,
};
mongoose
  .connect(MURI, connectionParams)
  .then(() => {
    app.listen(PORT, () => {
      console.log("database connected and server is  running on port ", PORT);
    });
  })
  .catch((err) => {
    console.log("error occured :", err);
  });

  app.use('/api/',authRoutes)
  app.use('/api/',postRoutes)
  app.use('/api/',userRoutes)

if(process.env.NODE_ENV =="prodcution"){
  app.use(express.static('client/build'))
  const path= require("path")
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client",'build',"inddex.html"))
  })
}


