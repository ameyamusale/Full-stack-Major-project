const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
//  correct path
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
app.engine('ejs',ejsMate);
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//  only ONE main function
async function main() {
    await mongoose.connect(MONGO_URL);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//  start server only after DB connects
main()
    .then(() => {
        console.log("connected to DB");

        app.listen(8080, () => {
            console.log("server is listening to port 8080");
        });
    })
    .catch((err) => {
        console.log(err);
    });


app.engine('ejs',ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
// root route
app.get("/", async (req, res) => {
    res.send("Hi I am root of the project");
});

// ✅ async route (IMPORTANT)

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});   
//create a route                                          
app.post("/listings",async (req,res)=>{
   let newlisting = new Listing(req.body.listing);
   await newlisting.save();
   res.redirect("/listings")

});
// Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;

  await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  res.redirect("/listings/" + id);
});


app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//read route (Show route)
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
});    

app.delete("/listings/:id",async(req,res)=>{
 let {id}= req.params;
 let deleteListing = await Listing.findByIdAndDelete(id);
 console.log(deleteListing);
 res.redirect("/listings")
});

//route for insert listing and display that in database 

