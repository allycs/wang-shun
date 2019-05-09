var pageIndex = 1;
var pageSize = 6;
var total = 30;
function nextPage() {
    if ((Number(pageIndex) * Number(pageSize)) >= total) {
        return pageIndex;
    }
    pageIndex = pageIndex + 1;
    Table.getData();
    return pageIndex;
};
function previousPage() {
    pageIndex = pageIndex - 1;
    if (pageIndex < 1)
        pageIndex = 1;
    Table.getData();
    return pageIndex;
};
function CheckPage() {
    //console.log(pageIndex + ";" + pageSize + ";" + total);
    if (total > (pageIndex * pageSize))
        $(".next").removeClass("disabled");
    else
        $(".next").addClass("disabled");
    if (pageIndex > 1)
        $(".previous").removeClass("disabled");
    else
        $(".previous").addClass("disabled");
};