var express = require('express');
var router = express.Router();

const orm = require('../config/orm')


router.get('/', (req,res) =>{

   res.render('home', {
       title: 'Books Search',
       content: 'Search books bae on different criteria',
       style: 'home.css',
       jsFunc : 'js/script.js',
       books:[{
           titleWeb: 'The Secrets of Handlebars',
           authorWeb: 'JB',
           workId: 123,
           isbn: 123456789
       },
           {
               titleWeb: 'The Secrets of Handlebars',
               authorWeb: 'JB',
               workId: 123,
               isbn: 123456789
           }
           ]
   });
});

router.get('/favourites', (req,res) =>{
    res.render('favouriteBooks', {
        title: 'Favourite Books',
        content: 'See your favourite books',
        style: 'favouriteBooks.css',
        favBooks:[{
            titleWeb: 'The Secrets of Handlebars',
            authorWeb: 'JB',
            workId: 123,
            onSaleDate: '2015',
            isbn: 123456789
        }]
    },
    );
});

router.get('/favourites/edit', (req,res) =>{
    res.render('bookEdit', {
        title: 'Edit Book',
        content: 'Edit your selected book',
        style: 'bookEdit.css'
    });
});

router.post('/add', (req,res)=>{
    const workId = req.body.workId;
    const title = req.body.bookTitle;
    const author = req.body.author;
    const date_ = req.body.onSaleDate;
    console.log('ok');

    orm.checkExists(workId, function (err, data) {
        if (err){
            return res.status(501).json({
                message: 'Not able to query database',
                code: 0
            });
        };

      if(data.length === 0){
          orm.insertOne(workId, title, author , date_, function (error, data_) {
              if (error){
                  return res.status(501).json({
                      message: 'Not able to query database',
                      code: 0
                  });
              }

              res.json({
                  message: 'work was added successfully',
                  code: 1,
                  data : data_});
              res.end();
          });
      } else{
          res.json({
              'message' : 'Already exists',
              code : 2
          });

          res.end();
          console.log('okkkkkk');
      }
    });




});

module.exports = router;
