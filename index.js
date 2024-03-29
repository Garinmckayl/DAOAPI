/* Example in Node.js */
const axios = require('axios');
const cors = require('cors')


const express = require('express')
const app = express()
const port = 3000


let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=604f275aebccdd50cd175fc6', {
      headers: {
        'X-CMC_PRO_API_KEY': '1a1131e3-ae2f-4133-86f1-c1db2e02aa2c',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json.data);
    // console.log(json.data.daos.coins);
    resolve(json);
  }
});


app.use(cors())

app.get('/daos', (req, res) => {
  res.send(response.data)
})

app.get('/daos/:daoId', async (req, res) => {
  try {
        // console.log(req.params.daoId);

    const rresponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', {
      headers: {
        'X-CMC_PRO_API_KEY': '1a1131e3-ae2f-4133-86f1-c1db2e02aa2c',
      },
      params: { id: req.params.daoId },
    });
    console.log(rresponse, req.params.daoId);

    //You need To send data from using send method
    // res.status(200).send(rresponse.data.result);

    //Or you can use json method to send the data
    res.status(200).json(rresponse.data);

  } catch (err) {
    res.status(400).send(err);
  }
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})


