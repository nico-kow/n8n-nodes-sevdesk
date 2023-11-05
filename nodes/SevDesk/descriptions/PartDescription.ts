import { INodeProperties } from 'n8n-workflow';

export const partOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['part'],
			},
		},
		options: [
			// ----------------------------------------
			//               country: part
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getAll',
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
			//               country: create
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
		]
	},
]


export const partFields: INodeProperties[] = [
	// ----------------------------------------
	//               contactAddress: create
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
		default: 0,
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
		default: 0,
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
		default: 0,
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
]
