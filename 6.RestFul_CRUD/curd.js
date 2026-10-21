const express = require('express');
const app = express();
const path = require('path');
const {v4 : uuid}=require('uuid');
const methodOveride = require('method-override')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOveride('_method'))
let comment=[
    {id:uuid(),
        username:'papa',
        comments:'heu hy vhelo'
    },
    {id:uuid(),
    username:'papa',
        comments:'heu hyf helo'
    },
    {id:uuid(),
        username:'papa',
        comments:'heu hy ghelo'
    },
    {id:uuid(),
    username:'papa',
        comments:'heu hy hhelo'
    },
    {id:uuid(),
        username:'papa',
        comments:'heu hy h5elo'
    },
    {id:uuid(),
    username:'papa',
        comments:'heu hy h3elo' 
    }
    
]

app.get('/comment',(req,res)=>{
 res.render('index',{comment})
})
app.get('/comment/new',(req,res)=>{
    res.render('new')
})
app.get('/comment/:id', (req,res)=>{
const {id} =req.params;
const com=comment.find(c=>c.id===id);
res.render('show',{ com })
});
app.get('/comment/:id/edit',(req,res)=>{
    const {id} =req.params;
    const com=comment.find(c=>c.id===id);
    res.render('edit',{ com });
})  

app.patch('/comment/:id', (req, res) => {
    const { id } = req.params;
    const newcomtext = req.body.comments;

    const foundcom = comment.find(c => c.id === id);

    foundcom.comments = newcomtext; 

    res.redirect('/comment');
}); 

app.delete('/comment/:id',(req,res)=>{
    const {id} =req.params;
   comment=comment.filter(c=>c.id!==id)
   res.redirect('/comment')
})
app.post('/comment',(req,res)=>{
 const {username,comments}=req.body;
 comment.push({username,comments,id:uuid()});
    res.redirect('/comment')
})
app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 