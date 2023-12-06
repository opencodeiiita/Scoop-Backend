const express = require("express");
const app = express();
const port =  9000;


app.get('/', (req, res) => {
    res.send('Scoop API running')
})



app.listen(port, () => {
  console.log(`Scoop API running on port ${port}`);
});
