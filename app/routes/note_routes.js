module.exports = function (app, db) {
    app.post('/notes', (req, res) => {
        const note = {text : req.body.text, title : req.body.title};
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error' : 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};
