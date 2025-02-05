
module.exports = (req,res,next)=>{
if(req.session.userId){
    res.redirect('/')//if user is logged in redirect to the home pagee
}
}
