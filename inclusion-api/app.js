import express from 'express';
import scan from './scan.js';
const app = express()
const port = 81

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//HealthCheck Endpoint
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ health: "healthy" });
})


app.get('/scan', (req, res) => {
  console.log('SCANNING TEXT');

  try {
    let data = req.body;
    const inputText = data.input;
    console.log("Inputted Text: " + data.input);

    if (!inputText || inputText.trim().length === 0) {
      console.log('INVALID INPUT - NO TEXT');
      return res.status(422).json({ result: 'Invalid input text' });
    }

    //Scan Text
    let scanResults = scan(inputText);
    let returnResult;
    if (scanResults == null) {
      returnResult = "No Non-Inclusive Terms Found"
    }
    else {
      returnResult = scanResults
    }
    //Return Response
    res
      .status(200)
      .json({ result: returnResult });
    console.log('SCANNED TEXT SUCCESSFULLY');
  } catch (err) {
    console.error('ERROR SCANNING INPUT');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to scan input' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
