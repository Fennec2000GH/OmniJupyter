
const fs = require('fs');


function runCell() {
    var runBtn = document.activeElement;
    var cell = runBtn.parentElement;
    var code = cell.querySelector("textarea").value;
    console.log(code);
    // runBtn.innerText = code;
    // try { fs.writeFile('./file.txt', 'sample text'); } 
    // catch (error) { console.log(error); }
const FileSaver = require('file-saver');
    var filename = 'sample.txt';
    var file = new Blob([code], {type: 'text/plain'});
    FileSaver.saveAs(file, filename);

    // if (window.navigator.msSaveOrOpenBlob) // IE10+
    //     window.navigator.msSaveOrOpenBlob(file, filename);
    // else { // Others
    //     var a = document.createElement("a"),
    //             url = URL.createObjectURL(file);
    //     a.href = url;
    //     a.download = filename;
    //     document.body.appendChild(a);
    //     a.click();
    //     setTimeout(function() {
    //         document.body.removeChild(a);
    //         window.URL.revokeObjectURL(url);  
    //     }, 0); }
}
