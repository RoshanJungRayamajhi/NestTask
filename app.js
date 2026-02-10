require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const {connectDB} = require("./config/db")
const saleRoute = require("./routes/sales.routes")
const leaderRoute = require("./routes/leader.routes")


app.set("view engine","ejs");
app.set("views", "./views");


app.get("/",(req,res)=>{
  res.redirect("/api/leaderboard")
})

app.get("/add-form", (req, res) => {
  res.render("addSale");
});


app.use("/api/sales",saleRoute)
app.use("/api/leaderboard",leaderRoute)



app.listen(3000, async ()=>{
  await connectDB();
  console.log(`server running at port 3000`)
})