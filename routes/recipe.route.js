const express = require("express")
const {recipeModel} = require("../model/recipe.model")



const recipeRouter = express.Router()

recipeRouter.post("/post",async(req,res)=>{
   try{
        const recipe = new recipeModel(req.body)
        await  recipe.save()
        res.status(200).json({msg:"recipe details added sucessfully"})
   }
   catch(err){
    console.log(err)
    res.status(502).json({msg:"Something went wrong"})
   }
})


recipeRouter.get("/",async(req,res)=>{
    try{
        const recipe = await recipeModel.find()
        res.status(201).json({msg:"your recipes are here",recipe})

    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"something went wrong"})
    }
})

recipeRouter.delete("/:id",async(req,res)=>{
    try{
        await recipeModel.findByIdAndDelete(req.params.id)
       res.status(201).json({msg:"recipe deleted sucessfully"})
    }
    catch(err){
     res.status(502).json({msg:err.msg})
    }
})

//for sorting and filtering 
//for filter
recipeRouter.get("/filter",async(req,res)=>{
    const {category} = req.query
    try{
        const recipe = await recipeModel.find({category})
        res.status(201).json({msg:"recipe filter by its category",recipe})
         
    }
    catch(err){
        res.status(502).json({msg:"something went wrong"})
    }
})
// for sortingg added 
recipeRouter.get("/sort", async (req, res) => {
    const { sortBy } = req.query;
    try {
        const sortValue = parseInt(sortBy); 

        if (sortValue === 1 || sortValue === -1) {
            const recipes = await recipeModel.find().sort({ price: sortValue });
            res.status(200).json({ msg: "Recipes sorted", recipes });
        } else {
            res.status(400).json({ msg: "Invalid sort value" });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ msg: "Something went wrong" });
    }
});




module.exports = {
    recipeRouter
}