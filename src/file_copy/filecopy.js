const fs = require('fs');
const myPath = `./output`

fs.readdir(`./output`, function (err, files) {
    if (err) {
        throw err;
    }
    //other funciton calls
    var audioFile = getFiles(files, myPath);
    let myTime = getMyTime(files, myPath)
    console.log(`Copying files to the following DIR ${myTime}`)
    copyFiles(audioFile, myTime);
});

function getFiles(files, path) {
    var out = [];
    files.forEach(function (file) {
        // console.log(file + typeof file)
        var stats = fs.statSync(path + "/" + file);
        if (stats.isFile())
            out.push(file);

    });
    return out
}

function copyFiles(files, myTime) {
    for (file of files) {
       // console.log(file)
        fs.copyFileSync(`./output/${file}`, `./output/${myTime}/${file}`, (err) => {
            if (err) throw err;
            console.log('File was copied to destination');
        });
    }
}

function getMyTime(files, path) {
    let out = []
    files.forEach(function (file) {
        var stats = fs.statSync(path + "/" + file);
        if (stats.isDirectory()) {
            out.push({
                "dir": file,
                "birthtime": stats.birthtime.getTime()
            });
        }
    });
    out.sort(function (a, b) {
        return b.birthtime - a.birthtime;
    })
    return (out.length > 0) ? out[0].dir : "";
}