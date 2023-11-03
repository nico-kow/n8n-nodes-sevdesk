import { INodeProperties } from 'n8n-workflow';

export const countryOperations: INodeProperties[] = []


export const countryFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getAll',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['country'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Gets many countries',
				description: 'Gets many countries',
				routing: {
					request: {
						method: 'GET',
						url: '/StaticCountry?limit=500',
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
