const express=require('express')
const article =require('./../models/article')
const router=express.router()
router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new article()})
})
router.get('/edit/:id',async(req,res)=>{
    const article=await article.findOne({slug:req.params.slug})
    if(article==null)res.redirect('/')
    res.render('articles/show',{article:article})
})
router,post('/',async(req,res,next)=>{
    req.article=new article()
    next()
},savearticle('new'))
router.put('/:id',async(req,res,next)=>{
    req.article=await article.findById(req.params.id)
    next()
},savearticle('edit'))
router.delete('/:id',async(req,res)=>{
    await article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
function savearticle(path){
    return async(req,res)=>{
        let article=req.article
        article.title=req.body.title
        article.description= req.body.description
        article.markdown= req.body.markdown
    try{
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    } catch {
    res.render(`articles/${path}`, { article: article })
 }
}}
Module.exports = router



