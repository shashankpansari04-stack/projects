const cds = require('@sap/cds')


module.exports = class CatalogService extends cds.ApplicationService {
    init() {


        const { EmployeeSrv, BusinessPartnerSet, BPAddressSet, ProductSet, PurchaseOrderSet, POItems } = cds.entities('CatalogService')


        this.before(['CREATE', 'UPDATE'], EmployeeSrv, async (req) => {
            console.log('Before CREATE/UPDATE EmployeeSrv', req.data)
            if (parseFloat(req.data.salaryAmount) >= 1000000) {
                //induce an Error to tell CAP framework that we have an issue
                req.error(500, "Wallah!! Salary cannot be above 1 mn");
            }
        })
        this.after('READ', EmployeeSrv, async (employeeSrv, req) => {
            console.log('After READ EmployeeSrv', employeeSrv)
        })
        this.before(['CREATE', 'UPDATE'], BusinessPartnerSet, async (req) => {
            console.log('Before CREATE/UPDATE BusinessPartnerSet', req.data)
        })
        this.after('READ', BusinessPartnerSet, async (businessPartnerSet, req) => {
            console.log('After READ BusinessPartnerSet', businessPartnerSet)
        })
        this.before(['CREATE', 'UPDATE'], BPAddressSet, async (req) => {
            console.log('Before CREATE/UPDATE BPAddressSet', req.data)
        })
        this.after('READ', BPAddressSet, async (bPAddressSet, req) => {
            console.log('After READ BPAddressSet', bPAddressSet)
        })
        this.before(['CREATE', 'UPDATE'], ProductSet, async (req) => {
            console.log('Before CREATE/UPDATE ProductSet', req.data)
        })
        this.after('READ', ProductSet, async (productSet, req) => {
            console.log('After READ ProductSet', productSet)
        })
        this.before(['CREATE', 'UPDATE'], PurchaseOrderSet, async (req) => {
            console.log('Before CREATE/UPDATE PurchaseOrderSet', req.data)
        })
        this.after('READ', PurchaseOrderSet, async (purchaseOrderSet, req) => {
            console.log('After READ PurchaseOrderSet', purchaseOrderSet)
        })
        this.before(['CREATE', 'UPDATE'], POItems, async (req) => {
            console.log('Before CREATE/UPDATE POItems', req.data)
        })
        this.after('READ', POItems, async (pOItems, req) => {
            console.log('After READ POItems', pOItems)
        })

        //implementation of our action
        //if a user boost the PO, increase the GROSS amount by 20000 (update data in DB)
        this.on('boost', async (req, res) => {
            try {
                //Extract the ID (key) of the PO {NODE_KEY: '4df54sd4f5s454f65d4s'}
                const NODE_KEY = req.params[0];
                console.log("Bro!! I got an ID ===> " + NODE_KEY);
                //initiate an DB transaction
                const tx = cds.tx(req);
                //call DB table with CQL to fetch largest amount of PO
                await tx.update(PurchaseOrderSet).with({
                    GROSS_AMOUNT: { '+=': 20000 },
                    NOTE: 'boosted!'
                }).where(NODE_KEY);


                const reply = await tx.read(PurchaseOrderSet).where(NODE_KEY);


                return reply;
            } catch {


            }
        });

        this.on('getLargestOrder', async (req, res) => {
            try {
                //initiate an DB transaction
                const tx = cds.tx(req);
                //call DB table with CQL to fetch largest amount of PO
                const reply = await tx.read(PurchaseOrderSet).orderBy({
                    "GROSS_AMOUNT": 'desc'
                }).limit(1);


                return reply;
            } catch {


            }
        });




        //implementation of our action
        //if a user boost the PO, increase the GROSS amount by 20000 (update data in DB)
        this.on('boost', async (req, res) => {
            try {
                //Extract the ID (key) of the PO {NODE_KEY: '4df54sd4f5s454f65d4s'}
                const NODE_KEY = req.params[0];
                console.log("Bro!! I got an ID ===> " + NODE_KEY);
                //initiate an DB transaction
                const tx = cds.tx(req);
                //call DB table with CQL to fetch largest amount of PO
                await tx.update(PurchaseOrderSet).with({
                    GROSS_AMOUNT: { '+=': 20000 },
                    NOTE: 'boosted!'
                }).where(NODE_KEY);


                const reply = await tx.read(PurchaseOrderSet).where(NODE_KEY);


                return reply;
            } catch {


            }
        });


        //implementation for function
        this.on('getLargestOrder', async (req, res) => {
            try {
                //initiate an DB transaction
                const tx = cds.tx(req);
                //call DB table with CQL to fetch largest amount of PO
                const reply = await tx.read(PurchaseOrderSet).orderBy({
                    "GROSS_AMOUNT": 'desc'
                }).limit(1);


                return reply;
            } catch {


            }
        });


        return super.init()
    }
}
