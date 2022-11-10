const express = require("express")
const typeorm = require("typeorm")
const bodyParser = require('body-parser')
const User = require("./entity/user")
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

app.post("/adduser",async (req,res)=>{
    console.log("req",req.body)
    // res.send(req.body)
   await AppDataSource.initialize().then(async ()=>{
       const user = typeorm.getManager()
        await user.insert(User,req.body)
        // let postRepository = await AppDataSource.getRepository("User")
        // postRepository
        //     .save({name:"akshil"})
        //     .then((savedPost) => {
        //         console.log("sav",savedPost)
        //     })
            // .then((allPosts) => {
            //     console.log("All posts: ", allPosts)
            // })
        }
    ).catch((err)=>{
        console.log("errsss",err)}
    )

    // await AppDataSource.manager.save(req.body)
})



app.listen(8080,(req,res)=>{
    console.log("server started")
})


