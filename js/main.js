var spreadsheetData = [];
var headerData = [{ "sTitle": "Researcher Name" }, { "sTitle": "College" }, { "sTitle": "Department"}];

$(function () {
    var url = "https://spreadsheets.google.com/feeds/list/0AhTxmYCYi3fpdHI5RnliaG1yMGZxeEVTYnJXc1Fxb3c/1/public/values?alt=json-in-script&callback=?";
    $.getJSON(url, {}, function (data) {
        $.each(data.feed.entry, function (key, val) {
            spreadsheetData.push([val.gsx$researchername.$t, val.gsx$college.$t, val.gsx$department.$t]);
        });

        console.log(spreadsheetData);
        createDataTable();
    });
})


function createDataTable() {
    $("#spreadsheet").dataTable({
        "aaData": spreadsheetData,
        "aoColumns": headerData
    });
}