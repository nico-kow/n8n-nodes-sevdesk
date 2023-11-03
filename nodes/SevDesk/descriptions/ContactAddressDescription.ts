import { INodeProperties } from 'n8n-workflow';

export const contactAddressOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'contactAddress',
				],
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
		],
		default: 'create',
	},
]


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
]
