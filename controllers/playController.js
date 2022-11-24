const router = require('express').Router();
const { isUser } = require('../middle-wares/guards');
const { parseError } = require('../util/parse');

router.get('/create', isUser(), (req, res) => {
    res.render('create')
})
router.post('/create', isUser(), async (req, res) => {
    console.log(req.body);

    try {

        const playData = {

            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isPublic: Boolean(req.body.isPublic),
            author: req.user._id

        }

        await req.storage.createPlay(playData);
        res.redirect('/');

    } catch (err) {
        console.log(err);
        console.log('---');
        console.log();
        const ctx = {
            errors:parseError(err),
            playData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: Boolean(req.body.isPublic),
            }
        }
        res.render('create', ctx)
    }

})

module.exports = router;