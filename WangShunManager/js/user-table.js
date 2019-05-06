var Table = function () {

    var getData = function (pageIndex, pageSize, userId, loginId, state) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/users",
            data: { PageIndex: pageIndex, PageSize: pageSize, Id: userId, LoginId: loginId, State: state },
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
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    tableHtml +=
                        '<tr id="user_' + items[i].id+'">' +
                            '<td>' + items[i].id + '</td>' +
                            '<td>' + items[i].loginId + '</td>' +
                            '<td>' + items[i].realName + '</td>' +
                            '<td>' + items[i].usableBalance + '</td>' +
                            '<td>' + items[i].freezeBalance + '</td>' +
                            '<td>' + items[i].creditAmount + '</td>' +
                            '<td>' + items[i].companyName + '</td>' +
                            '<td>' + items[i].companyAddress + '</td>' +
                            '<td>' + items[i].contactQq + '</td>' +
                            '<td>' + items[i].email + '</td>' +
                            '<td>' + items[i].accountManager + '</td>' +
                            '<td>' + items[i].remark + '</td>' +
                            '<td>' + IsDelToString(items[i].isDel) + '</td>' +
                            '<td>' + InfoStateToString(items[i].userInfoState) + '</td>' +
                            '<td style="text-align:center;">' +
                                '<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick=\'Table.service('
                    + items[i].id + ',"'
                    + items[i].loginId + '","'
                    + items[i].realName + '",'
                    + items[i].usableBalance + ','
                    + items[i].freezeBalance + ','
                    + items[i].creditAmount + ',"'
                    + items[i].companyName + '","'
                    + items[i].companyAddress + '","'
                    + items[i].contactQq + '","'
                    + items[i].email + '","'
                   + items[i].accountManager + '","'
                    + items[i].remark + 
                        '")\'>维护</button>' +
                                '<button type="button" class="btn btn-danger" style="margin-left:2px;">删除</button>' +
                            '</td>' +
                        '</tr>';
                }
                $('#user_table').html(tableHtml);
                $('#total').html("第" + pageIndex + "页-共" + total + "条");
                CheckPage();
            },
            error: function (data) {
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
                return;
            }
        });
    };
    var service = function (id, loginId, realName, usableBalance, freezeBalance, creditAmount, companyName, companyAddress, contactQq, email, accountManager, remark) {
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
    return {
        init: function () {
            handle();
        },
        getData: function () {
            getData(pageIndex, pageSize, userId, loginId, state);
        },
        service: function (id, loginId, realName, usableBalance, freezeBalance, creditAmount, companyName, companyAddress, contactQq, email, accountManager, remark) {
            service(id, loginId, realName, usableBalance, freezeBalance, creditAmount, companyName, companyAddress, contactQq, email, accountManager, remark);
        }
    };
}();

