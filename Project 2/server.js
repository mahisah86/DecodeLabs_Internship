const express = require("express");

const app = express();

const PORT = 5000;

// Middleware to read JSON data
app.use(express.json());

// Temporary database (Array)
const users = [
    {
        id: 1,
        name: "Mahi",
        email: "mahi@gmail.com"
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@gmail.com"
    }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Project 2 Backend API!");
});

// GET All Users
app.get("/users", (req, res) => {
    res.json(users);
});

// POST New User
app.post("/users", (req, res) => {

    const newUser = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email
};
    if (!newUser.name || !newUser.email) {

    return res.status(400).json({
        message: "Name and Email are required."
    });

}

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully!",
        user: newUser
    });

});
// UPDATE User
app.put("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    if (req.body.name) {
        user.name = req.body.name;
    }

    if (req.body.email) {
        user.email = req.body.email;
    }

    res.json({
        message: "User updated successfully!",
        user: user
    });

});
// DELETE User
app.delete("/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found."
        });
    }

    const deletedUser = users.splice(index, 1);

    res.json({
        message: "User deleted successfully!",
        user: deletedUser[0]
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});