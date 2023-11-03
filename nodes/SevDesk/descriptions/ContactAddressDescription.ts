import { INodeProperties } from 'n8n-workflow';

export const contactAddressOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contactAddress'],
			},
		},
		options: [
			// ----------------------------------------
			//               contactAddress: create
			// ----------------------------------------
			{
				name: 'Create',
				value: 'create',
				description: 'Create a contact address',
				action: 'Create a contact address',
				routing: {
					request: {
						method: 'POST',
						url: '/ContactAddress',
						body: {
							contact: {
								objectName: 'Contact',
							},
							country: {
								objectName: 'StaticCountry',
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
			// ----------------------------------------
			//               contactAddress: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Gets a List of ContactAddresses based on filters',
				action: 'Get many contact addresses',
				routing: {
					request: {
						method: 'GET',
						url: '/ContactAddress',
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
			//               contactAddress: update
			// ----------------------------------------
			{
				name: 'Update',
				value: 'update',
				action: 'Updates a contact address',
				routing: {
					request: {
						method: 'PUT',
						url: '=/ContactAddress/{{$parameter.contactAddressId}}',
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
			//               contactAddress: delete
			// ----------------------------------------
			{
				name: 'Delete',
				value: 'delete',
				action: 'Deletes a contact address',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/ContactAddress/{{$parameter.contactAddressId}}',
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
		],
		default: 'getMany',
	},
];

export const contactAddressFields: INodeProperties[] = [
	// ----------------------------------------
	//               contactAddress: create
	// ----------------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		required: true,
		description: 'Unique identifier of the Contact',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'contact.id',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Country ID',
		name: 'countryId',
		description: 'Unique identifier of the Country',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'country.id',
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
				resource: ['contactAddress'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Street',
				name: 'street',
				description: 'Street name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'street',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Zip Code',
				name: 'zip',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'zip',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'city',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'number',
				default: 0,
				hint: 'Work=43, Private=44, Empty=45, Invoice Address=47, Delivery Address=48, Pickup Address=49',
				routing: {
					send: {
						type: 'body',
						property: 'category',
						value: '={"id": {{$value}}, "objectName": "Category"} ',
					},
				},
			},
			{
				displayName: 'Name in Address',
				name: 'name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Second Name in Address',
				name: 'name2',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name2',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Third Name in Address',
				name: 'name3',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name3',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Fourth Name in Address',
				name: 'name4',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name4',
						value: '={{$value}}',
					},
				},
			},
		],
	},
	// ----------------------------------------
	//               contactAddress: getMany
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
				resource: ['contactAddress'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Contact Address ID',
				name: 'contactAddressId',
				description: 'Retrieve all contact addresses with this ID',
				type: 'string',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/ContactAddress/{{$value}}',
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
		],
	},
	// ----------------------------------------
	//               contactAddress: update
	// ----------------------------------------
	{
		displayName: 'Contact Address ID',
		name: 'contactAddressId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['update'],
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
				resource: ['contactAddress'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Street',
				name: 'street',
				description: 'Street name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'street',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Zip Code',
				name: 'zip',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'zip',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'city',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'number',
				default: 0,
				hint: 'Work=43, Private=44, Empty=45, Invoice Address=47, Delivery Address=48, Pickup Address=49',
				routing: {
					send: {
						type: 'body',
						property: 'category',
						value: '={"id": {{$value}}, "objectName": "Category"} ',
					},
				},
			},
			{
				displayName: 'Name in Address',
				name: 'name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Second Name in Address',
				name: 'name2',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name2',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Third Name in Address',
				name: 'name3',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name3',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Fourth Name in Address',
				name: 'name4',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'name4',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Country ID',
				name: 'countryId',
				description: 'Unique identifier of the Country',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'country',
						value: '={"id": {{$value}}, "objectName": "StaticCountry"}',
					},
				},
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				required: true,
				description: 'Unique identifier of the Contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'contact',
						value: '={"id": {{$value}}, "objectName": "Contact"}',
					},
				},
			},
		]
	},
	// ----------------------------------------
	//               contactAddress: delete
	// ----------------------------------------
	{
		displayName: 'Contact Address ID',
		name: 'contactAddressId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['contactAddress'],
				operation: ['delete'],
			},
		},
	},
];
