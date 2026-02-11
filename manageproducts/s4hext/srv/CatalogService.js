const cds = require('@sap/cds')


module.exports = class CatalogService extends cds.ApplicationService { init() {


  const { MySalesOrder } = cds.entities('btps4salesext.srv.CatalogService')


  this.on ('READ', MySalesOrder, async (mySalesOrder, req) => {
   
    //consume boiler plate code to make a call to our company sap s/4hana system
    return await getAllSalesOrders().then(
            salesOrderTable => {
                var aRecord = [];
                console.log(salesOrderTable);
                salesOrderTable.forEach(element => {
                    var item = {};
                    item.SalesOrder = element.salesOrder;
                    item.SalesOrganization = element.salesOrganization;
                    item.SalesOrderType = element.salesOrderType;
                    item.SoldToParty = element.soldToParty;
                    item.PaymentMethod = element.paymentMethod;
                    if(element.toItem[0]){
                        item.Material = element.toItem[0].material;
                        item.RequestedQuantity = element.toItem[0].requestedQuantity;
                        item.NetAmount = element.toItem[0].netAmount;
                    }else{
                        item.Material = "";
                        item.RequestedQuantity = "";
                        item.NetAmount = "";
                    }
                   
                    aRecord.push(item);
                });
                return aRecord;
            }
        );


  })


   
    var getAllSalesOrders = async function(){
        const { opApiSalesOrderSrv0001 } = require('./src/gene/OP_API_SALES_ORDER_SRV_0001');
        const { salesOrderApi } = opApiSalesOrderSrv0001();
        const dataSalesData = await salesOrderApi.requestBuilder().getAll().top(15)
        .select(
            salesOrderApi.schema.SALES_ORDER,
            salesOrderApi.schema.SALES_ORGANIZATION,
            salesOrderApi.schema.SALES_ORDER_TYPE,
            salesOrderApi.schema.SOLD_TO_PARTY,
            salesOrderApi.schema.PAYMENT_METHOD,
            salesOrderApi.schema.TO_ITEM
        )
        .execute({
           destinationName: "S4HANA" 
        });
        return dataSalesData;
    };




  return super.init()
}}
