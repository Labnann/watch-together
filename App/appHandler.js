const handleApp = (app, express)=>{
    app.use('/', express.static("App/public"));

}

module.exports = {handleApp}