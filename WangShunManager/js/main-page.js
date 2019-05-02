var Main_Page = function () {
    var handleMain = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/users",
            data: { PageIndex: 1, PageSize: 30 },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                total = result.data.total;
                $('#user_count').html(total)
            },
            error: function (data) {
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
                return;
            }
        });
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/products",
            data: { PageIndex: 1, PageSize: 30 },
            success: function (result) {
                console.log(result);
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                total = result.data.total;
                $('#product_count').html(total)
                
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
            handleMain();
        }
    };

}();