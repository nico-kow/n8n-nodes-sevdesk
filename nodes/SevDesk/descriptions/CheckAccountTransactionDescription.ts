import { INodeProperties } from 'n8n-workflow';

export const checkAccountTransactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getMany',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['checkAccountTransaction'],
			},
		},
		options: [
			{
				// ----------------------------------------
				//               checkAccountTransaction: Create
				// ----------------------------------------
				name: 'Create',
				value: 'create',
				action: 'Create a check account transaction',
				routing: {
					request: {
						method: 'POST',
						url: '/CheckAccountTransaction',
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
			//               checkAccountTransaction: delete
			// ----------------------------------------
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a check account transaction',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/CheckAccountTransaction/{{$parameter.checkAccountTransactionId}}',
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
			//               checkAccountTransaction: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many check account transactions',
				routing: {
					request: {
						method: 'GET',
						url: '/CheckAccountTransaction',
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
			//               checkAccountTransaction: Update
			// ----------------------------------------
			{
				name: 'Update',
				value: 'update',
				action: 'Update a check account transaction',
				routing: {
					request: {
						method: 'PUT',
						url: '=/CheckAccountTransaction/{{$parameter.checkAccountTransactionId}}',
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

export const checkAccountTransactionFields: INodeProperties[] = [
	// ----------------------------------------
	//               checkAccountTransaction: getMany
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
				resource: ['checkAccountTransaction'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Transaction ID',
				name: 'checkAccountTransactionId',
				type: 'number',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/CheckAccountTransaction/{{$value}}',
					},
				},
			},
			{
				displayName: 'Check Account ID',
				name: 'checkAccountId',
				type: 'number',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/CheckAccountTransaction?checkAccount[id]={{$value}}&checkAccount[objectName]=CheckAccount',
					},
				},
			},
			{
				displayName: 'Is Booked',
				description: 'Whether the retrieved transactions are booked',
				name: 'isBooked',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'query',
						property: 'isBooked',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Payment Purpose',
				description: 'Only retrieve transactions with this payment purpose',
				name: 'paymtPurpose',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'paymtPurpose',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Start Date',
				description: 'Only retrieve transactions from this date on',
				name: 'startDate',
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
				displayName: 'End Date',
				description: 'Only retrieve transactions up to this date',
				name: 'endDate',
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
				displayName: 'Payee / Payer Name',
				description: 'Only retrieve transactions with this payee / payer',
				name: 'payeePayerName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'payeePayerName',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Credit Only',
				description: 'Whether retrieved transactions are credit ones',
				name: 'onlyCredit',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'query',
						property: 'onlyCredit',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Debit Only',
				description: 'Whether retrieved transactions are debit ones',
				name: 'onlyDebit',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'query',
						property: 'onlyDebit',
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
	//               checkAccountTransaction: create
	// ----------------------------------------
	{
		displayName: 'Value Date',
		name: 'valueDate',
		type: 'dateTime',
		description: 'Date the check account transaction was booked',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkAccountTransaction'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'valueDate',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccountTransaction'],
				operation: ['create'],
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
		displayName: 'Check Account ID',
		name: 'checkAccountId',
		type: 'number',
		description: 'The check account to which the transaction belongs',
		hint: 'Get the check accounts with sevDesk Node. Check Account -> Get Many',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccountTransaction'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'checkAccount',
				value: '={{ {"id": $value, "objectName": "CheckAccount" } }}',
			},
		},
	},
	{
		displayName: 'Payee / Payer Name',
		name: 'payeePayerName',
		description: 'Name of the payee/payer',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['checkAccountTransaction'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'payeePayerName',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		description: 'Status of the check account transaction. 100 &lt;-&gt; Created, 200 &lt;-&gt; Linked, 300 &lt;-&gt; Private, 400 &lt;-&gt; Booked.',
		type: 'options',
		required: true,
		default: 100,
		displayOptions: {
			show: {
				resource: ['checkAccountTransaction'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Created',
				value: 100,
			},
			{
				name: 'Linked',
				value: 200,
			},
			{
				name: 'Private',
				value: 300,
			},
			{
				name: 'Booked',
				value: 400,
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
				resource: ['checkAccountTransaction'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Entry Date',
				name: 'entryDate',
				type: 'dateTime',
				default: '',
				description:
					'Date the check account transaction was imported',
				routing: {
					send: {
						type: 'body',
						property: 'entryDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Payment Purpose',
				name: 'paymtPurpose',
				type: 'string',
				default: '',
				description: 'The purpose of the transaction',
				routing: {
					send: {
						type: 'body',
						property: 'paymtPurpose',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Enshrined',
				name: 'enshrined',
				type: 'dateTime',
				default: '',
				description: 'Defines if the transaction has been enshrined and can not be changed any more',
				hint: 'Date where the transaction is/was enshrined. Be careful using it.',
				routing: {
					send: {
						type: 'body',
						property: 'enshrined',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Source Transaction ID',
				name: 'sourceTransaction',
				type: 'number',
				default: 0,
				description: 'The check account transaction serving as the source of the rebooking',
				routing: {
					send: {
						type: 'body',
						property: 'sourceTransaction',
						value: '={{ { "id": $value, "objectName": "CheckAccountTransaction"}}',
					},
				},
			},
			{
				displayName: 'Target Transaction ID',
				name: 'targetTransaction',
				type: 'number',
				default: 0,
				description: 'The check account transaction serving as the target of the rebooking',
				routing: {
					send: {
						type: 'body',
						property: 'targetTransaction',
						value: '={{ { "id": $value, "objectName": "CheckAccountTransaction"}}',
					},
				},
			},
		],
	},
	// ----------------------------------------
	//               checkAccount: update
	// ----------------------------------------
	{
		displayName: 'ID of Check Account Transaction',
		name: 'checkAccountTransactionId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccountTransaction'],
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
				resource: ['checkAccountTransaction'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Value Date',
				name: 'valueDate',
				type: 'dateTime',
				description: 'Date the check account transaction was booked',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'valueDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'amount',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Check Account ID',
				name: 'checkAccountId',
				type: 'number',
				description: 'The check account to which the transaction belongs',
				hint: 'Get the check accounts with sevDesk Node. Check Account -> Get Many',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'checkAccount',
						value: '={{ {"id": $value, "objectName": "CheckAccount" } }}',
					},
				},
			},
			{
				displayName: 'Payee / Payer Name',
				name: 'payeePayerName',
				description: 'Name of the payee/payer',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'payeePayerName',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				description: 'Status of the check account transaction. 100 &lt;-&gt; Created, 200 &lt;-&gt; Linked, 300 &lt;-&gt; Private, 400 &lt;-&gt; Booked.',
				type: 'options',
				default: 100,
				options: [
					{
						name: 'Created',
						value: 100,
					},
					{
						name: 'Linked',
						value: 200,
					},
					{
						name: 'Private',
						value: 300,
					},
					{
						name: 'Booked',
						value: 400,
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
				displayName: 'Entry Date',
				name: 'entryDate',
				type: 'dateTime',
				default: '',
				description:
					'Date the check account transaction was imported',
				routing: {
					send: {
						type: 'body',
						property: 'entryDate',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Payment Purpose',
				name: 'paymtPurpose',
				type: 'string',
				default: '',
				description: 'The purpose of the transaction',
				routing: {
					send: {
						type: 'body',
						property: 'paymtPurpose',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Enshrined',
				name: 'enshrined',
				type: 'dateTime',
				default: '',
				description: 'Defines if the transaction has been enshrined and can not be changed any more',
				hint: 'Date where the transaction is/was enshrined. Be careful using it.',
				routing: {
					send: {
						type: 'body',
						property: 'enshrined',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Source Transaction ID',
				name: 'sourceTransaction',
				type: 'number',
				default: 0,
				description: 'The check account transaction serving as the source of the rebooking',
				routing: {
					send: {
						type: 'body',
						property: 'sourceTransaction',
						value: '={{ { "id": $value, "objectName": "CheckAccountTransaction"}}',
					},
				},
			},
			{
				displayName: 'Target Transaction ID',
				name: 'targetTransaction',
				type: 'number',
				default: 0,
				description: 'The check account transaction serving as the target of the rebooking',
				routing: {
					send: {
						type: 'body',
						property: 'targetTransaction',
						value: '={{ { "id": $value, "objectName": "CheckAccountTransaction"}}',
					},
				},
			},
		],
	},
	// ----------------------------------------
	//               checkAccount: delete
	// ----------------------------------------
	{
		displayName: 'ID of Check Account Transaction',
		name: 'checkAccountTransactionId',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['checkAccountTransaction'],
				operation: ['delete'],
			},
		},
	},
];
