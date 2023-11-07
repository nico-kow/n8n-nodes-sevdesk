import { INodeProperties } from 'n8n-workflow';

export const partOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getMany',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['part'],
			},
		},
		options: [
			// ----------------------------------------
			//               part: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Gets many parts',
				description: 'Gets many parts',
				routing: {
					request: {
						method: 'GET',
						url: '/Part',
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
			//               part: getStock
			// ----------------------------------------
			{
				name: 'Get Current Stock for Part',
				value: 'getStock',
				action: 'Returns the current stock amount of the given part',
				routing: {
					request: {
						method: 'GET',
						url: '=/Part/{{$parameter.partId}}/getStock',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									partId: '={{$parameter.partId}}',
									currentStock: '={{$responseItem.objects}}',
								},
							},
						],
					},
				},
			},
			// ----------------------------------------
			//               part: create
			// ----------------------------------------
			{
				name: 'Create',
				value: 'create',
				action: 'Create a part',
				routing: {
					request: {
						method: 'POST',
						url: '/Part',
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
			//               part: update
			// ----------------------------------------
			{
				name: 'Update',
				value: 'update',
				action: 'Update a part',
				routing: {
					request: {
						method: 'PUT',
						url: '=/Part/{{$parameter.partId}}',
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

export const partFields: INodeProperties[] = [
	// ----------------------------------------
	//               part: getMany
	// ----------------------------------------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Field',
		description: 'There are a multitude of parameter which can be used to filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['part'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Part ID',
				name: 'partId',
				description: 'ID of part to return',
				type: 'number',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/Part/{{$value}}',
					},
				},
			},
			{
				displayName: 'Part Number',
				name: 'partNumber',
				description: 'Retrieve all parts with this part number',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'partNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Part Name',
				name: 'partName',
				description: 'Retrieve all parts with this name',
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
	//               part: getStock
	// ----------------------------------------
	{
		displayName: 'Part ID',
		name: 'partId',
		type: 'number',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['part'],
				operation: ['getStock'],
			},
		},
	},
	// ----------------------------------------
	//               part: create
	// ----------------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['part'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Part Number',
		name: 'partNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['part'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'partNumber',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Stock',
		name: 'stock',
		type: 'number',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['part'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'stock',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Unit ID',
		name: 'unityId',
		hint: 'You can get the units with the sevDesk Node: Unit -> Get Many',
		type: 'number',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['part'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'unity',
				value: '={"id": {{$value}}, "objectName": "Unity"}',
			},
		},
	},
	{
		displayName: 'Tax Rate',
		name: 'taxRate',
		type: 'number',
		description: 'Tax Rate in %',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['part'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'taxRate',
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
				resource: ['part'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Category ID',
				name: 'categoryId',
				hint: 'You can get the Categories with the sevDesk Node: Categories -> Get Many; Filter: objectType=Part',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'category',
						value: '={"id": {{$value}}, "objectName": "Category"}',
					},
				},
			},
			{
				displayName: 'Internal Comment',
				name: 'internalComment',
				description: 'An internal comment for the part. Does not appear on invoices and orders.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'internalComment',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Price',
				name: 'price',
				description: 'Price for which the part is sold',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'price',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Purchase Price',
				name: 'pricePurchase',
				description: 'Purchase price of the part',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'pricePurchase',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Gross Price',
				name: 'priceGross',
				description: 'Gross price for which the part is sold',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'priceGross',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Net Price',
				name: 'priceNet',
				description: 'Net price for which the part is sold',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'priceNet',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				description: 'Status of the part. 50 &lt;-&gt; Inactive - 100 &lt;-&gt; Active.',
				type: 'options',
				default: 100,
				options: [
					{
						name: 'Inactive (50)',
						value: 50,
					},
					{
						name: 'Active (100)',
						value: 100,
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'status',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Stock Enabled',
				name: 'stockEnabled',
				description: 'Whether the stock should be enabled',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'stockEnabled',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Text',
				name: 'text',
				description: 'A text describing the part',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'text',
						value: '={{$value}}',
					},
				},
			},
		],
	},
	// ----------------------------------------
	//               part: update
	// ----------------------------------------
	{
		displayName: 'Part ID',
		name: 'partId',
		type: 'number',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['part'],
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
				resource: ['part'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
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
				displayName: 'Part Number',
				name: 'partNumber',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'partNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Stock',
				name: 'stock',
				type: 'number',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'stock',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Unit ID',
				name: 'unityId',
				hint: 'You can get the units with the sevDesk Node: Unit -> Get Many',
				type: 'number',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'unity',
						value: '={"id": {{$value}}, "objectName": "Unity"}',
					},
				},
			},
			{
				displayName: 'Tax Rate',
				name: 'taxRate',
				type: 'number',
				description: 'Tax Rate in %',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'taxRate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				hint: 'You can get the Categories with the sevDesk Node: Categories -> Get Many; Filter: objectType=Part',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'category',
						value: '={"id": {{$value}}, "objectName": "Category"}',
					},
				},
			},
			{
				displayName: 'Internal Comment',
				name: 'internalComment',
				description: 'An internal comment for the part. Does not appear on invoices and orders.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'internalComment',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Price',
				name: 'price',
				description: 'Price for which the part is sold',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'price',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Purchase Price',
				name: 'pricePurchase',
				description: 'Purchase price of the part',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'pricePurchase',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Gross Price',
				name: 'priceGross',
				description: 'Gross price for which the part is sold',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'priceGross',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Net Price',
				name: 'priceNet',
				description: 'Net price for which the part is sold',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'priceNet',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				description: 'Status of the part. 50 &lt;-&gt; Inactive - 100 &lt;-&gt; Active.',
				type: 'options',
				default: 100,
				options: [
					{
						name: 'Inactive (50)',
						value: 50,
					},
					{
						name: 'Active (100)',
						value: 100,
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'status',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Stock Enabled',
				name: 'stockEnabled',
				description: 'Whether the stock should be enabled',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'stockEnabled',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Text',
				name: 'text',
				description: 'A text describing the part',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'text',
						value: '={{$value}}',
					},
				},
			},
		],
	},
];
