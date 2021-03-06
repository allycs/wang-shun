﻿var Table = function () {
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
                var length = result.data.rows.length;
                var items = result.data.rows;
                total = result.data.total;
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    var dealTime = items[i].dealTime == null ? "" : new Date(items[i].dealTime).Format("yyyy/MM/dd hh:mm:ss");
                    tableHtml +=
                        '<tr>' +
                        '<td>' + items[i].id + '</td>' +
                        '<td>' + items[i].userId + '</td>' +
                        '<td>' + items[i].amount + '</td>' +
                        '<td>' + items[i].settleChannel + '</td>' +
                        '<td>' + items[i].settleAccountNo + '</td>' +
                        '<td>' + items[i].settleAccountHolder + '</td>' +
                        '<td>' + new Date(items[i].createTime).Format("yyyy/MM/dd hh:mm:ss") + '</td>' +
                        '<td>' + dealTime + '</td>' +
                        '<td><input id="member_withdraw_settle_order_id_' + items[i].id + '" type="text" class="form-control" placeholder="结算流水" value="' + items[i].settleOrderId + '"></td>' +
                        '<td id="member_withdraw_state_' + items[i].id + '">' + MemberWithdarwStateToString(items[i].state) + '</td>' +
                        //'<td>' + items[i].remark + '</td>' +
                        '<td>' + items[i].auditor + '</td>' +
                        '<td style="text-align:center;">';
                    if (items[i].state == 0)
                        tableHtml +=
                            '<button class="btn btn-success member_withdarw_cash_audit_btn_' + items[i].id + '" onclick="Table.cashAudit(' + items[i].id + ',1,' + items[i].settleOrderId + ')">成功</button>' +
                            '<button type="button" class="btn btn-warning member_withdarw_cash_audit_btn_' + items[i].id + '" style="margin-left:2px;" onclick="Table.cashAudit(' + items[i].id + ',2,' + items[i].settleOrderId + ')">失败</button>';

                    tableHtml +=
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
        $('.alert-main').hide();
        startTime = $('#search_start_time').val();
        endTime = $('#search_end_time').val();
        userId = $('#search_user_id').val();
        state = $('#search_state option:selected').val();
        $('.alert').hide();
        getData(pageIndex, pageSize, startTime, endTime, userId, state);
    };
    var cashAudit = function (id, state, settleOrderId) {
        if (settleOrderId !== null && settleOrderId !== undefined && settleOrderId !== '') {
            return;
        } else {
            settleOrderId = $('#member_withdraw_settle_order_id_' + id).val();
        }
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/member-withdraw/cash-audit",
            data: { Id: id, State: state, SettleOrderId: settleOrderId },
            success: function (result) {
                console.log(result);
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
                    return;
                }
                $('#member_withdraw_state_' + id).html("审核成功");
                $(".member_withdarw_cash_audit_btn_" + id).remove();
            },
            error: function (data) {
                $('.alert-main').html("网络异常请联系管理员!");
                $('.alert-main').show();
                return;
            }
        });
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
        },
        cashAudit: function (id, state, settleOrderId) {
            cashAudit(id, state, settleOrderId);
        }
    };
}();

