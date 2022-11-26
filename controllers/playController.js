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

router.get('/details/:id', async(req, res)=>{

    try {
        const play = await req.storage.getPlayById(req.params.id);
        play.hasUser = Boolean(req.user);
        play.isAuthor = req.user && req.user._id == play.author;
        play.liked = req.user && play.usersLiked.includes(req.user._id);
        res.render('details', {play})
    } catch (err) {
        console.log(err.message);
        res.redirect('/404')
    }
  
})
router.get('/edit/:id', isUser(), async(req, res)=>{

    try {
        const play = await req.storage.getPlayById(req.params.id);
        if(play.author != req.user._id){
            throw new Error ('Cannot edit a play you have not created!')
        }
        res.render('edit', {play})
    } catch (err) {
        console.log(err.message);
        res.redirect('/play/details' + req.params.id)
    }
  
})

router.get('/delete/:id', isUser(), async(req, res)=>{
    try {

        const play = await req.storage.deletePlay(req.params.id);

        if(play.author != req.user._id){
            throw new Error ('Cannot delete a play you have not created!')
        }

        res.redirect('/');
        
    } catch (err) {
        
        res.redirect('/play/details' + req.params.id)
    }
})

module.exports = router;