var Main_Page = function () {
    var handleMain = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/users",
            data: { PageIndex: 1, PageSize: 30 },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '�����µ�¼') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                total = result.data.total;
                $('#user_count').html(total)
            },
            error: function (data) {
                $('.alert').html("�����쳣����ϵ����Ա!");
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
                    if (result.message == '�����µ�¼') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                total = result.data.total;
                $('#product_count').html(total)
                
            },
            error: function (data) {
                $('.alert').html("�����쳣����ϵ����Ա!");
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