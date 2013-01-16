var spreadsheetData = [];
var headerData = [
    { "sTitle": "Researcher Name" }, { "sTitle": "College" }, 
    { "sTitle": "Department"}, { "sTitle": "Researcher Title"}, 
    { "sTitle": "Website"}, { "sTitle": "Email"}, 
    { "sTitle": "Keywords"}
];

$(function () {
    var url = "https://spreadsheets.google.com/feeds/list/0AhTxmYCYi3fpdHI5RnliaG1yMGZxeEVTYnJXc1Fxb3c/1/public/values?alt=json-in-script&callback=?";
    $.getJSON(url, {}, function (data) {
        $.each(data.feed.entry, function (key, val) {
            spreadsheetData.push(
                [
                    val.gsx$researchername.$t, val.gsx$college.$t, 
                    val.gsx$department.$t, val.gsx$researchertitle.$t, 
                    val.gsx$website.$t, val["gsx$e-mail"].$t, 
                    val.gsx$keywords.$t
                ]);
        });

        createDataTable();
    });
})

function createDataTable() {
    $("#spreadsheet").dataTable({
        "aaData": spreadsheetData,
        "aoColumns": headerData
    });
}