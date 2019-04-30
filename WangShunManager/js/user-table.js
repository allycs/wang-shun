var User_Table = function () {
    var handleUser = function () {
        var userInfo = localStorage.UserInfo;
        console.log(userInfo);
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/users",
            data: { PageIndex: 1, PageSize: 50 },
            success: function (result) {
                console.log(result);
                if (result.state != 0) {
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
            },
            error: function (data) {
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
                return;
            }
        });
    };

    return {
        init: function () {
            handleUser();
        }
    };
}();