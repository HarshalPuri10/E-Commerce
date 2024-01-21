Proforma PDF –  Incomplete fields. We will map these fields tomorrow.
Exports customer PI PDF not matching with the SVG sent
Bugs like SO creation. On Convert to SO. Nothing happens. A message should be shown to the user saying “SO # SO0065 has been successfully created.” And take user to Sales Order View screen with Sales Order details selected.


 In the Proforma invoice page please correct naming in the table heading as 'Qty'  i am looking there so you are writing as 'Q'.


Below are the details for Configuration of Templates. Let me know in case of any questions.



- Add a button "Configure Templates" after "Add Bank Details"
- On click on the above button, open a modal capturing the following fields
- UI design should be similar to other modals with each row containing 3 fields with Save and Close feature





Purchase Order Domestic
Drop down with options – “Regular POD” and “PO Domestic”
Regular POD selection should open our current Purchase Order PDF
PO Domestic when selected should show the updated Purchase Order Domestic screen sent today
Purchase Order Imports
Drop down with options – “Regular POI” and “PO Imports”
Regular POI selection should open our current Purchase Order PDF
PO Imports when selected should show the updated Purchase Order Imports screen sent today


Proforma Invoice Domestic
Drop down with options – “PI Domestic”. This option should be selected by default.
This template should open when Customer category is Domestic
Proforma Invoice Exports
Drop down with options – “PI Exports”. This option should be selected by default.
This template should open when Customer category is Exports

Tax Invoice Domestic
Drop down with options –
“Turnover less than 5 CR”,
“Turnover less than 5 CR with Dispatch” and
“E-Invoice”

This template should open when Customer category is Domestic
Tax Invoice Exports
As of now implement the same functionality as Domestic Customers. We will send you the invoice details later on.
Drop down with options –
“Turnover less than 5 CR”,
“Turnover less than 5 CR with Dispatch” and
“E-Invoice”


Bank Details

- Add a button "Add Bank Details" after "Add Contact Details"
- On click on the above button, open a modal capturing the following fields
- UI design should be similar to other modals with each row containing 4 fields/columns



Beneficiary name - Default should be company name
Bank Name - Text Field
Bank Branch - Text Field
Bank Address - Text Field


Account Type - Drop down with options - Current and Savings
Account Number - Text Field
IFS Code - Text Field
MICR Code - Text Field


Exports - Drop down with options Yes and No. Default selected is "No". Make the below fields enable if selected option is Yes.
Swift Code - Text Field (Not Mandatory)
Intermediary Bank - Text Field (Not Mandatory)
Intermediary Bank Swift Code - Text Field (Not Mandatory)



“Constitution of Business” – Should be configurable drop down with the below options

Sole Proprietorship,
Partnership,
Limited Liability Partnership (LLP),
Private Limited,
Public Limited,
One Person Company (OPC),
Producer Company,

