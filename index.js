const path = require('path');
const express = require('express');
const falcor = require('falcor');
const falcorExpress = require('falcor-express');

const app = express();

app.use(express.static(path.join(__dirname, './public')));

var model = new falcor.Model({
  cache: {
    todosById: {
      1234: {
        id: 1234,
        name: 'OMG',
        completed: false
      },
      3456: {
        id: 3456,
        name: 'Well done',
        completed: false
      }
    },
    todoLists: [{
      name: 'Recently Viewed',
      todos: [
        falcor.Model.ref('todosById[1234]'),
        falcor.Model.ref('todosById[3456]')
      ]
    }, {
      name: 'Recently Added',
      todos: [
        falcor.Model.ref('todosById[1234]')
      ]
    }]
  }
});

app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
	return model.asDataSource();
}));

app.listen(process.env.PORT || 8080, function(err) {
	if (err) {
		console.error('Failed to start express http server', err);
		return;
	}
	console.log(`express http server is listening on port ${process.env.PORT || 8080}`)
});