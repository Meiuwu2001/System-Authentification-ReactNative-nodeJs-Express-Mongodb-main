const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');
const lecturasSchema = require("./models/lecturas")
const sensorSchema = require('./models/sensores');
const loginSchema = require('./models/login');


const app = express();
app.use(express.json());
app.use(userRouter);
// testing 
// app.get('/', (req, res) => {
//   res.json({ success: true, message: 'Welcome to backend zone!' });
// });
app.post('/sensor', (req, res)=>{
  const sensor = sensorSchema(req.body);
  sensor.save()
  .then((data)=>{
      res.status(200).send(data);
  })
  .catch((err)=>{
      res.status(101).send(err)
  })
});

app.get('/sensores', (req, res)=>{
  sensorSchema.find()
  .then((data)=>{
      res.status(200).send({
          datos:cambiarDatos(data),
      })
  })
  .catch((err)=>{
      res.status(101).send(err);
  })
});

const cambiarDatos = (datos) => {
  let datos1 = [];
  datos.map((dato)=>(
      datos1.push({
          label:dato.nombre,
          value:dato._id,
      })
  ));
  return datos1;
}

app.get('/sensor/:id', (req, res) => {
  const{id} = req.params;
  sensorSchema.findById(id)
  .then((data)=>{
      res.status(200).send(data)
  })
  .catch((err)=>{
      res.status(101).send(err);
  }) 
})

app.get('/lecturas/:id', (req, res) => {
  const{id} = req.params;
  lecturasSchema.find({"id_sensor":id})
  .then((data)=>{
      res.status(200).send(data)
  })
  .catch((err)=>{
      res.status(101).send(err);
  })    
  })

app.post('/lectura', (req, res)=>{
  let lec = {
      'id_sensor': req.body.id_sensor,
      'valor': Number.parseFloat(req.body.valor),
      'fecha': new Date(),
  }
  const lectura = lecturasSchema(lec);
  lectura.save()
  .then((data)=>{
      res.status(200).send(data);
  })
  .catch((err)=>{
      res.status(101).send(err)
  })
});



app.get('/login', async (req, res) => {
  try {
    const login = await loginSchema.findOne().sort({ "login.fecha": -1, "login.hora": -1 });

    res.status(200).send({
      datos: login
    });
  } catch (err) {
    res.status(500).send(err);
  }
});


app.listen(8000,'192.168.1.71', () => {
  console.log('port is listening');
});
