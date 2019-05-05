var Out_Stock_Log_Table = function () {
    var handleOutStockLog = function (id) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/out-stock-log",
            data: { PageIndex: 1, PageSize: 30,Id:id },
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
                        '<td>' + items[i].userName +'</td>' +
                        '<td>' + items[i].preCardAccountType +'</td>' +
                        '<td>' + items[i].requestIp +'</td>' +
                        '<td>' + items[i].stockId +'</td>' +
                        '<td>' + items[i].createTime +'</td>' +
                        '<td>' + items[i].Message +'</td>' +
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
        init: function (id) {
            handleOutStockLog(id);
        }
    };
}();

