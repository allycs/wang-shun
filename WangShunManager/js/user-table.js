var Table = function () {

    var getData = function (pageIndex, pageSize, userId, loginId, state) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/users",
            data: { PageIndex: pageIndex, PageSize: pageSize, Id: userId, LoginId: loginId, State: state },
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
                        '<tr id="user_' + items[i].id + '">' +
                        '<td id="user_id_' + items[i].id + '">' + items[i].id + '</td>' +
                        '<td>' + items[i].loginId + '</td>' +
                        '<td id="user_real_name_' + items[i].id + '">' + items[i].realName + '</td>' +
                        '<td id="user_company_name_' + items[i].id + '">' + items[i].companyName + '</td>' +
                        '<td id="user_company_address_' + items[i].id + '">' + items[i].companyAddress + '</td>' +
                        '<td id="user_contact_qq_' + items[i].id + '">' + items[i].contactQq + '</td>' +
                        '<td id="user_email_' + items[i].id + '">' + items[i].email + '</td>' +
                        '<td id="user_usable_balance_' + items[i].id + '">' + items[i].usableBalance + '</td>' +
                        '<td id="user_freeze_balance_' + items[i].id + '">' + items[i].freezeBalance + '</td>' +
                        '<td id="user_credit_amount_' + items[i].id + '">' + items[i].creditAmount + '</td>' +
                        '<td id="user_state_' + items[i].id + '">' + InfoStateToString(items[i].userInfoState) + '</td>' +
                        '<td id="user_account_manager_' + items[i].id + '">' + items[i].accountManager + '</td>' +
                        '<td id="user_remark_' + items[i].id + '">' + items[i].remark + '</td>' +
                        //'<td id="user_del_' + items[i].id + '">' + IsDelToString(items[i].isDel) + '</td>' +
                        '<td style="text-align:right;">' +
                        '<button id="user_service_btn_' + items[i].id + '" type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="Table.service('
                        + items[i].id + ',\''
                        + items[i].loginId + '\',\''
                        + items[i].realName + '\','
                        + items[i].usableBalance + ','
                        + items[i].freezeBalance + ','
                        + items[i].creditAmount + ',\''
                        + items[i].companyName + '\',\''
                        + items[i].companyAddress + '\',\''
                        + items[i].contactQq + '\',\''
                        + items[i].email + '\',\''
                        + items[i].accountManager + '\',\''
                        + items[i].remark +
                        '\');">编辑</button>' +
                        '<button id="user_state_btn_' + items[i].id + '" type="button" class="btn btn-warning" style="margin-left:2px;" onclick="Table.setState(' + items[i].id + ',' + items[i].userInfoState + ')">' + InfoStateToString(Math.abs(items[i].userInfoState - 1)) + '</button>';
                    if (!items[i].isDel) {
                        tableHtml += '<button id="user_del_btn_' + items[i].id + '" type="button" class="btn btn-danger" style="margin-left:2px;" onclick="Table.delUser(' + items[i].id + ')">删除</button>';
                    }
                    tableHtml +
                        '</td>' +
                        '</tr>';
                }
                $('#user_table').html(tableHtml);
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
    var service = function (id, loginId, realName, usableBalance, freezeBalance, creditAmount, companyName, companyAddress, contactQq, email, accountManager, remark) {
        $('.alert-danger-modal').hide();
        $('.alert-success-modal').hide();
        $('#user_id').val(id);
        $('#user_login_id').val(loginId);
        $('#user_real_name').val(realName);
        $('#user_company_name').val(companyName);
        $('#user_usable_balance').val(usableBalance);
        $('#user_freeze_balance').val(freezeBalance);
        $('#user_credit_amount').val(creditAmount);
        $('#user_contact_qq').val(contactQq);
        $('#user_email').val(email);
        $('#user_account_manager').val(accountManager);
        $('#user_remark').val(remark);
        $('#user_company_address').val(companyAddress);

    };
    var handle = function () {
        getData(pageIndex, pageSize);
    };
    var setState = function (id, state) {
        state = Math.abs(state - 1);
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/users/" + id + "/" + state,
            data: {},
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
                    return;
                }

                $('#user_state_' + id).html(InfoStateToString(state));
                $("#user_state_btn_" + id).attr("onclick", "Table.setState(" + id + "," + state + ");");
                $("#user_state_btn_" + id).html(InfoStateToString(Math.abs(state - 1)));
            },
            error: function (data) {
                $('.alert-main').html("网络异常请联系管理员!");
                $('.alert-main').show();
                return;
            }
        });
    };
    var delUser = function (id) {
        $.ajax({
            type: "DELETE",
            dataType: "json",
            url: "/users/" + id,
            data: {},
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
                    return;
                }

                $('#user_del_' + id).html("删除");
                $("#user_del_btn_" + id).remove();
            },
            error: function (data) {
                $('.alert-main').html("网络异常请联系管理员!");
                $('.alert-main').show();
                return;
            }
        });
    };
    var update = function () {
        $('.alert-danger-modal').hide();
        $('.alert-success-modal').hide();
        var upUserId = $('#user_id').val();
        var realName = $('#user_real_name').val();
        var companyName = $('#user_company_name').val();
        var companyAddress = $('#user_company_address').val();
        var contactQq = $('#user_contact_qq').val();
        var email = $('#user_email').val();
        var accountManager = $('#user_account_manager').val();
        var remark = $('#user_remark').val();

        var usableBalance = $("#user_usable_balance_" + upUserId).html();
        var freezeBalance = $("#user_freeze_balance_" + upUserId).html();
        var creditAmount = $("#user_credit_amount_" + upUserId).html();

        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/users",
            data: { Id: upUserId, RealName: realName, CompanyName: companyName, CompanyAddress: companyAddress, ContactQq: contactQq, Email: email, AccountManager: accountManager, Remark: remark },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-modal strong').html(result.message + "!");
                    $('.alert-danger-modal').show();
                    return;
                }

                $('.alert-success-modal strong').html(result.message);
                $('.alert-success-modal').show();
                $('#user_real_name_' + upUserId).html(result.data.realName);
                $('#user_company_name_' + upUserId).html(result.data.companyName);
                $('#user_company_address_' + upUserId).html(result.data.companyAddress);
                $('#user_contact_qq_' + upUserId).html(result.data.contactQq);
                $('#user_email_' + upUserId).html(result.data.email);
                $('#user_account_manager_' + upUserId).html(result.data.accountManager);
                $('#user_remark_' + upUserId).html(result.data.remark);
                $("#user_service_btn_" + upUserId).attr("onclick", "Table.service("
                    + upUserId + ",'"
                    + result.data.loginId + "','"
                    + result.data.realName + "',"
                    + usableBalance + ","
                    + freezeBalance + ","
                    + creditAmount + ",'"
                    + result.data.companyName + "','"
                    + result.data.companyAddress + "','"
                    + iresult.data.contactQq + "','"
                    + result.data.email + "','"
                    + result.data.accountManager + "','"
                    + result.data.remark + "');");
            },
            error: function (data) {
                $('.alert-danger-modal').html("网络异常请联系管理员!");
                $('.alert-danger-modal').show();
                return;
            }
        });
    };
    var search = function () {
        userId = $('#search_id').val();
        loginId = $('#search_login_id').val();
        state = $('#search_state option:selected').val();
        getData(pageIndex, pageSize, userId, loginId, state);
    };
    return {
        init: function () {
            handle();
        },
        getData: function () {
            search();
            //getData(pageIndex, pageSize, userId, loginId, state);
        },
        service: function (id, loginId, realName, usableBalance, freezeBalance, creditAmount, companyName, companyAddress, contactQq, email, accountManager, remark) {
            service(id, loginId, realName, usableBalance, freezeBalance, creditAmount, companyName, companyAddress, contactQq, email, accountManager, remark);
        },
        setState: function (id, state) {
            setState(id, state);
        },
        delUser: function (id) {
            delUser(id);
        },
        update: function () {
            update();
        },
        search: function () {
            search();
        }
    };
}();

