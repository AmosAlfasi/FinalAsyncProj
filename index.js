const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const costs = require("./routes/costs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Load API routes
app.use("/users", users);
app.use("/costs", costs);

mongoose.connect(
	"mongodb+srv://diana:Dk318402161@users.cetqw.mongodb.net/finalProject?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log("Mongoose is connected")
);

// Start the server
app.listen(1400, () => {
	console.log(`App listening on port 1400`);
});
