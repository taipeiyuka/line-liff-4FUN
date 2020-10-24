const express = require('express');
const pg = require('pg');
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;
const bearerToken = process.env.BEARER_TOKEN;

app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId, bearerToken: bearerToken});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));

app.get('/get-flex/:userId', function(req, res) {
	const userId = req.params['userId'];
	var connectionString = process.env.DATABASE_URL;
	var pgClient = new pg.Client(connectionString);
	pgClient.connect();
	var query = pgClient.query("SELECT postId FROM share WHERE userId = '"+ userId + "'", (err, resp) => {
	  if (err) throw err;
	  res.json(resp);
	  client.end();
	});
});