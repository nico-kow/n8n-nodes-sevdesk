import { INodeProperties } from 'n8n-workflow';

export const accountingContactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getMany',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['accountingContact'],
			},
		},
		options: [

			// ----------------------------------------
			//               accountingContact: create
			// ----------------------------------------
			{
				name: 'Create',
				value: 'create',
				action: 'Create an accounting contact',
				routing: {
					request: {
						method: 'POST',
						url: '/AccountingContact',
						body: {
							contact: {
								objectName: 'Contact',
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
			//               accountingContact: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many accounting contacts',
				routing: {
					request: {
						method: 'GET',
						url: '/AccountingContact',
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
			//               accountingContact: update
			// ----------------------------------------
			{
				name: 'Update',
				value: 'update',
				action: 'Update an accounting contacts',
				routing: {
					request: {
						method: 'PUT',
						url: '=/AccountingContact/{{$parameter.accountingContactId}}',
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
			//               accountingContact: delete
			// ----------------------------------------
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an accounting contact',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/AccountingContact/{{$parameter.accountingContactId}}',
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
		]
	},
]


export const accountingContactFields: INodeProperties[] = [
	// ----------------------------------------
	//               accountingContact: create
	// ----------------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		required: true,
		description: 'The contact to which this accounting contact belongs',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['accountingContact'],
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['accountingContact'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Debitor Number',
				name: 'debitorNumber',
				description: 'Debitor number of the accounting contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'debitorNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Creditor Number',
				name: 'creditorNumber',
				description: 'Creditor number of the accounting contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'creditorNumber',
						value: '={{$value}}',
					},
				},
			},
		]
	},
	// ----------------------------------------
	//               accountingContact: getMany
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
				resource: ['accountingContact'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Accounting Contact ID',
				name: 'accountingContactId',
				description: 'Retrieve all accounting contacts with this ID',
				type: 'number',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/AccountingContact/{{$value}}',
					},
				},
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				description: 'Retrieve all accounting contacts with this contact ID',
				type: 'number',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/AccountingContact?contact[id]={{$value}}&contact[objectName]=Contact',
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
	//               accountingContact: update
	// ----------------------------------------
	{
		displayName: 'Accounting Contact ID',
		name: 'accountingContactId',
		hint: 'Attention, updating an existing AccountingContact can lead to booking errors, especially in the DATEV export. Compatibility of sevDesk with DATEV is no longer guaranteed.',
		required: true,
		description: 'Unique identifier of the Accounting Contact',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['accountingContact'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Fields to Update',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['accountingContact'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Contact ID',
				name: 'contactId',
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
			{
				displayName: 'Debitor Number',
				name: 'debitorNumber',
				description: 'Debitor number of the accounting contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'debitorNumber',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Creditor Number',
				name: 'creditorNumber',
				description: 'Creditor number of the accounting contact',
				type: 'number',
				default: 0,
				routing: {
					send: {
						type: 'body',
						property: 'creditorNumber',
						value: '={{$value}}',
					},
				},
			},
		]
	},
	// ----------------------------------------
	//               accountingContact: delete
	// ----------------------------------------
	{
		displayName: 'Accounting Contact ID',
		name: 'accountingContactId',
		hint: 'Attention, deleting an existing AccountingContact can lead to booking errors, especially in the DATEV export. Compatibility of sevDesk with DATEV is no longer guaranteed.',
		required: true,
		description: 'Unique identifier of the Accounting Contact',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['accountingContact'],
				operation: ['delete'],
			},
		},
	},
]
