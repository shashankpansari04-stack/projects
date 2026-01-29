sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"shashankpo/purcahseorder/test/integration/pages/PurchaseOrderSetList",
	"shashankpo/purcahseorder/test/integration/pages/PurchaseOrderSetObjectPage",
	"shashankpo/purcahseorder/test/integration/pages/POItemsObjectPage"
], function (JourneyRunner, PurchaseOrderSetList, PurchaseOrderSetObjectPage, POItemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('shashankpo/purcahseorder') + '/test/flp.html#app-preview',
        pages: {
			onThePurchaseOrderSetList: PurchaseOrderSetList,
			onThePurchaseOrderSetObjectPage: PurchaseOrderSetObjectPage,
			onThePOItemsObjectPage: POItemsObjectPage
        },
        async: true
    });

    return runner;
});

