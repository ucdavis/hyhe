//var sampleUrl = "https://docs.google.com/spreadsheet/pub?key=0AhcpJCFiGkDmdFZOSXpGMDVSa1N4NWJtRG8wWmx4YUE&single=true&gid=0&output=html";
var sampleUrl = "https://docs.google.com/spreadsheet/pub?key=0AhTxmYCYi3fpdHI5RnliaG1yMGZxeEVTYnJXc1Fxb3c&single=true&gid=0&output=html";
var spreadsheetData = [];
var headerData = [];
        
$(function() {
    var googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.url(sampleUrl);
    googleSpreadsheet.load(function(result) {
        //break cells up into rows/cols by given column count
        var colCount = 7;
        for (var i = 0; i < result.data.length; i) {
            var row = [];
            for (var j = 0; j < colCount; j++) {
                row.push(result.data[i + j]);
            }
            spreadsheetData.push(row);
            i = i + colCount;
        }
                
        var header = spreadsheetData.splice(0, 1); //splice first header row off
        for (var col in header[0]) {
            headerData.push({ "sTitle": header[0][col] });
        }

        $('#results').html(JSON.stringify(result).replace(/,/g, ",\n"));
        createDataTable();
    });
});

function createDataTable() {
    $("#spreadsheet").dataTable({
        "aaData": spreadsheetData,
        "aoColumns": headerData
    });
}