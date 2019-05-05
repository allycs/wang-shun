var Pre_Card_Batch_Table = function () {
    var handlePreCardBatch = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/pre-card-batch",
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
                        '<td>' + items[i].productId +'</td>' +
                        '<td>' + items[i].totalAmount +'</td>' +
                        '<td>' + items[i].parValue +'</td>' +
                        '<td>' + items[i].createTime +'</td>' +
                        '<td>' + items[i].usedNum +'</td>' +
                        '<td>' + items[i].unUsedNum +'</td>' +
                        '<td>' + items[i].errorNum +'</td>' +
                        '<td>' + items[i].inUseNum +'</td>' +
                        '<td>' + items[i].userId + '</td>' +
                        '<td>' + items[i].state + '</td>' +
                        '<td>' + items[i].initialDiscount + '</td>' +
                        '<td>' + items[i].currentDiscount + '</td>' +
                        '<td>' + items[i].userRemark + '</td>' +
                        '<td>' + items[i].pri + '</td>' +
                        '<td>' + items[i].productCategory + '</td>' +
                        '<td>' + items[i].cardInfos + '</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-info">查看</button>' +
                        '<button type="button" class="btn btn-warning">修改</button>' +
                        '<button type="button" class="btn btn-danger">删除</button>' +
                        '</td>' +
                     '</tr>';
                }
                $('#pre_card_batch_table').html(tableHtml);
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
            handlePreCardBatch();
        }
    };
}();

