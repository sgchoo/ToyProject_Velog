const express = require('express');
const app = express();

require('dotenv').config();

app.listen(process.env.PORT, true);

app.get('/', (req: any, res: any) => {
    res.send('Hello!')
})