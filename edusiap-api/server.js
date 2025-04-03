const express = require('express');
const app = express();
// const routes = require('./routes')
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send("Welcome to EduSiap API");
})

// app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})