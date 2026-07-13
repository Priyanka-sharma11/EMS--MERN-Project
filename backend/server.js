require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`EMS backend server running on http://localhost:${PORT}`);
});
