var common = function () {
    var handle = function () {
        if (localStorage.UserInfo == undefined)
            window.location.href = '/login';
        var userInfo = JSON.parse(localStorage.UserInfo);
        $('#common').html(
            '<div style="width:100%;text-align:left;">' + userInfo.realName + '</div>' +
            '<div style = "width:100%;text-align:left;">' + userInfo.email + '</div >' +
            '<div style="width:100%;text-align:left;">' + userInfo.remark + '</div>'
        );
    };

    return {
        init: function () {
            handle();
        }
    };

}();