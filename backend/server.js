import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './api/routes/lists.route.js'

  

const app = express()
app.use(cors());

const HOSTNAME = '127.0.0.1';
const PORT = 5000;

mongoose.connect('mongodb+srv://khalil:zN3QlfL84rO4WO4o@cluster0.dgyaq.mongodb.net/Projet_tp?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello !");
})

app.use('/lists',router);


app.listen(PORT, () =>
  console.log(`Server is running on: http://${HOSTNAME}:${PORT}.`)
)