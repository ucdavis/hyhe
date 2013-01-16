MyApp = {};
MyApp.spreadsheetData = [];
MyApp.headerData = [
    { "sTitle": "Researcher Name" }, { "sTitle": "College" }, 
    { "sTitle": "Department"}, { "sTitle": "Researcher Title"}, 
    { "sTitle": "Website"}, { "sTitle": "Email"}, 
    { "sTitle": "Keywords"}
];

MyApp.Colleges = [];

$(function () {
    var url = "https://spreadsheets.google.com/feeds/list/0AhTxmYCYi3fpdHI5RnliaG1yMGZxeEVTYnJXc1Fxb3c/1/public/values?alt=json-in-script&callback=?";
    $.getJSON(url, {}, function (data) {
        $.each(data.feed.entry, function (key, val) {
            var college = val.gsx$college.$t;

            MyApp.spreadsheetData.push(
                [
                    val.gsx$researchername.$t, college,
                    val.gsx$department.$t, val.gsx$researchertitle.$t,
                    val.gsx$website.$t, val["gsx$e-mail"].$t,
                    val.gsx$keywords.$t
                ]);

            if ($.inArray(college, MyApp.Colleges) === -1) {
                MyApp.Colleges.push(college);
            }
        });

        MyApp.Colleges.sort();

        console.log(MyApp.Colleges);
        createDataTable();
        addFilters();
    });
})

function addFilters(){
    //College filter
    var $colleges = $("#colleges");

    $.each(MyApp.Colleges, function (key, val) {
        $colleges.append('<li><label><input type="checkbox" name="' + val + '"> ' + val + '</label></li>');
    });

    $(".filterrow").on("click", "ul.filterlist", function (e) {
        var filterRegex = "";
        $("input", this).each(function (key, val) {
            if (val.checked) {
                if (filterRegex.length !== 0) {
                    filterRegex += "|";
                }

                filterRegex += "(" + val.name + ")";
            }
        });
        MyApp.oTable.fnFilter(filterRegex, 1, true);
    });
}

function createDataTable() {
    MyApp.oTable = $("#spreadsheet").dataTable({
        "iDisplayLength": 20,
        "bLengthChange": false,
        "aaData": MyApp.spreadsheetData,
        "aoColumns": MyApp.headerData
    });
}