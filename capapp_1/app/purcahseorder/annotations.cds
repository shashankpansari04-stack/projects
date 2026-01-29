using catalogService as service from '../../srv/catalogService';


//Annotate our entity on which we created fiori app
annotate service.PurchaseOrderSet with @(
    // selection fields - to show filter fields
    UI.SelectionFields      : [
        PO_ID,
        PARTNER_GUID.COMPANY_NAME,
        PARTNER_GUID.ADDRESS_GUID.COUNTRY,
        GROSS_AMOUNT,
        OVERALL_STATUS
    ],
    // line item - to add columns to the table
    // Ctrl+space
    UI.LineItem             : [
        {
            $Type: 'UI.DataField',
            Value: PO_ID,
        },
        {
            $Type: 'UI.DataField',
            Value: PARTNER_GUID.COMPANY_NAME,
        },
        {
            $Type: 'UI.DataField',
            Value: PARTNER_GUID.ADDRESS_GUID.COUNTRY,
        },
        {
            $Type: 'UI.DataField',
            Value: GROSS_AMOUNT,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'CatalogService.boost',
            Label : 'boost',
            Inline: true
        },
        {
            $Type      : 'UI.DataField',
            Value      : OverallStatus,
            Criticality: IconColor
        },
    ],
    //Header info to add the title of the table along with the
    //second page top arera
    UI.HeaderInfo           : {
        TypeName      : 'Purchase order',
        TypeNamePlural: 'Purchase Orders',
        Title         : {Value: PO_ID},
        Description   : {Value: PARTNER_GUID.COMPANY_NAME},
        ImageUrl      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljd53JuHAuh-sQBQuqDLQU3Z0uXqxQ3sMHA&s',
    },
    //Add a tabstrip which has multiple tabs - Facets
    UI.Facets               : [{
        $Type : 'UI.CollectionFacet',
        Label : 'PO details',
        Facets: [
            {
                $Type : 'UI.ReferenceFacet',
                Label : 'More Info',
                Target: '@UI.Identification',
            },
            {
                $Type : 'UI.ReferenceFacet',
                Label : 'Pricing Data',
                Target: '@UI.FieldGroup#Spiderman',
            },
            {
                $Type : 'UI.ReferenceFacet',
                Label : 'Status',
                Target: '@UI.FieldGroup#Superman',
            },
        ],
    }, ],
    //first block inside the collection facet - identification (default)
    UI.Identification       : [
        {
            $Type: 'UI.DataField',
            Value: NODE_KEY,
        },
        {
            $Type: 'UI.DataField',
            Value: PO_ID,
        },
        {
            $Type: 'UI.DataField',
            Value: PARTNER_GUID_NODE_KEY,
        }
    ],
    //other fields grouped in a field group for creating multiple blocks
    UI.FieldGroup #Spiderman: {Data: [
        {
            $Type: 'UI.DataField',
            Value: GROSS_AMOUNT,
        },
        {
            $Type: 'UI.DataField',
            Value: NET_AMOUNT,
        },
        {
            $Type: 'UI.DataField',
            Value: TAX_AMOUNT,
        },
    ], },
    UI.FieldGroup #Superman : {Data: [
        {
            $Type: 'UI.DataField',
            Value: OVERALL_STATUS,
        },
        {
            $Type: 'UI.DataField',
            Value: LIFECYCLE_STATUS,
        },
        {
            $Type: 'UI.DataField',
            Value: CURRENCY_code,
        },
    ], }


);


//Setting default value for a field on list report
annotate service.PurchaseOrderSet with {
    @Common: {FilterDefaultValue: 'P'}
    OVERALL_STATUS
}
