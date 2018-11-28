/*************USER INFORMATION***************** */
export class Address {
	userId: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}

export class Phone {
	userId: string;
	phoneNumber: string;
	primaryNumber: boolean;
}

export class Role {
	id: string;
	label: string;
	rank: string;
	canEdit: boolean;
	canAdd: boolean;
	canDelete: boolean;
	canViewUserData: boolean;
	canEmail: boolean;
}

export class SecurityQuestion {
	userId: string;
	securityQuestion: string;
	securityAnswer: string;
}

export class UserEmail {
	emailAddress: string;
	userId: string;
}

export class User {
	id?: string;
	roleId?: string;
	userName: string;
	firstName?: string;
	lastName?: string;
	password: string;
	userAccountEnabled?: boolean;
	userAccountUnlocked?: boolean;
	role?: string;
	lastPasswordResetDate?: string;
	email: string;
	creationTime?: string;
	modificationTime?: string;
	_links?: {
		self: {
			href: string
		},
		user: {
			href: string
		}
	};
}

export class MicrosoftUser {
	businessPhones?: {};
	displayName: string;
	givenName: string;
	id: string;
	jobTitle: string;
	mail: string;
	mobilePhone: string;
	officeLocation: string;
	preferredLanguage: string;
	surname: string;
	userPrincipalName: string;
}

export class EmailDocument {
	body: {
		contentType: string;
		content: string;
	};
	createdDatetime: Date;
	hasAttachments: boolean;
	from: {
		emailAddress: {
			address: string;
			name: string;
		}
	};
	id: string;
	lastModifiedDateTime: Date;
	receivedDatetime: Date;
	sender: {
		emailAddress: {
			address: string;
			name: string;
		}
	};
	sentDateTime: Date;
	subject: string;
}

export class Reminder {
	id: string;
	userId: string;
	userEmail: string;
	leadId: string;
	reminderTitle: string;
	reminderDetails: string;
	reminderDate: Date;
	reminderSent: boolean;
}

/**************LEAD INFORMATION****************** */
export class Policy {
	id: string;
	userId: string;
	leadId: string;
	customerId: string;
	insurerId: string;
	policyNumber: string;
	policyName: string;
	effectiveDate: string;
	expirationDate: string;
	deleted: boolean;
}

export class PolicyResponse {
	id: string;
	userId: string;
	leadId: string;
	customerId: string;
	insurerId: string;
	policyNumber: string;
	effectiveDate: string;
	expirationDate: string;
}
export class Email {
	emailAddress: string;
	customerId: string;
	leadId: string;
}

export class Customer {
	id: string;
	firstName?: string;
	lastName?: string;
	otherName?: string;
	phone1: string;
	phone1TypeId: string;
	phone2: string;
	phone2TypeId: string;
	phone3: string;
	phone3TypeId: string;
	phone4: string;
	phone4TypeId: string;
	bestTimeToContact?: string;
	street?: string;
	city?: string;
	stateId?: string;
	zip?: string;
	mailingStreet: string;
	mailingCity: string;
	mailingStateId: string;
	mailingZip: string;
	country?: string;
	possibleDuplicate?: boolean;
	lastLeadAddedDate?: Date;
	birthDate?: Date;
	creationTime?: Date;
	modifiedBy?: string;
	modificationTime?: string;
	duplicateCustomerId?: string;
}

export class CustomerEmail {
	id: string;
	emailAddress: string;
	customerId: string;
	createdBy: string;
	creationTime: Date;
}

export class InsuranceLead {
	// Customer data
	firstName: string;
	lastName: string;
	emailAddress: string;
	birthDate: string;
	bestTimeToContact: string;
	customerId: string;

	phone1: string;
	phone1TypeId: string;
	phone2: string;
	phone2TypeId: string;
	phone3: string;
	phone3TypeId: string;
	phone4: string;
	phone4TypeId: string;

	customerCity: string;
	customerStateId: string;
	customerStreet: string;
	customerZip: string;
	customerCountry: string;

	mailingStreet: string;
	mailingCity: string;
	mailingStateId: string;
	mailingZip: string;

	policyId: string;
	// User data
	userId: string;
	salesAgent: string;

	// lead data
	id: string;
	modificationTime: Date;
	creationTime: Date;
	deadLeadReasonId: string;
	yearHomeManufactured: string;
	stateId: string;
	leadStatusId: string;
	leadSourceId: string;
	lastContactDate: Date;
	homeTypeId: string;
	sidingTypeId: string;
	roofTypeId: string;
	zipCode: string;
	countyName: string;
	length: string;
	width: string;
	sqFeet: string;
	fullySkirted: boolean;
	tiedDown: boolean;
	communityPark: boolean;
	moreThanTwentyFiveSpacesInPark: boolean;
	withinIncorporatedCityLimits: boolean;
	// coverage selections
	estPolicyStartDate: Date;
	estHomeValue: string;
	estHomeContentsValue: string;
	insurePersonalItems: boolean;
	referralId: string;
	note: string;
	deleted: boolean;
	estClosingDate: Date;
	estClosingValue: String;
	coApplicantFirstName: String;
	coApplicantLastName: String;
	coApplicantDateOfBirth: String;
	purchaseAmount: String;
	purchaseDate: Date;
	make: String;
	model: String;
	serialNumber: String;
	animalsPresent: Boolean;
	poolOrTrampoline: Boolean;
	woodStoveOrFireplace: Boolean;
	attachedStructuresPresent: Boolean;
	homeFinanced: Boolean;
	limits: String;
	prevInsuranceCompanyName: String;
	prevPolicyExpirationDate: Date;
	anyClaimsPrevFiveYears: Boolean;
}

export class UnfilteredInsuranceLead {
	id: string;
	userId: string;
	customerId: string;
	leadSourceId: string;
	leadStatusId: string;
	policyId: string;
	policyActive: boolean;
	emailAddressId: string;
	deadLeadReasonId: string;
	dead: boolean;
	yearHomeManufactured: string;
	stateId: string;
	lastContactDate: string;
	homeTypeId: string;
	roofTypeId: string;
	sidingTypeId: string;
	zipCode: string;
	countyName: string;
	length: string;
	width: string;
	sqFeet: string;
	homeUse: string;
	fullySkirted: boolean;
	tiedDown: boolean;
	moreThanTwentyFiveSpacesInPark: boolean;
	withinIncorporatedCityLimits: boolean;
	communityPark: boolean;
	estHomeContentsValue: string;
	estHomeValue: string;
	estPolicyStartDate: Date;
	insurePersonalItems: boolean;
	referralId: string;
	note: string;
	creationTime: Date;
	modificationTime: Date;
	deleted: boolean;
	estClosingDate: Date;
	estClosingValue: String;
	coApplicantFirstName: String;
	coApplicantLastName: String;
	coApplicantDateOfBirth: String;
	purchaseAmount: String;
	purchaseDate: Date;
	make: String;
	model: String;
	serialNumber: String;
	animalsPresent: Boolean;
	poolOrTrampoline: Boolean;
	woodStoveOrFireplace: Boolean;
	attachedStructuresPresent: Boolean;
	homeFinanced: Boolean;
	limits: String;
	prevInsuranceCompanyName: String;
	prevPolicyExpirationDate: Date;
	anyClaimsPrevFiveYears: Boolean;
}

export class ManagerNote {
	userId: string;
	leadId: string;
	data: string;
	readDate: string;
	deleted: boolean;
}

export class Note {
	id: string;
	userId: string;
	leadId: string;
	noteTitle: string;
	data: string;
	creationTime: string;
	deleted: boolean;
}

export class EmailLog {
	id: string;
	userId: string;
	leadId: string;
	toRecipient: string;
	fromRecipient: string;
	subject: string;
	content: string;
	sentDate: Date;
}

export class EmailAttachment {
	id: string;
	contentBytes: string;
	contentType: string;
	lastModifiedDateTime: Date;
	name: string;
	size: number;
}

export class FileStoreDocument {
	contentType: string;
	creationTime: Date;
	deleted: boolean;
	fileUri: string;
	modificationTime: Date;
	dateTimeLastModified: Date;
	fileName: string;
	fileSize: number;
	policyId: string;
	customerId: string;
	insuranceLeadId: string;
	id: string;
}

export class FileDoc {
	id: string;
	contentBytes: string;
	contentType: string;
	creationTime: Date;
	customerId: string;
	dateTimeLastModified: string;
	insuranceLeadId: string;
	modificationtime: Date;
	name: string;
	policyId?: string;
	size: number;
}

/************* INSURANCE REFERENCE DATA********************** */
export class Insurer {
	id: string;
	label: string;
	deleted: boolean;
}

export class HomeType {
	id: string;
	label: string;
	deleted: boolean;
}

export class LeadSource {
	id: string;
	label: string;
	website: string;
	deleted: boolean;
}

export class LeadStatus {
	id: string;
	label: string;
	rank: string;
	isDefault: boolean;
	isSelectable: boolean;
	isPermanent: boolean;
	deleted: boolean;
}

export class Referral {
	id: string;
	label: string;
	deleted: boolean;
}

export class RoofType {
	id: string;
	label: string;
	deleted: boolean;
}

export class SidingType {
	id: string;
	label: string;
	deleted: boolean;
}

export class PhoneType {
	id: string;
	label: string;
	deleted: boolean;
}

export class Zone {
	id: string;
	label: string;
	deleted: boolean;
}



/************* CRM REFERENCE DATA**************************** */
export class Bedroom {
	id: string;
	label: string;
	isDeleted: boolean;
}

export class CustomGroupHasLocation {
	id: string;
	locationId: string;
	assistPercentage: string;
	rewardPercentage: string;
	reportDays: number;
}

export class CustomGroup {
	id: string;
	label: string;
	code: string;
	rank: number;
}

export class DeadLeadReason {
	id: string;
	label: string;
	deleted: boolean;
}

export class DefaultEmailSettings {
	id: string;
	smtpHost: string;
	smtpPort: string;
	smtpEncryption: string;
	imapHost: string;
	imapPort: string;
	imapEncryption: string;
	imapSentMailbox: string;
	reportEmails: string;
}

export class EmailTemplate {
	id: string;
	leadSourceId: string;
	website: string;
	label: string;
	from: string;
	subject: string;
	content: string;
	isDeleted: boolean;
}

export class Floorplan {
	id: string;
	label: string;
	isDeleted: boolean;
}

export class HomeUse {
	id: string;
	label: string;
}

export class Location {
	id: string;
	label: string;
	deleted: boolean;
}

export class State {
	id: string;
	label: string;
	code: string;
	zoneId: string;
	isDisabled: boolean;
	deleted: boolean;
}

export class TodayActivity {
	id: string;
	code: string;
	label: string;
	requireDate: string;
	allowQuantity: string;
	action: string;
	notify: string;
	rank: number;
	isDisabled: boolean;
	deleted: boolean;
}

export class TodayActivityGroup {
	id: string;
	label: string;
	rank: number;
	deleted: boolean;
}

export class TodayActivityGroupHasLocation {
	id: string;
	locationId: string;
	assistPercentage: string;
	rewardPercentage: string;
	goal: number;
}

export class TodayLeadActivity {
	id: string;
	todayActivityId: string;
	leadId: string;
	userId: string;
	todayDate: string;
	eventDate: string;
	extra: string;
	notifiedDate: string;
	deleted: boolean;
	creationTime: Date;
}

export class BasicEntity {
	label: string;
}

export class Authorization {
	authorization: string;
}
