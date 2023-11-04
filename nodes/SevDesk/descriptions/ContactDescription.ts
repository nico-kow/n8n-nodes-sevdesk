import { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Contact Customer Number Availability Check',
				value: 'contactCustomerNumberAvailabilityCheck',
				description: 'Checks if a given customer number is available or already used',
				action: 'Contact customer number availability check',
				routing: {
					request: {
						method: 'GET',
						url: 'Contact/Mapper/checkCustomerNumberAvailability',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									isAvailable: '={{$responseItem.objects}}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a contact',
				description: 'Create a new contact',
				routing: {
					request: {
						method: 'POST',
						url: '/Contact',
						body: {
							category: {
								objectName: 'Category',
							},
						},
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
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete the contact',
				action: 'Delete a contact',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/Contact/{{$parameter.contactId}}',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "success": true } }}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Returns a single contact',
				action: 'Get a contact',
				routing: {
					request: {
						method: 'GET',
						url: '=/Contact/{{$parameter.contactId}}',
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
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Gets a List of Contacts based on filters',
				action: 'Get many contacts',
				routing: {
					request: {
						method: 'GET',
						url: '/Contact',
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
			{
				name: 'Get Next Customer Number',
				value: 'getNextCustomerNumber',
				description: 'Retrieves the next available customer number. Avoids duplicates.',
				action: 'Get next customer number',
				routing: {
					request: {
						method: 'GET',
						url: 'Contact/Factory/getNextCustomerNumber',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									nextNumber: '={{$responseItem.objects}}',
								},
							},
						],
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update the contact',
				action: 'Update a contact',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Contact/{{$parameter.contactId}}',
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
		],
	},
];

export const contactFields: INodeProperties[] = [
	// ----------------------------------------
	//               contact: getNextCustomerNumber
	// ----------------------------------------

	// ----------------------------------------
	//               contact: contactCustomerNumberAvailabilityCheck
	// ----------------------------------------
	{
		displayName: 'Customer Number',
		name: 'customerNumber',
		description: 'The customer number to be checked',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['contactCustomerNumberAvailabilityCheck'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'customerNumber',
				value: '={{$value}}',
			},
		},
	},

	// ----------------------------------------
	//               contact: getAll
	// ----------------------------------------

	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Field',
		description:
			'There are a multitude of parameter which can be used to filter. A few of them are attached but for a complete list please check out &lt;a href="https://5677.extern.sevdesk.dev/apiOverview/index.html#/doc-contacts#filtering"&gt;this&lt;/&gt; list.',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Depth',
				name: 'depth',
				description:
					'Defines if both organizations and persons should be returned. "0" -> only organizations, "1" -> organizations and persons.',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'query',
						property: 'depth',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Customer Number',
				name: 'customerNumber',
				description: 'Retrieve all contacts with this customer number',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'customerNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Customer Name',
				name: 'customerName',
				description: 'Retrieve all contacts with this name, surename or familyname',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'name',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				description: 'Max number of results to return',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				routing: {
					send: {
						type: 'query',
						property: 'limit',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				description: 'Offset to skip for pagination',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				routing: {
					send: {
						type: 'query',
						property: 'offset',
						value: '={{$value}}',
					},
				},
			},
		],
	},

	// ----------------------------------------
	//               contact: create
	// ----------------------------------------

	{
		displayName: 'Category',
		name: 'id',
		description: 'Unique identifier of the category',
		hint: 'Supplier=2, Customer=3, Partner=4, Prospect Customer=28',
		type: 'number',
		default: 3,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'category.id',
				propertyInDotNotation: true,
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
				resource: ['contact'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Academic Title',
				name: 'academicTitle',
				description: 'A academic title for the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'academicTitle',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Bank Account',
				name: 'bankAccount',
				description: 'Bank account number (IBAN) of the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'bankAccount',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Bank Number',
				name: 'bankNumber',
				description: 'Bank number of the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'bankNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Birthday',
				name: 'birthday',
				description: 'Birthday of the contact. Not to be used for organizations.',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'birthday',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Customer Number',
				name: 'customerNumber',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'customerNumber',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Cashback Percent',
				name: 'defaultCashbackPercent',
				description:
					'Percentage of the invoice sum the contact gets back if he payed invoices in time',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'defaultCashbackPercent',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Cashback Time',
				name: 'defaultCashbackTime',
				description:
					'Absolute time in days which the contact has to pay his invoices and subsequently get a cashback',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'defaultCashbackTime',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Discount Amount',
				name: 'defaultDiscountAmount',
				description:
					'The default discount the contact gets for every invoice. Depending on defaultDiscountPercentage attribute, in percent or absolute value.',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'defaultDiscountAmount',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Discount Percentage',
				name: 'defaultDiscountPercentage',
				description: 'Whether discount is a percentage (true) or an absolute value (false)',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'defaultDiscountPercentage',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Time To Pay',
				name: 'defaultTimeToPay',
				description: 'The payment goal in days which is set for every invoice of the contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'defaultTimeToPay',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				description: 'A description for the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'description',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Exempt Vat',
				name: 'exemptVat',
				description: 'Whether the contact is freed from paying vat',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'exemptVat',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'familyname',
				description: 'The last name of the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'familyname',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Gender',
				name: 'gender',
				description: 'Gender of the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'gender',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				description:
					'The organization name. Be aware that the type of contact will depend on this attribute. If it holds a value, the contact will be regarded as an organization.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Second Name',
				name: 'name2',
				description: 'The second name of the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name2',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Parent ID',
				name: 'id',
				description: 'Unique identifier of the parent contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'parent.id',
						propertyInDotNotation: true,
						value: '={{ $value }}',
					},
					request: {
						body: {
							parent: {
								objectName: 'Contact',
							},
						},
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'surename',
				description: 'The first name of the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'surename',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Tax Number',
				name: 'taxNumber',
				description: 'The tax number of the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'taxNumber',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Tax Office',
				name: 'taxOffice',
				description: 'The tax office responsible for the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'taxOffice',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Tax Set ID',
				name: 'taxSet',
				description: 'Tax set which is used in every invoice of the contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'taxSet.id',
						propertyInDotNotation: true,
						value: '={{ $value }}',
					},
					request: {
						body: {
							parent: {
								objectName: 'TaxSet',
							},
						},
					},
				},
			},
			{
				displayName: 'Tax Type',
				name: 'taxType',
				description:
					'Defines which tax regulation the contact is using. One of "default", "eu", "noteu", "custom".',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'taxType',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'titel',
				description: 'A non-academic title for the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'titel',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Vat Number',
				name: 'vatNumber',
				description: 'Vat Number of the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'vatNumber',
						value: '={{ $value }}',
					},
				},
			},
		],
	},
	// ----------------------------------------
	//               contact: get
	// ----------------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		description: 'ID of contact to return',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get'],
			},
		},
	},
	// ----------------------------------------
	//               contact: update
	// ----------------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		description: 'ID of contact to update',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Academic Title',
				name: 'academicTitle',
				description: 'A academic title for the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'academicTitle',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Bank Account',
				name: 'bankAccount',
				description: 'Bank account number (IBAN) of the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'bankAccount',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Bank Number',
				name: 'bankNumber',
				description: 'Bank number of the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'bankNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Birthday',
				name: 'birthday',
				description: 'Birthday of the contact. Not to be used for organizations.',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'birthday',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Customer Number',
				name: 'customerNumber',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'customerNumber',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Cashback Percent',
				name: 'defaultCashbackPercent',
				description:
					'Percentage of the invoice sum the contact gets back if he payed invoices in time',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'defaultCashbackPercent',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Cashback Time',
				name: 'defaultCashbackTime',
				description:
					'Absolute time in days which the contact has to pay his invoices and subsequently get a cashback',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'defaultCashbackTime',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Discount Amount',
				name: 'defaultDiscountAmount',
				description:
					'The default discount the contact gets for every invoice. Depending on defaultDiscountPercentage attribute, in percent or absolute value.',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'defaultDiscountAmount',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Discount Percentage',
				name: 'defaultDiscountPercentage',
				description: 'Whether discount is a percentage (true) or an absolute value (false)',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'defaultDiscountPercentage',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Default Time To Pay',
				name: 'defaultTimeToPay',
				description: 'The payment goal in days which is set for every invoice of the contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'defaultTimeToPay',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				description: 'A description for the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'description',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Exempt Vat',
				name: 'exemptVat',
				description: 'Whether the contact is freed from paying vat',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'exemptVat',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'familyname',
				description: 'The last name of the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'familyname',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Gender',
				name: 'gender',
				description: 'Gender of the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'gender',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				description:
					'The organization name. Be aware that the type of contact will depend on this attribute. If it holds a value, the contact will be regarded as an organization.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Second Name',
				name: 'name2',
				description: 'The second name of the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name2',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Parent ID',
				name: 'id',
				description: 'Unique identifier of the parent contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'parent.id',
						propertyInDotNotation: true,
						value: '={{ $value }}',
					},
					request: {
						body: {
							parent: {
								objectName: 'Contact',
							},
						},
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'surename',
				description: 'The first name of the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'surename',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Tax Number',
				name: 'taxNumber',
				description: 'The tax number of the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'taxNumber',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Tax Office',
				name: 'taxOffice',
				description: 'The tax office responsible for the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'taxOffice',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Tax Set ID',
				name: 'taxSet',
				description: 'Tax set which is used in every invoice of the contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'taxSet.id',
						propertyInDotNotation: true,
						value: '={{ $value }}',
					},
					request: {
						body: {
							parent: {
								objectName: 'TaxSet',
							},
						},
					},
				},
			},
			{
				displayName: 'Tax Type',
				name: 'taxType',
				description:
					'Defines which tax regulation the contact is using. One of "default", "eu", "noteu", "custom".',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'taxType',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'titel',
				description: 'A non-academic title for the contact. Not to be used for organizations.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'titel',
						value: '={{ $value }}',
					},
				},
			},
			{
				displayName: 'Vat Number',
				name: 'vatNumber',
				description: 'Vat Number of the contact',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'vatNumber',
						value: '={{ $value }}',
					},
				},
			},
		],
	},
	// ----------------------------------------
	//               contact: delete
	// ----------------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		description: 'ID of contact to delete',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['delete'],
			},
		},
	},
];
