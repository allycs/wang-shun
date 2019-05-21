var Table = function () {
    var handle = function () {
        getData(pageIndex, pageSize, startTime, endTime);
    };

    var getData = function (pageIndex, pageSize, startTime, endTime, id, userId, userOrderId, account, parValue, state, categoryId, channelId, qCellCore, preCardId) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/out-stock",
            data: {
                PageIndex: pageIndex, PageSize: pageSize, StartTime: startTime, EndTime: endTime, Id: id, UserId: userId, UserOrderId: userOrderId,
                Account: account, ParValue: parValue, State: state, CategoryId: categoryId, ChannelId: channelId, Location: qCellCore, PreCardId: preCardId
            },
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
                        '<td>' + items[i].preCardId + '</td>' +
                        '<td>' + items[i].userOrderId + '</td>' +
                        '<td>' + items[i].channelId + '</td>' +
                        '<td>' + items[i].account + '</td>' +
                        '<td>' + items[i].parValue + '</td>' +
                        '<td>' + items[i].location + '</td>' +
                        '<td>' + ProductCategoryToString(items[i].ispType) + '</td>' +
                        '<td>' + items[i].productName + '</td>' +
                        '<td>' + ProductTypeToString(items[i].productType) + '</td>' +
                        '<td>' + items[i].userId + '</td>' +
                        '<td>' + new Date(items[i].createTime).Format("yyyy/MM/dd hh:mm:ss") + '</td>' +
                        '<td>' + new Date(items[i].completeTime).Format("yyyy/MM/dd hh:mm:ss") + '</td>' +
                        '<td>' + StockStateToString(items[i].state) + '</td>' +
                        //'<td>' + items[i].notifyUrlId + '</td>' +
                        //'<td>' + items[i].productId + '</td>' +
                        '<td>' + items[i].remark + '</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#logModal"  onclick="Table.serviceModal(' + items[i].id + ')">查看</button>' +
                        '<button id="out_stock_info_edit_' + items[i].id + '" type="button" class="btn btn-danger"data-toggle="modal" data-target="#editModal" style="margin-left:2px;"  onclick="Table.serviceEditModel(\''
                        + items[i].id + '\',' + items[i].version + ',' + items[i].preCardId + ',\'' + items[i].remark + '\',' + items[i].state + ');">编辑</button>' +
                        '</td>' +
                        '</tr>';
                }
                $('#out_stock_table').html(tableHtml);
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
    var updateOutStockInfo = function (id, version, preCardId, remark, state) {
        console.log("Version:" + version);
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/out-stock/remark",
            data: { Id: id, Version: version, Remark: remark, StockState: state },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-edit-modal strong').html(result.message + "!");
                    $('.alert-danger-edit-modal').show();
                    return;
                }
                $('.alert-success-edit-modal strong').html(result.message);
                $('.alert-success-edit-modal').show();
                $('#out_stock_state' + id).html(StockStateToString(state));
                $("#out_stock_info_edit_" + id).attr("onclick", "Table.serviceEditModel('" + id + "'," + version + "," + preCardId + "," + remark + "," + state + "); ");
            },
            error: function (data) {
                $('.alert-danger-edit-modal').html("网络异常请联系管理员!");
                $('.alert-danger-edit-modal').show();
                return;
            }
        });
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/out-stock/remark",
            data: { Id: id, Version: version, Remark: remark, StockState: state },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-edit-modal strong').html(result.message + "!");
                    $('.alert-danger-edit-modal').show();
                    return;
                }
                $('.alert-success-edit-modal strong').html(result.message);
                $('.alert-success-edit-modal').show();
                $('#out_stock_state' + id).html(StockStateToString(state));
                $("#out_stock_info_edit_" + id).attr("onclick", "Table.serviceEditModel('" + id + "'," + version + "," + preCardId + "," + remark + "," + state + "); ");
            },
            error: function (data) {
                $('.alert-danger-edit-modal').html("网络异常请联系管理员!");
                $('.alert-danger-edit-modal').show();
                return;
            }
        });
    };
    var search = function () {
        startTime = $('#search_start_time').val();
        endTime = $('#search_end_time').val();
        id = $('#search_id').val()
        userId = $('#search_user_id').val();
        userOrderId = $('#search_user_order_id').val();
        account = $('#search_account').val();
        //parValue = $('#search_par_value').val();
        parValue = $('#search_par_value option:selected').val();
        state = $('#search_state option:selected').val();
        categoryId = $('#search_category_id option:selected').val();
        channelId = $('#search_channel_id').val();
        qCellCore = $('#search_location').val();
        preCardId = $('#search_pre_card_id').val();
        $('.alert').hide();
        getData(pageIndex, pageSize, startTime, endTime, id, userId, userOrderId, account, parValue, state, categoryId, channelId, qCellCore, preCardId);
    };
    var getModalData = function (id) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/out-stock-log",
            data: { PageIndex: pageModalIndex, PageSize: pageModalSize, Id: id },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-modal strong').html(result.message + "!");
                    $('.alert-danger-modal').show();
                    return;
                }
                var length = result.data.rows.length;
                var items = result.data.rows;
                totalModal = result.data.total;
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    tableHtml +=
                        '<tr>' +
                        '<td>' + items[i].id + '</td>' +
                        '<td>' + items[i].userName + '</td>' +
                        '<td>' + PreCardAccountTypeToString(items[i].preCardAccountType) + '</td>' +
                        '<td>' + items[i].requestIp + '</td>' +
                        '<td>' + items[i].stockId + '</td>' +
                        '<td>' + new Date(items[i].createTime).Format("yyyy/MM/dd hh:mm:ss") + '</td>' +
                        '<td>' + items[i].message + '</td>' +
                        '</tr>';
                }
                $('#log_modal_table').html(tableHtml);
                $('#modal_total').html("第" + pageModalIndex + "页-共" + totalModal + "条");
                CheckModalPage();
            },
            error: function (data) {
                $('.alert-danger-modal').html("网络异常请联系管理员!");
                $('.alert-danger-modal').show();
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
        serviceEditModel: function (id, version, preCardId,remark, stockState) {
            $('.alert-danger-edit-modal').hide();
            $('.alert-success-edit-modal').hide();
            $('#out_stock_id').val(id);
            $('#out_stock_version').val(version);
            $('#out_stock_pre_card_id').val(preCardId);
            $('#out_stock_remark').val(remark);
            $('#out_stock_state').val(stockState);
        },
        updateOutStockInfo: function () {
            var id = $('#out_stock_id').val();
            var version = $('#out_stock_version').val();
            var preCardId = $('#out_stock_pre_card_id').val();
            var state = $('#out_stock_state option:selected').val();
            var remark = $('#out_stock_remark').val();
            updateOutStockInfo(id, version, preCardId, remark, state);
        },
        serviceModal: function (id) {
            $('.alert-danger-modal').hide();
            $('.alert-success-modal').hide();
            pageModalIndex = 1;
            $('#log_modal_table').html("");
            $('#modal_total').html("页-共-条");
            getModalData(id);
        }
    };
}();

