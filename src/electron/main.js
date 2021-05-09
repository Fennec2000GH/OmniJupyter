
const fs = require('fs');
const { exec } = require('child_process');

var numCells = 1;
var langChosen = "Python";

function langFunction() {
    var cell = document.querySelector("#cell" + numCells);
    langChosen = cell.querySelector("select").value;
    console.log(langChosen);
    var editor = document.querySelector("textarea");
    editor.innerText = langChosen;
}

function runCell() {
    var runBtn = document.activeElement;
    var cell = runBtn.parentElement;
    var code = cell.querySelector(".editor").value;
    var output = cell.querySelector(".output");
    runBtn.innerText = code;

    try { fs.writeFile("./myfile.txt", "the text to write in the file", {"flag": "w"}, "utf-8"); }
    catch(e) { alert(e); }
    output.textContent = `python3 -c ${code}`;
    switch (langChosen) {
    case "Python":
        exec(`python3 -c ${code}`, function(error, stdout, stderr){ runBtn.innerText = stdout; });
        // runBtn.innerText = "Python executed";
        break;
    case "R": {
        break;
    }
    case "Julia": {
        break;
    }
    case "Rust": {
        break;
    }
    case "bash":
        exec(code, function(error, stdout, stderr){ runBtn.innerText = stdout; });
    }
}

function addCell() {
    var addCellBtn = document.activeElement;
    addCellBtn.innerText = "shrek";
}
