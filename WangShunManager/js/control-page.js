

function next() {
    if ((Number(pageNumber) * Number(rowsPerPage)) >= total) {
        return false;
    }
    pageNumber = pageNumber + 1;
    GetGovMembers();
};
function previous() {
    pageNumber = pageNumber - 1;
    if (pageNumber < 1)
        pageNumber = 1;
    GetGovMembers();
};
function CheckPage() {
    if (total > (pageNumber * rowsPerPage))
        $(".next").removeClass("disabled");
    else
        $(".next").addClass("disabled");
    if (pageNumber > 1)
        $(".previous").removeClass("disabled");
    else
        $(".previous").addClass("disabled");
};