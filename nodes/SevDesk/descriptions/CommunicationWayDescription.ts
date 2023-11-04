import { INodeProperties } from 'n8n-workflow';

export const communicationWayOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getMany',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['communicationWay'],
			},
		},
		options: [

			// ----------------------------------------
			//               communicationWay: create
			// ----------------------------------------
			{
				name: 'Create',
				value: 'create',
				action: 'Create a communication way',
				routing: {
					request: {
						method: 'POST',
						url: '/CommunicationWay',
						body: {
							key: {
								objectName: 'CommunicationWayKey',
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
			//               communicationWay: getMany
			// ----------------------------------------
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Gets many communication ways',
				routing: {
					request: {
						method: 'GET',
						url: '/CommunicationWay',
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
			//               communicationWay: update
			// ----------------------------------------
			{
				name: 'Update',
				value: 'update',
				action: 'Update a communication way',
				routing: {
					request: {
						method: 'PUT',
						url: '=/CommunicationWay/{{$parameter.communicationWayId}}',
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
			//               communicationWay: delete
			// ----------------------------------------
			{
				name: 'Delete',
				value: 'delete',
				action: 'Deletes a communication way',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/CommunicationWay/{{$parameter.communicationWayId}}',
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


export const communicationWayFields: INodeProperties[] = [
	// ----------------------------------------
	//               communicationWay: create
	// ----------------------------------------
	{
		displayName: 'Communication Way Key ID',
		name: 'keyId',
		required: true,
		description: 'Unique identifier of the Communication Way Key. Similar to the category of addresses.',
		type: 'number',
		default: 0,
		hint: 'Private=1, Work=2, Fax=3, Mobile=4, Empty=5, Autobox=6, Newsletter=7, Invoice Address=8',
		displayOptions: {
			show: {
				resource: ['communicationWay'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'key.id',
				propertyInDotNotation: true,
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Communication Way Type',
		name: 'type',
		required: true,
		description: 'Type of the communication way',
		type: 'options',
		default: 'EMAIL',
		displayOptions: {
			show: {
				resource: ['communicationWay'],
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
				name: 'Email',
				value: 'EMAIL'
			},
			{
				name: 'Phone',
				value: 'PHONE'
			},
			{
				name: 'Web',
				value: 'WEB'
			},
			{
				name: 'Mobile',
				value: 'MOBILE'
			},
		]
	},
	{
		displayName: 'Value',
		name: 'value',
		required: true,
		description: 'The value of the communication way. For example the phone number, e-mail address or website.',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['communicationWay'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'value',
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
				resource: ['communicationWay'],
				operation: ['create'],
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
				displayName: 'Main',
				name: 'main',
				description: 'Whether the communication way is the main communication way for the contact',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'main',
						value: '={{$value}}',
					},
				},
			},
		]
	},
	// ----------------------------------------
	//               communicationWay: getMany
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
				resource: ['communicationWay'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Communication Way ID',
				name: 'communicationWayId',
				description: 'Retrieve all communication ways with this ID',
				type: 'number',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/CommunicationWay/{{$value}}',
					},
				},
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				description: 'Retrieve all communication Ways with this contact ID',
				type: 'number',
				default: '',
				routing: {
					request: {
						method: 'GET',
						url: '=/CommunicationWay?contact[id]={{$value}}&contact[objectName]=Contact',
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				description: 'Retrieve all communication ways with this type',
				type: 'options',
				default: 'EMAIL',
				routing: {
					send: {
						type: 'query',
						property: 'type',
						value: '?{{$value}}',
					}
				},
				options: [
					{
						name: 'Email',
						value: 'EMAIL'
					},
					{
						name: 'Phone',
						value: 'PHONE'
					},
					{
						name: 'Web',
						value: 'WEB'
					},
					{
						name: 'Mobile',
						value: 'MOBILE'
					},
				]
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
	//               communicationWay: update
	// ----------------------------------------
	{
		displayName: 'Communication Way ID',
		name: 'communicationWayId',
		required: true,
		description: 'Unique identifier of the Communication Way',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['communicationWay'],
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
				resource: ['communicationWay'],
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
				displayName: 'Main',
				name: 'main',
				description: 'Whether the communication way is the main communication way for the contact',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'body',
						property: 'main',
						value: '={{$value}}',
					},
				},
			},
			{
				displayName: 'Communication Way Key ID',
				name: 'keyId',
				description: 'Unique identifier of the Communication Way Key. Similar to the category of addresses.',
				type: 'number',
				default: 0,
				hint: 'Private=1, Work=2, Fax=3, Mobile=4, Empty=5, Autobox=6, Newsletter=7, Invoice Address=8',
				routing: {
					send: {
						type: 'body',
						property: 'key',
						value: '={"id": {{$value}}, "objectName": "CommunicationWayKey"',
					},
				},
			},
			{
				displayName: 'Communication Way Type',
				name: 'type',
				description: 'Type of the communication way',
				type: 'options',
				default: 'EMAIL',
				routing: {
					send: {
						type: 'body',
						property: 'type',
						value: '={{$value}}',
					},
				},
				options: [
					{
						name: 'Email',
						value: 'EMAIL'
					},
					{
						name: 'Phone',
						value: 'PHONE'
					},
					{
						name: 'Web',
						value: 'WEB'
					},
					{
						name: 'Mobile',
						value: 'MOBILE'
					},
				]
			},
			{
				displayName: 'Value',
				name: 'value',
				description: 'The value of the communication way. For example the phone number, e-mail address or website.',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'value',
						value: '={{$value}}',
					},
				},
			},
		]
	},
	// ----------------------------------------
	//               communicationWay: delete
	// ----------------------------------------
	{
		displayName: 'Communication Way ID',
		name: 'communicationWayId',
		required: true,
		description: 'Unique identifier of the Communication Way',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['communicationWay'],
				operation: ['delete'],
			},
		},
	},
]
