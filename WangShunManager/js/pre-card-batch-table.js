var Table = function () {
    var handle = function () {
        getData(pageIndex, pageSize, startTime, endTime);
    };
    var getData = function (pageIndex, pageSize, startTime, endTime, batchId, categoryId, parValue, state) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/pre-card-batch",
            data: { PageIndex: pageIndex, PageSize: pageSize, StartTime: startTime, EndTime: endTime, BatchId: batchId, CategoryId: categoryId, ParValue: parValue, State: state },
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
                        '<td>' + ProductCategoryToString(items[i].productCategory) + '</td>' +
                        '<td>' + items[i].totalAmount + '</td>' +
                        '<td>' + items[i].parValue + '</td>' +
                        '<td>' + items[i].count + '</td>' +
                        '<td>' + items[i].usedNum + '</td>' +
                        '<td>' + items[i].unUsedNum + '</td>' +
                        '<td>' + items[i].errorNum + '</td>' +
                        '<td>' + items[i].inUseNum + '</td>' +
                        '<td>' + items[i].userId + '</td>' +
                        '<td style="text-align:center">' +
                        '<select name="selector_state" id="pre_card_batch_state_' + items[i].id + '" class="form-control1" placeholder="批次状态">';
                    switch (items[i].state) {
                        case 0:
                            tableHtml +=
                                '<option value="0" selected>禁用 </option>' +
                                '<option value="1">启用</option>';
                            break;
                        case 1:
                            tableHtml +=
                                '<option value="0">禁用 </option>' +
                                '<option value="1" selected>启用</option>';
                            break;
                        default:
                            tableHtml +=
                                '<option value="-1">未知 </option>' +
                                '<option value="0">禁用 </option>' +
                                '<option value="1">启用</option>';
                            break;
                    }
                    tableHtml +=
                        '</select>' +
                        '</td>' +
                        //'<td>' + InfoStateToString(items[i].state) + '</td>' +
                        '<td>' + new Date(items[i].createTime).Format("yyyy/MM/dd hh:mm:ss") + '</td>' +
                        //'<td>' + items[i].currentDiscount + '</td>' +
                        '<td><input id="pre_card_batch_current_discount_' + items[i].id + '" type="number" class="form-control" placeholder="当前折扣" value="' + items[i].currentDiscount + '"></td>' +
                        //'<td>' + items[i].pri + '</td>' +
                        '<td><input id="pre_card_batch_pri_' + items[i].id + '" type="number" class="form-control" placeholder="优先级" value="' + items[i].pri + '"></td>' +

                        //'<td>' + items[i].userRemark + '</td>' +
                        '<td><input id="pre_card_batch_user_remark_' + items[i].id + '" type="text" class="form-control" placeholder="备注" value="' + items[i].userRemark + '"></td>' +

                        //'<td>' + items[i].productId + '</td>' +
                        //'<td>' + items[i].initialDiscount + '</td>' +
                        //'<td>' + items[i].cardInfos + '</td>' +
                        '<td style="text-align:center">' +
                        '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#logModal"  onclick="Table.serviceModal(\'' + items[i].id + '\')">查看</button>' +
                        '<button id="pre_card_batch_btn_update_' + items[i].id + '" type="button" class="btn btn-warning" style="margin-left:2px;"  onclick="Table.updateInfo(\''
                        + items[i].id + '\',' + items[i].version + ');"  data-container="body" data-toggle="popover" data-placement="left" data-content="更新成功！">更新</button>' +
                        '</td>' +
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
        //parValue = $('#search_par_value').val();
        parValue = $('#search_par_value option:selected').val();
        state = $('#search_state option:selected').val();
        $('.alert').hide();

        getData(pageIndex, pageSize, startTime, endTime, batchId, categoryId, parValue, state);
    };
    var updateInfo = function (id, version) {
        batchState = $('#pre_card_batch_state_' + id + ' option:selected').val();
        discount = $('#pre_card_batch_current_discount_' + id).val();
        pri = $('#pre_card_batch_pri_' + id).val();
        remark = $('#pre_card_batch_user_remark_' + id).val();
        console.log(id);
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/pre-card-batch/info",
            data: { Id: id, Version: version, BatchState: batchState, Discount: discount, Pri: pri, Remark: remark },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
                    return;
                }
                $("#pre_card_batch_btn_update_" + id).popover("show");
                setTimeout(function () {
                    $("#pre_card_batch_btn_update_" + id).popover("hide");
                }, 100);
            },
            error: function (data) {
                $('.alert-main').html("网络异常请联系管理员!");
                $('.alert-main').show();
                return;
            }
        });
    };
    var getModalData = function (id) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/pre-card-batch-log",
            data: { PageIndex: pageModalIndex, PageSize: pageModalSize, Id: id },
            success: function (result) {
                console.log(result);
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
                        '<td>' + items[i].uploadBatchId + '</td>' +
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
        updateInfo: function (id, version) {
            updateInfo(id, version);
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

