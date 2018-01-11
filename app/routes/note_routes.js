const ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.post('/notes', (req, res) => {
        const note = {text : req.body.text, title : req.body.title};
        db.collection('notes').insertOne(note, (err, result) => {
            if (err) {
                res.send({'error' : 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error' : 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)};
        const note = {text : req.body.text, title : req.body.title};
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error' : 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)};
        db.collection('notes').removeOne(details, (err, item) => {
            if (err) {
                res.send({'error' : 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

};
