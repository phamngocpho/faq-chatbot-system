require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const faqRoutes = require('./routes/faqRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/faqs', faqRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'FAQ Backend API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
