﻿var Table = function () {
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
                        '<td>' + InfoStateToString(items[i].state) + '</td>' +
                        '<td>' + new Date(items[i].createTime).Format("yyyy/MM/dd hh:mm:ss") + '</td>' +
                        '<td>' + items[i].currentDiscount + '</td>' +
                        '<td>' + items[i].pri + '</td>' +
                        '<td>' + items[i].userRemark + '</td>' +
                        //'<td>' + items[i].productId + '</td>' +
                        //'<td>' + items[i].initialDiscount + '</td>' +
                        //'<td>' + items[i].cardInfos + '</td>' +
                        '<td style="text-align:center">' +
                        '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#logModal"  onclick="Table.serviceModal(' + items[i].id + ')">查看</button>' +
                        '<button id="sale_service_btn_' + items[i].id + '" type="button" class="btn btn-warning"data-toggle="modal" data-target="#myModal" style="margin-left:2px;"  onclick="Table.service('
                        + items[i].id + ');">编辑</button>' +
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


        getData(pageIndex, pageSize, startTime, endTime, batchId, categoryId, parValue, state);
    };

    var getModalData = function (id) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/pre-card-batch-log",
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
                        '<td>' + items[i].uploadBatchId + '</td>' +
                        '<td>' + items[i].createTime + '</td>' +
                        '<td>' + items[i].Message + '</td>' +
                        '</tr>';
                }
                $('#log_modal_table').html(tableHtml);
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

