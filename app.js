const express = require ('express');
const bodyParser = require('body-parser');


//const Utylity = require('./services/utility');
const ApiV1 = require('./controllers/api');

const app = express();

app.set('port', process.env.Port || 3333);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
  extended: true
}));
//app.use(Utylity.parseQuery);
ApiV1.initialize(app);




app.listen(app.get('port'), function(){
  console.log('Server is listening on port ' + app.get('port'));
});
