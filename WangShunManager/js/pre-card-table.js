var Table = function () {
    var handle = function () {
        getData(pageIndex, pageSize);
    };
    var getData = function (pageIndex, pageSize, startTime, endTime, batchId, cardId, cardState, managedState, settleState) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/pre-card",
            data: { PageIndex: pageIndex, PageSize: pageSize, startTime, endTime, BatchId: batchId, CardId: cardId, CardState: cardState, ManagedState: managedState, SettleState: settleState },
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
                        '<td>' + items[i].batchId + '</td>' +
                        '<td>' + items[i].cardId + '</td>' +
                        '<td>' + items[i].uploadBatch.parValue + '</td>' +
                        '<td>' + new Date(items[i].uploadBatch.createTime).Format("yyyy/MM/dd hh:mm:ss") + '</td>' +
                        '<td>' + items[i].uploadBatch.userId + '</td>' +
                        '<td>' + items[i].uploadBatch.currentDiscount + '</td>' +
                        '<td>' + ProductCategoryToString(items[i].uploadBatch.productCategory) + '</td>' +
                        '<td>' + items[i].useNum + '</td>' +
                        '<td>' + CardStateToString(items[i].cardState) + '</td>' +
                        '<td>' + InfoStateToString(items[i].managedState) + '</td>' +
                        '<td>' + SettleStateToString(items[i].settleState) + '</td>' +
                        //'<td>' + items[i].uploadBatch.id + '</td>' +
                        //'<td>' + items[i].uploadBatch.productId + '</td>' +
                        //'<td>' + items[i].uploadBatch.totalAmount + '</td>' +
                        //'<td>' + items[i].uploadBatch.usedNum + '</td>' +
                        //'<td>' + items[i].uploadBatch.unUsedNum + '</td>' +
                        //'<td>' + items[i].uploadBatch.errorNum + '</td>' +
                        //'<td>' + items[i].uploadBatch.inUseNum + '</td>' +
                        //'<td>' + InfoStateToString(items[i].uploadBatch.state) + '</td>' +
                        //'<td>' + items[i].uploadBatch.initialDiscount + '</td>' +
                        '<td>' + items[i].uploadBatch.userRemark + '</td>' +
                        //'<td>' + items[i].uploadBatch.pri + '</td>' +
                        //'<td>' + items[i].uploadBatch.cardInfos + '</td>' +
                        '<td style="text-align:center">' +
                        '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#logModal"  onclick="Table.serviceModal(' + items[i].id + ')">查看</button>' +
                        '<button id="sale_service_btn_' + items[i].id + '" type="button" class="btn btn-warning"data-toggle="modal" data-target="#myModal" style="margin-left:2px;"  onclick="Table.service('
                        + items[i].id + ');">编辑</button>' +
                        '</td>' +
                        '</tr>';
                }
                $('#pre_card_table').html(tableHtml);
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
        cardId = $('#search_card_id').val();

        cardState = $('#search_card_state option:selected').val();
        managedState = $('#search_managed_state option:selected').val();
        settleState = $('#search_settle_state option:selected').val();

        getData(pageIndex, pageSize, startTime, endTime, batchId, cardId, cardState, managedState, settleState);
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
                    $('.alert-danger-moda strong').html(result.message + "!");
                    $('.alert-danger-moda').show();
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
                        '<td>' + items[i].preCardAccountType + '</td>' +
                        '<td>' + items[i].requestIp + '</td>' +
                        '<td>' + items[i].stockId + '</td>' +
                        '<td>' + items[i].createTime + '</td>' +
                        '<td>' + items[i].Message + '</td>' +
                        '</tr>';
                }
                $('#out_stock_log_modal_table').html(tableHtml);
                $('#modal_total').html("第" + pageModalIndex + "页-共" + totalModal + "条");
                CheckModalPage();
            },
            error: function (data) {
                $('.alert-danger-moda').html("网络异常请联系管理员!");
                $('.alert-danger-moda').show();
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

