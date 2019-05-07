var Table = function () {
    var handle = function () {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/pre-card",
            data: { PageIndex: 1, PageSize: 30 },
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
                        '<td>' + items[i].id + '</td>' +
                        '<td>' + items[i].batchId + '</td>' +
                        '<td>' + items[i].cardId + '</td>' +
                        '<td>' + items[i].cardState + '</td>' +
                        '<td>' + items[i].managedState + '</td>' +
                        '<td>' + items[i].settleState + '</td>' +
                        '<td>' + items[i].useNum + '</td>' +
                        '<td>' + items[i].uploadBatch.id + '</td>' +
                        '<td>' + items[i].uploadBatch.productId + '</td>' +
                        '<td>' + items[i].uploadBatch.totalAmount + '</td>' +
                        '<td>' + items[i].uploadBatch.parValue + '</td>' +
                        '<td>' + items[i].uploadBatch.createTime + '</td>' +
                        '<td>' + items[i].uploadBatch.usedNum + '</td>' +
                        '<td>' + items[i].uploadBatch.unUsedNum + '</td>' +
                        '<td>' + items[i].uploadBatch.errorNum + '</td>' +
                        '<td>' + items[i].uploadBatch.inUseNum + '</td>' +
                        '<td>' + items[i].uploadBatch.userId + '</td>' +
                        '<td>' + items[i].uploadBatch.state + '</td>' +
                        '<td>' + items[i].uploadBatch.initialDiscount + '</td>' +
                        '<td>' + items[i].uploadBatch.currentDiscount + '</td>' +
                        '<td>' + items[i].uploadBatch.userRemark + '</td>' +
                        '<td>' + items[i].uploadBatch.pri + '</td>' +
                        '<td>' + items[i].uploadBatch.productCategory + '</td>' +
                        '<td>' + items[i].uploadBatch.cardInfos + '</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-info">查看</button>' +
                        '<button type="button" class="btn btn-warning">修改</button>' +
                        '<button type="button" class="btn btn-danger">删除</button>' +
                        '</td>' +
                        '</tr>';
                }
                $('#pre_card_table').html(tableHtml);
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
            handle();
        }
    };
}();

