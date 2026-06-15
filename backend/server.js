require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const appRoutes = require('./routes/app.routes');
app.use('/api/app', appRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});