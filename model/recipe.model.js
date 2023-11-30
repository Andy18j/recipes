const mongoose = require("mongoose")


const recipeSchema = mongoose.Schema({
   recipe_name :{type:String},
   category : {type:String},
   ingredients : {type:String},
   instruction  :{type:String},
   price : {type:Number }
})

const recipeModel = mongoose.model("recipe",recipeSchema)

module.exports = {
    recipeModel
}