import { INodeProperties } from 'n8n-workflow';

export const categoryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['category'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Gets many categories',
				description: 'Gets many categories',
				routing: {
					request: {
						method: 'GET',
						url: '/Category',
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
				name: 'Get by ObjectType',
				value: 'getByObjectType',
				action: 'Gets many categories filtered by object type',
				description: 'Gets many categories filtered by object type',
				routing: {
					request: {
						method: 'GET',
						url: '=/Category?objectType={{$parameter.objectType}}',
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
			}
		]
	}
]


export const categoryFields: INodeProperties[] = [
	// ----------------------------------------
	//               contact: getByObjectType
	// ----------------------------------------
	{
		displayName: 'ObjectType',
		name: 'objectType',
		description: 'Specific ObjectType',
		type: 'options',
		required: true,
		default: 'contactAddress',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['getByObjectType'],
			},
		},
		options: [
			{
				name: 'Contact Address',
				value: 'contactAddress',
			},
		],
	},
]
