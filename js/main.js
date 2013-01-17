MyApp = {};
MyApp.spreadsheetData = [];
MyApp.headerData = [
    { "sTitle": "Researcher Name" }, { "sTitle": "College" }, 
    { "sTitle": "Department"}, { "sTitle": "Researcher Title"}, 
    { "sTitle": "Website"}, { "sTitle": "Email"}, 
    { "sTitle": "Keywords"}
];

MyApp.filterIndexes = { "colleges": 1, "researchtitles": 3 };
MyApp.Colleges = [], MyApp.ResearchTitles = [], MyApp.Departments = [];

$(function () {
    var url = "https://spreadsheets.google.com/feeds/list/0AhTxmYCYi3fpdHI5RnliaG1yMGZxeEVTYnJXc1Fxb3c/1/public/values?alt=json-in-script&callback=?";
    $.getJSON(url, {}, function (data) {
        $.each(data.feed.entry, function (key, val) {
            var college = val.gsx$college.$t;
            var researchTitle = val.gsx$researchertitle.$t;
            var department = val.gsx$department.$t;
            MyApp.spreadsheetData.push(

                [
                    val.gsx$researchername.$t, college,
                    department, researchTitle,
                    val.gsx$website.$t, val["gsx$e-mail"].$t,
                    val.gsx$keywords.$t
                ]);

            if ($.inArray(college, MyApp.Colleges) === -1) {
                MyApp.Colleges.push(college);
            }

            if ($.inArray(researchTitle, MyApp.ResearchTitles) === -1 && researchTitle.length !== 0) {
                MyApp.ResearchTitles.push(researchTitle);
            }

            if ($.inArray(department, MyApp.Departments) === -1 && department.length !== 0) {                
                MyApp.Departments.push(department);
            }
        });

        MyApp.Colleges.sort();
        MyApp.ResearchTitles.sort();

        createDataTable();
        addFilters();
    });
})

function addFilters(){
    //College filter
    var $colleges = $("#colleges");
    var $researchtitles = $("#researchtitles");

    $.each(MyApp.Colleges, function (key, val) {
        $colleges.append('<li><label><input type="checkbox" name="' + val + '"> ' + val + '</label></li>');
    });

    $.each(MyApp.ResearchTitles, function (key, val) {
        $researchtitles.append('<li><label><input type="checkbox" name="' + val + '"> ' + val + '</label></li>');
    });

    $(".filterrow").on("click", "ul.filterlist", function (e) {
        var filterRegex = "";
        var filterIndex = MyApp.filterIndexes[this.id];
        console.log(filterIndex);
        $("input", this).each(function (key, val) {
            if (val.checked) {
                if (filterRegex.length !== 0) {
                    filterRegex += "|";
                }

                filterRegex += "(^" + val.name + "$)"; //Use the hat and dollar to require an exact match
            }
        });
        MyApp.oTable.fnFilter(filterRegex, filterIndex, true, false);
    });
}

function createDataTable() {
    MyApp.oTable = $("#spreadsheet").dataTable({
        "aoColumnDefs": [
            { "bVisible": false, "aTargets": [ -1 ] } //hide the keywords column for now (the last column, hence -1)
        ],
        "iDisplayLength": 20,
        "bLengthChange": false,
        "aaData": MyApp.spreadsheetData,
        "aoColumns": MyApp.headerData
    });
}