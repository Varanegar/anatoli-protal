function dataOwnersViewModel() {
    var self = this;

    self.addDataOwner = function () { };
    self.editDataOwner = function () { };
    self.removeDataOwner = function () { };

    self.initDataOwnersGrid = function () {
        // initials 
        var dataOwnersDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: urls.dataOwnersUrl,
                    dataType: "json",
                    contentType: "application/json",
                    type: "GET",
                    beforeSend: gridAuthHeader
                },
                parameterMap: function (options, operation) {
                    if (operation == "read")
                        return kendo.stringify(options);
                }
            },
            batch: true,
            pageSize: 10,
            requestEnd: onRequestEnd,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { editable: false, nullable: false },
                        applicationOwnerId: { editable: false, nullable: false },
                        applicationOwnerName: { editable: false, nullable: false },
                        anatoliContactId: { editable: false, nullable: false },
                        anatoliContactName: { editable: false, nullable: false },
                        resourceName: { editable: false, nullable: false },
                        title: { editable: false, nullable: false },
                        webHookUri: { editable: false, nullable: false },
                        webHookUsername: { editable: false, nullable: false },
                        webHookPassword: { editable: false, nullable: false },
                    }
                }
            }
        });
        $("#dataOwner-management-grid").kendoGrid({
            dataSource: dataOwnersDataSource,
            navigatable: true,
            resizable: true,
            sortable: true,
            filterable: {
                //mode: "row",
                extra: false,
                operators: {
                    string: {
                        startswith: "شروع با",
                        eq: "مساوی با",
                        neq: "نامساوی",
                        contains: "شامل"
                    }
                }
            },
            pageable: true,
            toolbar: kendo.template($("#toolbar-template").html()),
            height: 500,
            selectable: 'row',
            columns: [
                { field: "applicationOwnerName", title: "Application Owner", width: 100 },
                { field: "anatoliContactName", title: "Contact Owner", width: 100 },
                { field: "title", title: "Title", width: 100 },
                { field: "webHookUri", title: "Webhook URI", width: 100 },
                { field: "webHookUsername", title: "Username", width: 100 },
                { field: "webHookPassword", title: "Password", width: 100 },
                { command: { text: "Edit", click: self.editDataOwner }, title: " ", width: "100px" },
                { command: { text: "Remove", click: self.removeDataOwner }, title: " ", width: "100px" }
            ],
            editable: false,
            dataBinding: onDataBinding
        });
    };
    self.initDataOwnersGrid();
}