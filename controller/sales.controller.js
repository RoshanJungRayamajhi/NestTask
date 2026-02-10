const saleModel = require("../models/sales.model");

module.exports.addSales = async (req, res) => {
 try { 
  const { agentName, amount, salesCount } = req.body;
  const Sale = await saleModel.create({
    agentName,
    amount,
    salesCount,
  });
 
 res.redirect("/api/leaderboard")
  
 } catch (error) {
  res.status(500).send(error.message)
 }
};
