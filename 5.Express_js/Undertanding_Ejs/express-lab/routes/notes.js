const router = require('express').Router(), notes = ['Learn Express'];
router.get('/', (req, res) => res.render('demo/notes', { notes }));
router.post('/', (req, res) => { if (req.body.text) notes.push(req.body.text); res.redirect('/demo/notes'); }); // POST-redirect-GET
module.exports = router;
