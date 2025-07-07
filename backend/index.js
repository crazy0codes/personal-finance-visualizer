
import express from "express"
import allRoutes from "./src/routes/index.js"
import { initializeDB } from "./src/db/db.init.js";
import cors from "cors"
const app = express();
const PORT = 8080;


app.use(cors({
  origin: "*"
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Demo server is running!');
});

app.use("/api", allRoutes)

async function startProcess() {
  await initializeDB();
}

await startProcess();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`) 
});
