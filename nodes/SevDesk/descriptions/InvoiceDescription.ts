import { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['invoice'],
			},
		},
		options: [
			// ----------------------------------------
			//               Invoice: book
			// ----------------------------------------
			{
				name: 'Book',
				value: 'bookInvoice',
				description:
					'This endpoint can be used to book invoices. Invoices are booked on payment accounts where (bank) transactions are located and might be linked to the transactions by using this endpoint. For more detailed information about booking invoices, please refer to <a href="https://api.sevdesk.de/#tag/Invoice/operation/bookInvoice">this</a> section of our API-Overview',
				action: 'Book an invoice',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Invoice/{{$parameter.invoiceId}}/bookAmount',
					},
				},
			},
			// ----------------------------------------
			//               Invoice: cancel
			// ----------------------------------------
			{
				name: 'Cancel',
				value: 'cancel',
				description:
					'This endpoint will cancel the specified invoice therefor creating a cancellation invoice. The cancellation invoice will be automatically paid and the source invoices status will change to "cancelled".',
				action: 'Cancel an invoice',
				routing: {
					request: {
						method: 'POST',
						url: '=/Invoice/{{$parameter.invoiceId}}/cancelInvoice',
					},
				},
			},
			// ----------------------------------------
			//               Invoice: createByFactory
			// ----------------------------------------
			{
				name: 'Create or Update',
				value: 'createByFactory',
				description:
					'This endpoint offers you the following functionality. <ul> <li>Create invoices together with positions and discounts</li> <li>Delete positions while adding new ones</li> <li>Delete or add discounts, or both at the same time</li> <li>Automatically fill the address of the supplied contact into the invoice address</li> </ul> To make your own request sample slimmer, you can omit all parameters which are not required and nullable. However, for a valid and logical bookkeeping document, you will also need some of them to ensure that all the necessary data is in the invoice. Please see the reference <a href="https://api.sevdesk.de/#tag/Invoice/operation/createInvoiceByFactory">here</a>',
				action: 'Create or update an invoice',
				routing: {
					request: {
						method: 'POST',
						url: '=/Invoice/Factory/saveInvoice',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'invoice',
								},
							},
						],
					},
				},
			},
			// ----------------------------------------
			//               Invoice: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				description:
					'There are a multitude of parameter which can be used to filter. A few of them are attached but for a complete list please check out <a href="https://5677.extern.sevdesk.dev/apiOverview/index.html#/doc-invoices#filtering">this</a> list.',
				action: 'Get many invoices',
				routing: {
					request: {
						method: 'GET',
						url: '=/Invoice',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'objects',
								},
							},
						],
					},
				},
			},
			// ----------------------------------------
			//               Invoice: getInvoicePdf
			// ----------------------------------------
			{
				name: 'Invoice Get Pdf',
				value: 'invoiceGetPdf',
				description: 'Retrieves the pdf document of an invoice with additional metadata',
				action: 'Invoice get pdf an invoice',
				routing: {
					request: {
						method: 'GET',
						url: '=/Invoice/{{$parameter.invoiceId}}/getPdf',
					},
				},
			},
			// ----------------------------------------
			//               Invoice: renderInvoice
			// ----------------------------------------
			{
				name: 'Invoice Render',
				value: 'invoiceRender',
				description:
					'Using this endpoint you can render the pdf document of an invoice. Use cases for this are the retrieval of the pdf location or the forceful re-render of a already sent invoice. Please be aware that changing an invoice after it has been sent to a customer is not an allowed bookkeeping process',
				action: 'Invoice render an invoice',
				routing: {
					request: {
						method: 'POST',
						url: '=/Invoice/{{$parameter.invoiceId}}/render',
					},
				},
			},
			// ----------------------------------------
			//               Invoice: isInvoicePartiallyPaid
			// ----------------------------------------
			{
				name: 'Is Invoice Partially Paid',
				value: 'getIsInvoicePartiallyPaid',
				description:
					'Returns "true" if the given invoice is partially paid - "false" if it is not. Invoices which are completely paid are regarded as not partially paid.',
				action: 'Is invoice partially paid an invoice',
				routing: {
					request: {
						method: 'GET',
						url: '=/Invoice/{{$parameter.invoiceId}}/getIsPartiallyPaid',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									isInvoicePartiallyPaid: '={{$responseItem.objects}}',
								},
							},
						],
					},
				},
			},
			// ----------------------------------------
			//               Invoice: markAsSent
			// ----------------------------------------
			{
				name: 'Mark As Sent',
				value: 'markAsSent',
				description: 'Marks an invoice as sent by a chosen send type',
				action: 'Mark an invoice as sent',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Invoice/{{$parameter.invoiceId}}/sendBy',
					},
				},
			},
			// ----------------------------------------
			//               Invoice: sendViaEMail
			// ----------------------------------------
			{
				name: 'Send Via E Mail',
				value: 'sendViaEMail',
				description:
					'This endpoint sends the specified invoice to a customer via email. This will automatically mark the invoice as sent. Please note, that in production an invoice is not allowed to be changed after this happened!',
				action: 'Send via e mail an invoice',
				routing: {
					request: {
						method: 'POST',
						url: '=/Invoice/{{$parameter.invoiceId}}/sendViaEmail',
					},
				},
			},
		],
		default: 'getMany',
	},
];

export const invoiceFields: INodeProperties[] = [
	// ----------------------------------------
	//              invoice: book
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice to book',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['bookInvoice'],
			},
		},
	},
	{
		displayName: 'Amount',
		name: 'amount',
		description: 'Amount which should be booked. Can also be a partial amount.',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['bookInvoice'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'amount',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Date',
		name: 'date',
		description: 'The booking date. Most likely the current date.',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['bookInvoice'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'date',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		description: `Define a type for the booking. The following type abbreviations are available (abbreviation <-> meaning).
 <ul>
 <li>N <-> Normal booking / partial booking</li>
 <li>CB <-> Reduced amount due to discount (skonto)</li>
 <li>CF <-> Reduced/Higher amount due to currency fluctuations</li>
 <li>O <-> Reduced/Higher amount due to other reasons</li>
 <li>OF <-> Higher amount due to reminder charges</li>
 <li>MTC <-> Reduced amount due to the monetary traffic costs</li>
 </ul>`,
		type: 'options',
		required: true,
		default: 'N',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['bookInvoice'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'type',
				value: '={{$value}}',
			},
		},
		options: [
			{
				name: 'Higher Amount Due to Reminder Charges',
				value: 'OF',
			},
			{
				name: 'Normal Booking / Partial Booking',
				value: 'N',
			},
			{
				name: 'Reduced Amount Due to Discount (Skonto)',
				value: 'CB',
			},
			{
				name: 'Reduced Amount Due to the Monetary Traffic Costs',
				value: 'MTC',
			},
			{
				name: 'Reduced/Higher Amount Due to Currency Fluctuations',
				value: 'CF',
			},
			{
				name: 'Reduced/Higher Amount Due to Other Reasons',
				value: 'O',
			},
		],
	},
	{
		displayName: 'Check Account ID',
		name: 'checkAccountId',
		description: 'The check account on which should be booked',
		hint: 'Get IDs with sevDesk Node. CheckAccount -> Get Many',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['bookInvoice'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'checkAccount',
				value: '={{ { "id": $value, "objectName": "CheckAccount" } }}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['bookInvoice'],
			},
		},
		options: [
			{
				displayName: 'Check Account Transaction ID',
				name: 'checkAccountTransactionId',
				type: 'number',
				default: 0,
				hint: 'Get IDs with sevDesk Node. CheckAccountTransaction -> Get Many',
				description:
					'The check account transaction on which should be booked. The transaction will be linked to the invoice.',
				routing: {
					send: {
						type: 'body',
						property: 'checkAccountTransaction',
						value: '={{ { "id": $value, "objectName": "CheckAccountTransaction" } }}',
					},
				},
			},
			{
				displayName: 'Create Feed',
				name: 'createFeed',
				type: 'boolean',
				default: false,
				description: 'Whether a feed is created for the booking process',
				routing: {
					send: {
						type: 'body',
						property: 'createFeed',
						value: '={{$value}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//             invoice: cancel
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice to be cancelled',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['cancel'],
			},
		},
	},

	// ----------------------------------------
	//             invoice: create by factory
	// ----------------------------------------
	{
		displayName:
			'This endpoint offers you the following functionality. <ul> <li>Create invoices together with positions and discounts</li> <li>Delete positions while adding new ones</li> <li>Delete or add discounts, or both at the same time</li> <li>Automatically fill the address of the supplied contact into the invoice address</li> </ul> To make your own request sample slimmer, you can omit all parameters which are not required and nullable. However, for a valid and logical bookkeeping document, you will also need some of them to ensure that all the necessary data is in the invoice. Please see the reference <a href="https://api.sevdesk.de/#tag/Invoice/operation/createInvoiceByFactory">here</a>',
		name: 'note',
		type: 'notice',
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'number',
		default: 0,
		required: true,
		description: 'The contact used in the invoice',
		hint: 'Get contacts with the sevDesk node. Contacts -> Get Many',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.contact',
				value: '={{ { "id": $value, "objectName": "Contact" } }}',
			},
		},
	},
	{
		displayName: 'Invoice Date',
		name: 'invoiceDate',
		required: true,
		type: 'dateTime' || 'string',
		hint: 'For final invoices (invoiceType = "ER"), the invoiceDate must be later than or equal to the invoiceDate of related advance (invoiceType = "AR") / partial (invoiceType = "TR") invoices.',
		default: '',
		description: 'Needs to be provided as timestamp or dd.mm.yyyy',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.invoiceDate',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Discount',
		name: 'discount',
		type: 'number',
		required: true,
		default: 0,
		description:
			'If you want to give a discount, define the percentage here. Otherwise provide zero as value.',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.discount',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		description:
			'Please have a look in our <a href="https://api.sevdesk.de/#tag/Invoice/Types-and-status-of-invoices">API-Overview</a> to see what the different status codes mean',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.status',
				value: '={{$value}}',
			},
		},
		options: [
			{
				name: 'Deactivated Recurring Invoice',
				value: 50,
			},
			{
				name: 'Draft',
				value: 100,
			},
			{
				name: 'Open / Due',
				value: 200,
			},
			{
				name: 'Payed',
				value: 1000,
			},
		],
		default: 100,
	},
	{
		displayName: 'Contact Person ID',
		name: 'contactPerson',
		description: 'The user who acts as a contact person for the invoice',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.contactPerson',
				value: '={{ { "id": $value, "objectName": "SevUser" } }}',
			},
		},
	},
	{
		displayName: 'Tax Rate',
		name: 'taxRate',
		type: 'number',
		required: true,
		default: 0,
		description: 'Is overwritten by invoice position tax rates',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.taxRate',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Tax Text',
		name: 'taxText',
		type: 'string',
		default: '',
		required: true,
		description: 'A common tax text would be "Umsatzsteuer 19%"',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.taxText',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Tax Type',
		name: 'taxType',
		type: 'options',
		default: 'default',
		required: true,
		description:
			'Tax type of the invoice. There are four tax types: <ol> <li>default - Umsatzsteuer ausweisen</li> <li>eu - Steuerfreie innergemeinschaftliche Liefer (Europäische Union)</li> <li>noteu - Steuerschuldnerschaft des Leistungsempfängers (außerhalb EU, z. B. Schweiz)</li> <li>custom - Using custom tax set Tax rates are heavily connected to the tax type used.</li> <li>ss - Not subject to VAT according to §19 1 UStG Tax rates are heavily connected to the tax type used.</li> </ol>.',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.taxType',
				value: '={{$value}}',
			},
		},
		options: [
			{
				name: 'Custom',
				value: 'custom',
			},
			{
				name: 'Default',
				value: 'default',
			},
			{
				name: 'EU',
				value: 'eu',
			},
			{
				name: 'Not EU',
				value: 'noteu',
			},
			{
				name: 'SS',
				value: 'ss',
			},
		],
	},
	{
		displayName: 'Invoice Type',
		name: 'invoiceType',
		type: 'options',
		required: true,
		default: 'RE',
		description:
			'Type of the invoice. For more information on the different types, check <a href="https://api.sevdesk.de/#tag/Invoice/Types-and-status-of-invoices">this</a> section of our API-Overview.',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.invoiceType',
				value: '={{$value}}',
			},
		},
		options: [
			{
				name: 'Cancellation Invoice',
				value: 'SR',
			},
			{
				name: 'Final Invoice',
				value: 'ER',
			},
			{
				name: 'Normal Invoice',
				value: 'RE',
			},
			{
				name: 'Part Invoice',
				value: 'TR',
			},
			{
				name: 'Recurring Invoice',
				value: 'WKR',
			},
			{
				name: 'Reminder Invoice',
				value: 'MA',
			},
		],
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: 'EUR',
		required: true,
		description: 'Currency used in the invoice. Needs to be currency code according to ISO-4217.',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.currency',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Map All',
		name: 'mapAll',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		routing: {
			send: {
				type: 'body',
				propertyInDotNotation: true,
				property: 'invoice.mapAll',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		options: [
			{
				displayName: 'Invoice ID',
				name: 'invoiceId',
				type: 'number',
				hint: 'The invoice ID. Required if you want to create or update an invoice position for an existing invoice.',
				default: '',
				description:
					'The invoice ID. Required if you want to create or update an invoice position for an existing invoice.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.invoiceDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Small Settlement',
				name: 'smallSettlement',
				type: 'boolean',
				default: false,
				description:
					'Whether the client uses the small settlement scheme. If yes, the invoice must not contain any vat.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.smallSettlement',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Account Interval',
				name: 'accountInterval',
				type: 'string',
				default: '',
				description:
					'The interval in which recurring invoices are due as ISO-8601 duration. Necessary attribute for all recurring invoices.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.accountInterval',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Account Next Invoice',
				name: 'accountNextInvoice',
				type: 'dateTime',
				default: '',
				description: 'Timestamp when the next invoice will be generated by this recurring invoice',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.accountNextInvoice',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description:
					'Complete address of the recipient including name, street, city, zip and country. * Line breaks can be used and will be displayed on the invoice pdf.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.address',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Cost Centre ID',
				name: 'costCentreId',
				type: 'number',
				default: 0,
				description: 'Cost Centre for the invoice',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.costCentre',
						value: '={{ { "id": $value, "objectName": "CostCentre"}}',
					},
				},
			},
			{
				displayName: 'Customer Internal Note',
				name: 'customerInternalNote',
				type: 'string',
				default: '',
				description:
					'Internal note of the customer. Contains data entered into field "Referenz/Bestellnummer".',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.customerInternalNote',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Delivery Date',
				name: 'deliveryDate',
				type: 'dateTime' || 'string',
				default: '',
				description:
					'Timestamp. This can also be a date range if you also use the attribute deliveryDateUntil.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.deliveryDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Delivery Date Until',
				name: 'deliveryDateUntil',
				type: 'dateTime' || 'string',
				default: 0,
				description:
					'If the delivery date should be a time range, another timestamp can be provided in this attribute * to define a range from timestamp used in deliveryDate attribute to the timestamp used here',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.deliveryDateUntil',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Discount Time',
				name: 'discountTime',
				type: 'number',
				default: 0,
				description:
					'If a value other than zero is used for the discount attribute, you need to specify the amount of days for which the discount is granted',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.discountTime',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Dunning Level',
				name: 'dunningLevel',
				type: 'number',
				default: 1,
				description:
					'Defines how many reminders have already been sent for the invoice. Starts with 1 (Payment reminder) and should be incremented by one every time another reminder is sent.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.dunningLevel',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Enshrined',
				name: 'enshrined',
				type: 'dateTime',
				default: '',
				description:
					'Defines if and when invoice was enshrined. Enshrined invoices can not be manipulated.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.enshrined',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Foot Text',
				name: 'footText',
				type: 'string',
				default: '',
				description: 'Certain html tags can be used here to format your text',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.footText',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Head Text',
				name: 'headText',
				type: 'string',
				default: '',
				description: 'Certain html tags can be used here to format your text',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.headText',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Header',
				name: 'header',
				type: 'string',
				default: '',
				description: 'Normally consist of prefix plus the invoice number',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.header',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Invoice Number',
				name: 'invoiceNumber',
				type: 'string',
				default: '',
				description: 'The invoice number. Example: RE-1000.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.invoiceNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Origin (Order ID)',
				name: 'origin',
				type: 'number',
				default: 0,
				description: 'Origin of the invoice. Could be an order.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.origin',
						value: '={{ { "id": $value, "objectName": "Order" } }}',
					},
				},
			},
			{
				displayName: 'Pay Date',
				name: 'payDate',
				type: 'dateTime' || 'string',
				default: '',
				description: 'Needs to be timestamp or dd.mm.yyyy',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.payDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Payment Method ID',
				name: 'paymentMethod',
				type: 'number',
				default: '',
				description: 'Payment method used for the invoice',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.paymentMethod',
						value: '={{ { "id": $value, "objectName": "PaymentMethod" } }}',
					},
				},
			},
			{
				displayName: 'Reminder Charge',
				name: 'reminderCharge',
				type: 'number',
				default: '',
				description: 'The additional reminder charge',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.reminderCharge',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Reminder Deadline',
				name: 'reminderDeadline',
				type: 'dateTime',
				default: '',
				description: 'Deadline of the reminder as timestamp',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.reminderDeadline',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Reminder Debit',
				name: 'reminderDebit',
				type: 'number',
				default: 0,
				description: 'Debit of the reminder',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.reminderDebit',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Reminder Total',
				name: 'reminderTotal',
				type: 'number',
				default: 0,
				description: 'Total reminder amount',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.reminderTotal',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Send Date',
				name: 'sendDate',
				type: 'dateTime',
				default: '',
				description: 'The date the invoice was sent to the customer',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.sendDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Send Type',
				name: 'sendType',
				type: 'options',
				default: 'VPR',
				description:
					'Type which was used to send the invoice. IMPORTANT: Please refer to the invoice section of the <a href="https://api.sevdesk.de/#tag/Invoice/operation/createInvoiceByFactory">API-Overview</a> to understand how this attribute can be used before using it.',
				hint: 'Printed -> VPR, Downloaded -> VPDF, Mailed -> VM, Postal -> VP',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.sendType',
						value: '={{$value}}',
					},
				},
				options: [
					{
						name: 'Printed',
						value: 'VPR',
					},
					{
						name: 'Downloaded',
						value: 'VPDF',
					},
					{
						name: 'Mailed',
						value: 'VM',
					},
					{
						name: 'Postal',
						value: 'VP',
					},
				],
			},
			{
				displayName: 'Show Net',
				name: 'showNet',
				type: 'boolean',
				default: true,
				description:
					'Whether the net amount of each position will be shown on the invoice. Otherwise gross amount.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.showNet',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Tax Set',
				name: 'taxSet',
				type: 'number',
				default: 0,
				description: 'Tax set of the invoice. Needs to be added if you chose the tax type custom.',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.taxSet',
						value: '={{ { "id": $value, "objectName": "TaxSet" } }}',
					},
				},
			},
			{
				displayName: 'Time To Pay',
				name: 'timeToPay',
				type: 'number',
				default: 0,
				description: 'The time the customer has to pay the invoice in days',
				routing: {
					send: {
						type: 'body',
						propertyInDotNotation: true,
						property: 'invoice.timeToPay',
						value: '={{$value}}',
					},
				},
			},
		],
	},
	{
		displayName: 'Invoice Positions',
		name: 'invoicePositions',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		options: [
			{
				displayName: 'Save Invoice Positions',
				name: 'invoicePosSave',
				type: 'json',
				default: 'null',
				description:
					'The invoice positions you want to create. If you don\'t have any, set to null. You can find the Model <a href="https://my.sevdesk.de/swaggerUI/index.html#/Models">here</a>.',
				routing: {
					send: {
						type: 'body',
						property: 'invoicePosSave',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Delete Invoice Positions',
				name: 'invoicePosDelete',
				type: 'json',
				default: 'null',
				description:
					'The invoice positions you want to delete. If you don\'t have any, set to null. You can find the Model <a href="https://my.sevdesk.de/swaggerUI/index.html#/Models">here</a>.',
				routing: {
					send: {
						type: 'body',
						property: 'invoicePosDelete',
						value: '={{$value}}',
					},
				},
			},
		],
	},
	{
		displayName: 'Discounts',
		name: 'discounts',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['createByFactory'],
			},
		},
		options: [
			{
				displayName: 'Save Discounts',
				name: 'discountSave',
				type: 'json',
				default: 'null',
				description:
					'The discounts you want to create. If you don\'t have any, set to null. You can find the Model <a href="https://my.sevdesk.de/swaggerUI/index.html#/Models">here</a>.',
				routing: {
					send: {
						type: 'body',
						property: 'discountSave',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Delete Discounts',
				name: 'discountDelete',
				type: 'json',
				default: 'null',
				description:
					'The discounts you want to create. If you don\'t have any, set to null. You can find the Model <a href="https://my.sevdesk.de/swaggerUI/index.html#/Models">here</a>.',
				routing: {
					send: {
						type: 'body',
						property: 'discountDelete',
						value: '={{$value}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//             invoice: delete
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice resource to delete',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['delete'],
			},
		},
	},

	// ----------------------------------------
	//             invoice: invoiceRender
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice resource to delete',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['invoiceRender'],
			},
		},
	},
	{
		displayName: 'Force Reload',
		name: 'forceReload',
		description: 'Whether a forceful re-render should occur',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['invoiceRender'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'forceReload',
				value: '={{$value}}',
			},
		},
	},

	// ----------------------------------------
	//               invoice: get
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice to return',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['get'],
			},
		},
	},

	// ----------------------------------------
	//             invoice: getMany
	// ----------------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getMany'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'limit',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Field',
		description: 'There are a multitude of parameter which can be used to filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
				description:
					'Retrieve all invoices with this contact. Must be provided with Contact Object Name.',
				type: 'number',
				default: 0,
				routing: {
					request: {
						url: '=/Invoice?contact[id]={{$value}}&contact[objectName]=Contact'
					}
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				description: 'Retrieve all invoices with a date equal or lower',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'endDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Invoice Number',
				name: 'invoiceNumber',
				description: 'Retrieve all invoices with this invoice number',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'invoiceNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				description: 'Retrieve all invoices with a date equal or higher',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'startDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				description: 'Status of the invoices to retrieve. One of "50", "100", "1000".',
				type: 'options',
				default: 100,
				routing: {
					send: {
						type: 'query',
						property: 'status',
						value: '={{$value}}',
					},
				},
				options: [
					{
						name: 'Draft',
						value: 100,
					},
					{
						name: 'Open / Due',
						value: 200,
					},
					{
						name: 'Payed',
						value: 1000,
					},
				]
			},
		],
	},
	// ----------------------------------------
	//    invoice: getIsInvoicePartiallyPaid
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice to return',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['getIsInvoicePartiallyPaid'],
			},
		},
	},

	// ----------------------------------------
	//          invoice: invoiceGetPdf
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice from which you want the pdf',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['invoiceGetPdf'],
			},
		},
	},
	// ----------------------------------------
	//           invoice: markAsSent
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice to mark as sent',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['markAsSent'],
			},
		},
	},
	{
		displayName: 'Send Type',
		name: 'sendType',
		description:
			'Specifies the way in which the invoice was sent to the customer. Accepts "VPR" (print), "VP" (postal), "VM" (mail) and "VPDF" (downloaded pfd).',
		type: 'options',
		required: true,
		default: 'VPR',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['markAsSent'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'sendType',
				value: '={{$value}}',
			},
		},
		options: [
			{
				name: 'Print (VPR)',
				value: 'VPR',
			},
			{
				name: 'Postal (VP)',
				value: 'VP',
			},
			{
				name: 'Mail (VM)',
				value: 'VM',
			},
			{
				name: 'Downloaded (VPDF)',
				value: 'VPDF',
			},
		],
	},
	{
		displayName: 'Send Draft',
		name: 'sendDraft',
		description: 'Whether the invoice should be enshrined after marking it as sent',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['markAsSent'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'sendDraft',
				value: '={{$value}}',
			},
		},
	},

	// ----------------------------------------
	//          invoice: sendViaEMail
	// ----------------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceId',
		description: 'ID of invoice to be sent via email',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['sendViaEMail'],
			},
		},
	},
	{
		displayName: 'To Email',
		name: 'toEmail',
		description: 'The recipient of the email',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['sendViaEMail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'toEmail',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'subject',
		description: 'The subject of the email',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['sendViaEMail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'subject',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		description: 'The text of the email. Can contain html.',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['sendViaEMail'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'text',
				value: '={{$value}}',
			},
		},
	},

	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoice'],
				operation: ['sendViaEMail'],
			},
		},
		options: [
			{
				displayName: 'Copy',
				name: 'copy',
				type: 'boolean',
				default: false,
				description: 'Whether a copy of this email is sent to you',
				routing: {
					send: {
						type: 'body',
						property: 'copy',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Additional Attachments',
				name: 'additionalAttachments',
				type: 'string',
				default: '',
				description:
					'Additional attachments to the mail. String of IDs of existing documents in your * sevdesk account separated by ",".',
				routing: {
					send: {
						type: 'body',
						property: 'additionalAttachments',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'CC Email',
				name: 'ccEmail',
				type: 'string',
				default: '',
				description: 'String of mail addresses to be put as cc separated by ","',
				routing: {
					send: {
						type: 'body',
						property: 'ccEmail',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'BCC Email',
				name: 'bccEmail',
				type: 'string',
				default: '',
				description: 'String of mail addresses to be put as bcc separated by ","',
				routing: {
					send: {
						type: 'body',
						property: 'bccEmail',
						value: '={{$value}}',
					},
				},
			},
		],
	},
];
