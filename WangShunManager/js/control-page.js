var pageIndex = 1;
var pageSize = 10;
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
    if (total > (pageIndex * pageSize))
        $(".main .next").removeClass("disabled");
    else
        $(".main .next").addClass("disabled");
    if (pageIndex > 1)
        $(".main .previous").removeClass("disabled");
    else
        $(".main .previous").addClass("disabled");
};