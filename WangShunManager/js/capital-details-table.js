var Capital_Details_Table = function () {
    var handleCapitalDetails = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/capital-details",
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
                        '<td>' + items[i].userId +'</td>' +
                        '<td>' + items[i].createTime +'</td>' +
                        '<td>' + items[i].bizId +'</td>' +
                        '<td>' + items[i].tradeAmount +'</td>' +
                        '<td>' + items[i].preBalance +'</td>' +
                        '<td>' + items[i].postBalance +'</td>' +
                        '<td>' + items[i].type +'</td>' +
                        '<td>' + items[i].status +'</td>' +
                        '<td>' + items[i].remark +'</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-info">查看</button>' +
                        '<button type="button" class="btn btn-warning">修改</button>' +
                        '<button type="button" class="btn btn-danger">删除</button>' +
                        '</td>' +
                     '</tr>';
                }
                $('#capital_details_table').html(tableHtml);
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
            handleCapitalDetails();
        }
    };
}();

