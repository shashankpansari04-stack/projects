using {shashank.db} from '../db/datamodel';

service CatalogService @(path:'CatalogService',
    //authentication
    requires: 'authenticated-user') {
    //All the CURDQ - Create, Update, Read, Delete and Query operation on odata
    //@readonly
    entity EmployeeSrv
    //authorization
    @(restrict: [
        {grant: ['READ'], to: 'Viewer', where: 'bankName = $user.BankName'},
        {grant: ['WRITE'], to: 'Admin'}
         ])     as projection on db.master.employees;

    //Other entities
    entity BusinessPartnerSet as projection on db.master.businesspartner;
    entity BPAddressSet       as projection on db.master.address;
    entity ProductSet         as projection on db.master.product;
    entity PurchaseOrderSet   as projection on db.transaction.purchaseorder;
    entity POItems            as projection on db.transaction.poitems;

    //function getLargestOrder() returns array of PurchaseOrderSet;
    function getLargestOrder() returns PurchaseOrderSet;
}
