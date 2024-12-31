const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { findOrCreateUser } = require('./db/user');
const app = express();

// Настройка CORS
app.use(cors());

app.use(express.json());

app.post("/login", async (req, res) => {
    const { username } = req.body;
    try {
        const user = await findOrCreateUser(username);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Ошибка сервера");
    }
});

const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});