import { INodeProperties } from 'n8n-workflow';

export const unityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['unity'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Gets many unities',
				description: 'Gets many unities',
				routing: {
					request: {
						method: 'GET',
						url: '/Unity?limit=500',
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
	},
]


export const unityFields: INodeProperties[] = []
