import { INodeProperties } from 'n8n-workflow';

export const checkAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getMany',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['checkAccount'],
			},
		},
		options: [
			{
				// ----------------------------------------
				//               checkAccount: Create
				// ----------------------------------------
				name: 'Create',
				value: 'create',
				action: 'Create a check account',
				routing: {
					request: {
						method: 'POST',
						url: '/CheckAccount',
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
			//               checkAccount: delete
			// ----------------------------------------
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a check account',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/CheckAccount/{{$parameter.checkAccountId}}',
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
			// ----------------------------------------
			//               checkAccount: getBalanceAtDate
			// ----------------------------------------
			{
				name: 'Get Balance at Date',
				value: 'getBalanceAtDate',
				action: 'Get balance at given date',
				routing: {
					request: {
						method: 'GET',
						url: '=/CheckAccount/{{$parameter.checkAccountId}}/getBalanceAtDate',
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									balance: '={{$responseItem.objects}}',
								},
							},
						],
					},
				},
			},
			// ----------------------------------------
			//               checkAccount: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many check accounts',
				routing: {
					request: {
						method: 'GET',
						url: '/CheckAccount',
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
			//               checkAccount: Update
			// ----------------------------------------
			{
				name: 'Update',
				value: 'update',
				action: 'Update a check account',
				routing: {
					request: {
						method: 'PUT',
						url: '=/CheckAccount/{{$parameter.checkAccountId}}',
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

export const checkAccountFields: INodeProperties[] = [
	// ----------------------------------------
	//               checkAccount: getMany
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
				resource: ['checkAccount'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'ID of Check Account',
				name: 'checkAccountId',
				type: 'number',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/CheckAccount/{{$value}}',
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
	//               checkAccount: getBalanceAtDate
	// ----------------------------------------
	{
		displayName: 'ID of Check Account',
		name: 'checkAccountId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccount'],
				operation: ['getBalanceAtDate'],
			},
		},
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccount'],
				operation: ['getBalanceAtDate'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'date',
				value: '={{$value}}',
			},
		},
	},
	// ----------------------------------------
	//               checkAccount: create
	// ----------------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkAccount'],
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
		displayName: 'Type',
		name: 'type',
		description:
			'The type of the check account. Account with a CSV or MT940 import are regarded as online. Apart from that, created check accounts over the API need to be offline, as online accounts with an active connection to a bank application can not be managed over the API.',
		type: 'options',
		default: 'online',
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccount'],
				operation: ['create'],
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
				name: 'Online',
				value: 'online',
			},
			{
				name: 'Offline',
				value: 'offline',
			},
		],
	},
	{
		displayName: 'Currency',
		name: 'currency',
		description: 'The currency of the check account',
		type: 'string',
		required: true,
		default: 'EUR',
		displayOptions: {
			show: {
				resource: ['checkAccount'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'currency',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		description: 'Status of the check account. 0 &lt;-&gt; Archived - 100 &lt;-&gt; Active.',
		type: 'options',
		required: true,
		default: 100,
		displayOptions: {
			show: {
				resource: ['checkAccount'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Archived',
				value: 0,
			},
			{
				name: 'Active',
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['checkAccount'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Import Type',
				name: 'importType',
				type: 'options',
				default: 'CSV',
				description:
					'Import type. Transactions can be imported by this method on the check account. Either "CSV" or "MT940".',
				options: [
					{
						name: 'CSV',
						value: 'CSV',
					},
					{
						name: 'MT940',
						value: 'MT940',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'importType',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Default Account',
				name: 'defaultAccount',
				type: 'boolean',
				default: false,
				description: 'Whether this check account is the default account',
				routing: {
					send: {
						type: 'body',
						property: 'defaultAccount',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Auto Map Transactions',
				name: 'autoMapTransactions',
				type: 'boolean',
				default: true,
				description:
					'Whether transactions on this account are automatically mapped to invoice and vouchers when imported if possible',
				routing: {
					send: {
						type: 'body',
						property: 'autoMapTransactions',
						value: '={{$value}}',
					},
				},
			},
		],
	},
	// ----------------------------------------
	//               checkAccount: update
	// ----------------------------------------
	{
		displayName: 'ID of Check Account',
		name: 'checkAccountId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccount'],
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
				resource: ['checkAccount'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Import Type',
				name: 'importType',
				type: 'options',
				default: 'CSV',
				description:
					'Import type. Transactions can be imported by this method on the check account. Either "CSV" or "MT940".',
				options: [
					{
						name: 'CSV',
						value: 'CSV',
					},
					{
						name: 'MT940',
						value: 'MT940',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'importType',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Default Account',
				name: 'defaultAccount',
				type: 'boolean',
				default: false,
				description: 'Whether this check account is the default account',
				routing: {
					send: {
						type: 'body',
						property: 'defaultAccount',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Auto Map Transactions',
				name: 'autoMapTransactions',
				type: 'boolean',
				default: true,
				description:
					'Whether transactions on this account are automatically mapped to invoice and vouchers when imported if possible',
				routing: {
					send: {
						type: 'body',
						property: 'autoMapTransactions',
						value: '={{$value}}',
					},
				},
			},
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
				displayName: 'Type',
				name: 'type',
				description:
					'The type of the check account. Account with a CSV or MT940 import are regarded as online. Apart from that, created check accounts over the API need to be offline, as online accounts with an active connection to a bank application can not be managed over the API.',
				type: 'options',
				default: 'online',

				routing: {
					send: {
						type: 'body',
						property: 'type',
						value: '={{$value}}',
					},
				},
				options: [
					{
						name: 'Online',
						value: 'online',
					},
					{
						name: 'Offline',
						value: 'offline',
					},
				],
			},
			{
				displayName: 'Currency',
				name: 'currency',
				description: 'The currency of the check account',
				type: 'string',
				default: 'EUR',
				routing: {
					send: {
						type: 'body',
						property: 'currency',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				description: 'Status of the check account. 0 &lt;-&gt; Archived - 100 &lt;-&gt; Active.',
				type: 'options',
				default: 100,
				options: [
					{
						name: 'Archived',
						value: 0,
					},
					{
						name: 'Active',
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
		],
	},
	// ----------------------------------------
	//               checkAccount: delete
	// ----------------------------------------
	{
		displayName: 'ID of Check Account',
		name: 'checkAccountId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccount'],
				operation: ['delete'],
			},
		},
	},
];
