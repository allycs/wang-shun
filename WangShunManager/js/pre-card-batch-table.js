var Table = function () {
    var handle = function () {
        getData(pageIndex, pageSize,startTime,endTime);
    };
    var getData = function (pageIndex, pageSize, startTime, endTime, batchId, categoryId, parValue, state) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/pre-card-batch",
            data: { PageIndex: pageIndex, PageSize: pageSize, StartTime: startTime, EndTime: endTime, BatchId: batchId,CategoryId,categoryId, ParValue: parValue, State: state },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
                    return;
                }
                var length = result.data.rows.length;
                var items = result.data.rows;
                total = result.data.total;
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    tableHtml +=
                        '<tr>' +
                        '<td>' + items[i].id + '</td>' +
                        '<td>' + items[i].productId + '</td>' +
                        '<td>' + items[i].totalAmount + '</td>' +
                        '<td>' + items[i].parValue + '</td>' +
                        '<td>' + new Date(items[i].createTime).Format("yyyy/MM/dd") + '</td>' +
                        '<td>' + items[i].usedNum + '</td>' +
                        '<td>' + items[i].unUsedNum + '</td>' +
                        '<td>' + items[i].errorNum + '</td>' +
                        '<td>' + items[i].inUseNum + '</td>' +
                        '<td>' + items[i].userId + '</td>' +
                        '<td>' + InfoStateToString(items[i].state) + '</td>' +
                        '<td>' + items[i].initialDiscount + '</td>' +
                        '<td>' + items[i].currentDiscount + '</td>' +
                        '<td>' + items[i].userRemark + '</td>' +
                        '<td>' + items[i].pri + '</td>' +
                        '<td>' + ProductCategoryToString(items[i].productCategory) + '</td>' +
                        '<td>' + items[i].cardInfos + '</td>' +
                        '</tr>';
                }
                $('#pre_card_batch_table').html(tableHtml);
                $('#total').html("第" + pageIndex + "页-共" + total + "条");
                CheckPage();
            },
            error: function (data) {
                $('.alert-main').html("网络异常请联系管理员!");
                $('.alert-main').show();
                return;
            }
        });
    };
    var search = function () {
        startTime = $('#search_start_time').val();
        endTime = $('#search_end_time').val();
        batchId = $('#search_batch_id').val();
        categoryId = $('#search_category_id option:selected').val();
        parValue = $('#search_par_value').val();
        state = $('#search_state option:selected').val();


        getData(pageIndex, pageSize, startTime, endTime, batchId, categoryId, parValue, state);
    };
    return {
        init: function () {
            handle();
        },
        getData: function () {
            search();
        },
        search: function () {
            search();
        }
    };
}();

