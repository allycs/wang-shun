var pageModalIndex = 1;
var pageModalSize = 6;
var totalModal = 30;
function nexModaltPage() {
    if ((Number(pageModalIndex) * Number(pageModalSize)) >= total) {
        return pageModalIndex;
    }
    pageModalIndex = pageModalIndex + 1;
    Table.getModalData();
    return pageModalIndex;
};
function previousModalPage() {
    pageModalIndex = pageModalIndex - 1;
    if (pageModalIndex < 1)
        pageModalIndex = 1;
    Table.getModalData();
    return pageModalIndex;
};
function CheckModalPage() {
    if (total > (pageModalIndex * pageModalSize))
        $(".modal .next").removeClass("disabled");
    else
        $(".modal .next").addClass("disabled");
    if (pageIndex > 1)
        $(".modal .previous").removeClass("disabled");
    else
        $(".modal .previous").addClass("disabled");
};