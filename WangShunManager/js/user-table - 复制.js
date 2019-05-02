var User_Table = function () {
    var handleUser = function () {
        var userInfo = localStorage.UserInfo;
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/users",
            data: { PageIndex: 1, PageSize: 50 },
            success: function (result) {
                console.log(result);
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                var length = result.data.rows.length;
                var items = result.data.rows;
                total = result.data.total;
                //TestPage();
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    tableHtml +=
                    '<tr>' +
                        '<td>'+items[i].id+'</td>' +
                        '<td>' + items[i].loginId +'</td>' +
                        '<td>' + items[i].realName +'</td>' +
                        '<td>' + items[i].companyName +'</td>' +
                        '<td>' + items[i].companyAddress +'</td>' +
                        '<td>' + items[i].contactQq +'</td>' +
                        '<td>' + items[i].email +'</td>' +
                        '<td>' + items[i].accountManager +'</td>' +
                        '<td>' + items[i].remark +'</td>' +
                        '<td>' + items[i].isDel +'</td>' +
                        '<td>' + items[i].userInfoState +'</td>' +
                        '<td>' + items[i].accountType +'</td>' + 
                        '<td>' +
                        '<button type="button" class="btn btn-info">查看</button>' +
                        '<button type="button" class="btn btn-warning">修改</button>' +
                        '<button type="button" class="btn btn-danger">删除</button>' +
                        '</td>' +
                     '</tr>';
                }
                $('#user_table').html(tableHtml);
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

