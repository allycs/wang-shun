var Table = function () {
    var handle = function () {
        getData(pageIndex, pageSize, startTime, endTime);
    };

    var getData = function (pageIndex, pageSize, startTime, endTime, userId, type, status) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/capital-details",
            data: { PageIndex: pageIndex, PageSize: pageSize, StartTime: startTime, EndTime: endTime, UserId: userId, Type: type, Status: status },
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
                        '<td>' + items[i].userId + '</td>' +
                        '<td>' + new Date(items[i].createTime).Format("yyyy/MM/dd hh:mm:ss") + '</td>' +
                        '<td>' + items[i].bizId + '</td>' +
                        '<td>' + items[i].tradeAmount + '</td>' +
                        '<td>' + items[i].preBalance + '</td>' +
                        '<td>' + items[i].postBalance + '</td>' +
                        '<td>' + CaptialDetailsTypeToString(items[i].type) + '</td>' +
                        '<td>' + SettleStateToString(items[i].status) + '</td>' +
                        '<td>' + items[i].remark + '</td>' +
                        '</tr>';
                }
                $('#capital_details_table').html(tableHtml);
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
        userId = $('#search_user_id').val();
        type = $('#search_type option:selected').val();
        status = $('#search_status option:selected').val();
        $('.alert').hide();

        getData(pageIndex, pageSize, startTime, endTime, userId, type, status);
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

