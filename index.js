const express = require("express")
// const { connect, connection } = require("mongoose")
const {connection} = require("./config/db")
const { recipeRouter } = require("./routes/recipe.route")
require("dotenv").config()
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cors())

app.use("/api",recipeRouter)

app.get("/",(req,res)=>{
    res.send("My_recipes")
})

app.listen(process.env.port,async()=>{
    try{ 
        await connection
        console.log("Connected to the db")
    }
    catch(err){
        console.log(err)
        console.log("Not connected to db")
    }
    console.log(`port is running at the ${process.env.port}`)
})