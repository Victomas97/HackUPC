var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
var sys = require('sys');
var exec = require('child_process').exec;
const fs = require("fs");
var archive = "";

app.get('/', function (req, res) {
    res.sendFile('/root/myapi' + '/index.html');
});

app.get('/stl_viewer.min.js', function (req, res) {
    res.sendFile('/root/myapi' + '/stl_viewer.min.js');
});

app.get('/three.min.js', function (req, res) {
    res.sendFile('/root/myapi' + '/three.min.js');
});

app.get('/webgl_detector.js', function (req, res) {
    res.sendFile('/root/myapi' + '/webgl_detector.js');
});

app.get('/Projector.js', function (req, res) {
    res.sendFile('/root/myapi' + '/Projector.js');
});

app.get('/CanvasRenderer.js', function (req, res) {
    res.sendFile('/root/myapi' + '/CanvasRenderer.js');
});

app.get('/OrbitControls.js', function (req, res) {
    res.sendFile('/root/myapi' + '/OrbitControls.js');
});

app.get('/load_stl.min.js', function (req, res) {
    res.sendFile('/root/myapi' + '/load_stl.min.js');
});

app.get('/parser.min.js', function (req, res) {
    res.sendFile('/root/myapi' + '/parser.min.js');
});

app.get('/final.stl', function (req, res) {
    res.sendFile('/root/myapi' + '/final.stl');
});

app.get('/cub', function (req, res) {
    var x = req.query.x;
    var y = req.query.y;
    var z = req.query.z;
    var a = req.query.a;
    var l = req.query.l;
    var p = req.query.p;
    console.log(req.query);
    archive += "translate([" + x + "," + y + "," + z + "]) cube ([" + a + "," + l + "," + p + "]);";
    next();
    res.json({ message: 'success' })
});

app.get('/esfera', function (req, res) {
    console.log(req.query);
    var x = req.query.x;
    var y = req.query.y;
    var z = req.query.z;
    var r = req.query.r;
    archive += "translate([" + x + "," + y + "," + z + "]) sphere ("+ r + ");";
    next();
    res.json({ message: 'success' })
});

app.get('/cilindre', function (req, res) {
    console.log(req.query);
    var x = req.query.x;
    var y = req.query.y;
    var z = req.query.z;
    var r = req.query.r;
    var a = req.query.a;
    archive += "translate([" + x + "," + y + "," + z + "]) cylinder ("+ a + "," + r +" ," + r +");";
    next();
    res.json({ message: 'success' })
});

app.get('/init', function (req, res) {
    archive = "difference() { cube(15, center = true); sphere(10); }";
    next();
    res.json({ message: 'success' })
});


app.get('/borrar', function (req, res) {   
    archive = " ";
    fs.writeFileSync('final.stl', archive, (err) => {
        if(err) throw err;
    });
    res.json({ message: 'success' })
});

app.get('/imprimir', function (req, res) {  
    exec('slic3r final.stl --layer-height 0.2 --bed-temperature 60 --filament-diameter 1.75 --output ./output.gcode', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
                console.log('exec error: ' + error);
        }
    });
    exec('curl -k -H "X-Api-Key: 6A6A067249994AF2BC8E99F6BD1035A3" -F "select=false" -F "print=true" -F "file=@output.gcode" "https://pi-juri.localhost.run/api/files/local"', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
         if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    res.json({ message: 'success' })
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

function next() {
    fs.writeFileSync('example.scad', archive, (err) => {
            if(err) throw err;
            console.log("DONE");
    });
    exec('openscad --o final.stl example.scad', function (error, stdout, stderr) {
        if(error) {
           console.log("ERROR");
        }
    });

}
