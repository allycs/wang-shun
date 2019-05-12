var Table = function () {
    var handle = function () {
        getData(pageIndex, pageSize, startTime, endTime);
    };

    var getData = function (pageIndex, pageSize, startTime, endTime, userId, state) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/member-withdraw",
            data: { PageIndex: pageIndex, PageSize: pageSize, StartTime: startTime, EndTime: endTime, UserId: userId, State: state },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
                    return;
                }
                console.log(result);
                var length = result.data.rows.length;
                var items = result.data.rows;
                total = result.data.total;
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    tableHtml +=
                        '<tr>' +
                        '<td>' + items[i].id + '</td>' +
                        '<td>' + items[i].userId + '</td>' +
                        '<td>' + items[i].amount + '</td>' +
                        '<td>' + MemberWithdarwStateToString(items[i].state) + '</td>' +
                        '<td>' + items[i].remark + '</td>' +
                        '<td>' + new Date(items[i].createTime).Format("yyyy/MM/dd") + '</td>' +
                        '<td>' + new Date(items[i].dealTime).Format("yyyy/MM/dd") + '</td>' +
                        '<td>' + items[i].settleOrderId + '</td>' +
                        '<td>' + items[i].settleChannel + '</td>' +
                        '<td>' + items[i].settleAccountHolder + '</td>' +
                        '<td>' + items[i].settleAccountNo + '</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-info">查看</button>' +
                        '<button type="button" class="btn btn-warning">审核</button>' +
                        '<button type="button" class="btn btn-danger">删除</button>' +
                        '</td>' +
                        '</tr>';
                }
                $('#member_withdraw_table').html(tableHtml);
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
        state = $('#search_state option:selected').val();
        getData(pageIndex, pageSize, startTime, endTime, userId, state);
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

