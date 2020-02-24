const express = require("express");
const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionRouter");

const server = express();
const port = 4000;

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.use((req, res) => {
    res.status(404).json({ message: "Route was not found" })
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Server error, please try again."
    })
});

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
});
