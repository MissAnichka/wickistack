let express = require('express');
let router = express.Router();
let models = require('../models');
let Page = models.Page;
let User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
    res.render('index')
});

router.post('/', function(req,res,next){
    let title = req.body.title;
    let page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body['page-status'],
        urlTitle: ''
    })
    let user = User.build({
        name: req.body.name,
        email: req.body.email
    })
    user.save()
    page.save()
    .then(function(result, err){
        res.json(result)
    })
    // res.json(ret)
});

router.get('/add', function(req,res,next){
    res.render('addpage');
});

router.get('/:urlext', function(req,res,next){
    let url = req.params.urlext;
    Page.findOne({
        where: {
            urlTitle: url
        }
    })
    .then(function(foundPage){
        res.render('wikipage', {foundPage: foundPage});
    })
    .catch(next);
});
