using {shashank.db} from '../db/datamodel';

service catalogService @(path: 'catalogService') {

    //All the CURDQ - Create, Update, Read, Delete and Query operation on odata
    @readonly
    entity EmployeeSrv        as projection on db.master.employees;

    //Other entities
    entity BusinessPartnerSet as projection on db.master.businesspartner;
    entity BPAddressSet       as projection on db.master.address;
    entity ProductSet         as projection on db.master.product;
    entity PurchaseOrderSet   as projection on db.transaction.purchaseorder;
    entity POItems            as projection on db.transaction.poitems;

    //function getLargestOrder() returns array of PurchaseOrderSet;
    function getLargestOrder() returns PurchaseOrderSet;
}
