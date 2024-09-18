const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"public")))

app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index", {files : files})
    })
})

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.titles.split(' ').join('')}.txt`,req.body.desc,function(err){
        res.redirect("/")
    })
})

app.post("/delete",function(req,res){
    var removetask = req.body.task
    fs.unlink(`./files/${removetask}`,function(err){
        res.redirect("/")
    })
})

app.get("/data/:filename", function (req, res) {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, "utf8", function (err, data) {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        res.render("data", { titles: filename, data: data });
    });
});

// function showwork(filename){
//     window.location.href = `/${filename}`;
// }


app.listen(3000)