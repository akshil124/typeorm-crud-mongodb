const express = require("express")
const typeorm = require("typeorm")
const bodyParser = require('body-parser')
const {User} = require("./entity/user")
import { ObjectID } from 'mongodb';
const app = express()

app.use(bodyParser())

const  AppDataSource  =  new typeorm.DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "crud",
    entities: [User],
    synchronize: true,
    logging: false,
})

AppDataSource
    .initialize()
    .then(() => {
        console.log("typeorm initialize")
    })
    .catch( (error) => {
        console.log("Error: ", error)
    })

app.post("/adduser", (req,res)=>{
    let postRepository = AppDataSource.getMongoRepository(User)
     postRepository.save(req.body)
        .then(()=> {
        res.send("data possted")
    }).catch(function (err) {
        res.send(err)
    })
})

app.get("/getusers",async (req,res)=>{
    let postRepository =await AppDataSource.getMongoRepository(User).find()
    res.send(postRepository)
})

app.get("/getusers/:id",async (req,res)=>{
    let postRepository =await AppDataSource.getMongoRepository(User).findOneById(req.params.id)
    res.send(postRepository)
})

app.put("/getusers/:id",async (req,res)=>{
    await AppDataSource.getMongoRepository(User).update(req.params.id,req.body).then(()=>{
        res.send("user updated")
    }).catch((err)=>{
        res.send(err)
    })
})

app.delete("/deleteuser/:id",async (req,res)=>{
    // await AppDataSource.getMongoRepository(User).findOneAndDelete({_id : new ObjectID(req.params.id)}).then(()=>{
    //
    // }).catch((err)=>{
    //     console.log("err",err)
    // })
    // or you can sue like this
    await AppDataSource.getMongoRepository(User).delete(req.params.id).then(()=>{
        res.send("user deleted")
    }).catch((err)=>{
        res.send(err)
    })
})

app.listen(8080,(req,res)=>{
    console.log("server started")
})


