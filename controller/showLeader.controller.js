const saleModel = require("../models/sales.model");

module.exports.showLeader = async (req, res) => {
  try {
 const leaderboard = await saleModel.aggregate([
   {
    $addFields: {
      normalizedAgent: { $toLower: "$agentName" }
    }
  },
  // 1️⃣ Group by agentName
  {
    $group: {
      _id: "$agentName",
      totalAmount: { $sum: "$amount" },
      totalSales: { $sum: "$salesCount" },
    },
  },

  // 2️⃣ Sort by totalAmount desc, totalSales desc
  {
    $sort: { totalAmount: -1, totalSales: -1 },
  },

  // 3️⃣ Add Rank (same totalAmount = same rank)
  {
    $setWindowFields: {
      sortBy: { totalAmount: -1  },
      output: {
      rank: { $denseRank: {} }
      },
    },
  },

  // 4️⃣ Final format
  {
    $project: {
        rank: 1,
      _id: 0,
      agentName: "$_id",
      totalAmount: 1,
      totalSales: 1,
    },
  },
]);

  // ✅ Calculate totals
    let totalAmount = 0;
    let totalSales = 0;

    leaderboard.forEach(agent => {
      totalAmount += agent.totalAmount;
      totalSales += agent.totalSales;
    });

    res.render("leaderboard", {
      leaderboard,
      totalAmount,
      totalSales,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
