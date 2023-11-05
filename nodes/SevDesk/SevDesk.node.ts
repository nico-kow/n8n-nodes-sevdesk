import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	accountingContactFields,
	accountingContactOperations,
	categoryFields,
	categoryOperations,
	communicationWayFields,
	communicationWayOperations,
	contactFields,
	contactOperations,
	countryFields,
	countryOperations,
	partFields,
	partOperations,
	unityFields,
	unityOperations,
} from './descriptions';
import { contactAddressFields, contactAddressOperations } from './descriptions/ContactAddressDescription';

export class SevDesk implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'sevDesk',
		name: 'sevDesk',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the sevDesk API',
		icon: 'file:sevDesk.svg',
		defaults: {
			name: 'sevDesk',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'sevDeskApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://my.sevdesk.de/api/v1/',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				default: 'contact',
				options: [
					{
						name: 'AccountingContact',
						value: 'accountingContact',
					},
					{
						name: 'Category',
						value: 'category',
					},
					/*{
						name: 'CheckAccount',
						value: 'checkAccount',
					},*/
					/*{
						name: 'CheckAccountTransaction',
						value: 'checkAccountTransaction',
					},*/
					{
						name: 'CommunicationWay',
						value: 'communicationWay',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'ContactAddress',
						value: 'contactAddress',
					},
					{
						name: 'Country',
						value: 'country',
					},
					/*{
						name: 'Invoice',
						value: 'invoice',
					},*/
					/*{
						name: 'Order',
						value: 'order',
					},*/
					/*{
						name: 'OrderPo',
						value: 'orderPo',
					},*/
					{
						name: 'Part',
						value: 'part',
					},
					{
						name: 'Unit',
						value: 'unity',
					}
					/*{
						name: 'Voucher',
						value: 'voucher',
					},*/
					/*{
						name: 'VoucherPo',
						value: 'voucherPo',
					},*/
				],
			},
			...contactOperations,
			...contactFields,
			...countryOperations,
			...countryFields,
			...categoryOperations,
			...categoryFields,
			...contactAddressOperations,
			...contactAddressFields,
			...communicationWayOperations,
			...communicationWayFields,
			...accountingContactOperations,
			...accountingContactFields,
			...unityOperations,
			...unityFields,
			...partOperations,
			...partFields
		],
	};
}
