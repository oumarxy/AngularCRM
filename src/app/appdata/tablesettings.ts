import {
	InsuranceLead,
	State,
	User,
	Customer,
	Role,
	Policy,
	HomeType,
	LeadSource,
	LeadStatus,
	RoofType,
	SidingType,
	Referral,
	EmailTemplate,
	EmailLog,
	Note,
	CustomerEmail,
	FileStoreDocument,
	PhoneType,
	DeadLeadReason,
	Zone,
	TodayActivity,
	TodayActivityGroup,
	UnfilteredInsuranceLead,
	TodayLeadActivity,
	Reminder,
	Insurer,
} from './datamodels';

/****Main Displays****/

export const INSURANCELEADSDISPLAY = [
	{ columnDef: 'firstName',  header: 'First Name', cell: (row: InsuranceLead) => `${row.firstName}` },
	{ columnDef: 'lastName',  header: 'Last Name', cell: (row: InsuranceLead) => `${row.lastName}` },
	{ columnDef: 'emailAddress',  header: 'Email', cell: (row: InsuranceLead) => `${row.emailAddress}` },
	{ columnDef: 'phone1', header: 'Phone 1', cell: (row: InsuranceLead) => `${row.phone1} (${row.phone1TypeId})` },
	{ columnDef: 'stateId',  header: 'State', cell: (row: InsuranceLead) => `${row.stateId}` },
	{ columnDef: 'leadStatusId',  header: 'Lead Status', cell: (row: InsuranceLead) => `${row.leadStatusId}` },
	{ columnDef: 'leadSourceId', header: 'Lead Source', cell: (row: InsuranceLead) => `${row.leadSourceId}`},
	{ columnDef: 'lastContactDate',  header: 'Last Contacted', cell: (row: InsuranceLead) => `${row.lastContactDate}` },
	{ columnDef: 'modificationTime',  header: 'Last Modified', cell: (row: InsuranceLead) => `${row.modificationTime}` },
	{ columnDef: 'creationTime',  header: 'Creation Date', cell: (row: InsuranceLead) => `${row.creationTime}` },
	{ columnDef: 'userId',  header: 'Sales Agent', cell: (row: InsuranceLead) => `${row.userId}` },
];

export const CUSTOMERLEADSDISPLAY = [
	{ columnDef: 'leadStatusId',  header: 'Lead Status', cell: (row: UnfilteredInsuranceLead) => `${row.leadStatusId}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: UnfilteredInsuranceLead) => `${row.deleted}` },
	{ columnDef: 'lastContactDate',  header: 'Last Contacted', cell: (row: UnfilteredInsuranceLead) => `${row.lastContactDate}` },
	{ columnDef: 'modificationTime',  header: 'Last Modified', cell: (row: UnfilteredInsuranceLead) => `${row.modificationTime}` },
	{ columnDef: 'userId',  header: 'Sales Agent', cell: (row: UnfilteredInsuranceLead) => `${row.userId}` },
];

export const SHORTINSURANCELEADSDISPLAY = [
	{ columnDef: 'firstName',  header: 'First Name', cell: (row: InsuranceLead) => `${row.firstName}` },
	{ columnDef: 'lastName',  header: 'Last Name', cell: (row: InsuranceLead) => `${row.lastName}` },
	{ columnDef: 'emailAddress',  header: 'Email', cell: (row: InsuranceLead) => `${row.emailAddress}` },
	{ columnDef: 'stateId',  header: 'State', cell: (row: InsuranceLead) => `${row.stateId}` },
];

export const MYLEADSDISPLAY = [
	{ columnDef: 'firstName',  header: 'First Name', cell: (row: InsuranceLead) => `${row.firstName}` },
	{ columnDef: 'lastName',  header: 'Last Name', cell: (row: InsuranceLead) => `${row.lastName}` },
	{ columnDef: 'emailAddress',  header: 'Email', cell: (row: InsuranceLead) => `${row.emailAddress}` },
	{ columnDef: 'phone1', header: 'Phone 1', cell: (row: InsuranceLead) => `${row.phone1} (${row.phone1TypeId})` },
	{ columnDef: 'stateId',  header: 'State', cell: (row: InsuranceLead) => `${row.stateId}` },
	{ columnDef: 'leadStatusId',  header: 'Lead Status', cell: (row: InsuranceLead) => `${row.leadStatusId}` },
	{ columnDef: 'leadSourceId', header: 'Lead Source', cell: (row: InsuranceLead) => `${row.leadSourceId}`},
	{ columnDef: 'lastContactDate',  header: 'Last Contacted', cell: (row: InsuranceLead) => `${row.lastContactDate}` },
	{ columnDef: 'modificationTime',  header: 'Last Modified', cell: (row: InsuranceLead) => `${row.modificationTime}` },
];

export const HOTLEADSDISPLAY = [
	{ columnDef: 'salesAgent',  header: 'Sales Agent', cell: (row: InsuranceLead) => `${row.userId}` },
	{ columnDef: 'stateId',  header: 'State', cell: (row: InsuranceLead) => `${row.stateId}` },
	{ columnDef: 'estClosingValue', header: 'Est. Closing $', cell: (row: InsuranceLead) => `${row.estClosingValue}`},
	{ columnDef: 'estClosingDate', header: 'Est. Closing Date', cell: (row: InsuranceLead) => `${row.estClosingDate}`},
	{ columnDef: 'lastContactDate',  header: 'Last Contacted', cell: (row: InsuranceLead) => `${row.lastContactDate}` },
];

export const CUSTOMERSDISPLAY = [
	{ columnDef: 'firstName',  header: 'First Name', cell: (row: Customer) => `${row.firstName}` },
	{ columnDef: 'lastName',  header: 'Last Name', cell: (row: Customer) => `${row.lastName}` },
	{ columnDef: 'phone', header: 'Phone 1', cell: (row: Customer) => `${row.phone1} (${row.phone1TypeId})`},
	{ columnDef: 'bestTimeToContact', header: 'Best Time to Contact', cell: (row: Customer) => `${row.bestTimeToContact}`},
	{ columnDef: 'state',  header: 'State', cell: (row: Customer) => `${row.stateId}`},
	{ columnDef: 'city',  header: 'City', cell: (row: Customer) => `${row.city}`},
	{ columnDef: 'possibleDuplicate', header: 'Possible duplicate?', cell: (row: Customer) => `${row.possibleDuplicate}`}
];

export const MYPOLICYDISPLAY = [
	{ columnDef: 'policyNumber',  header: 'Policy Number', cell: (row: Policy) => `${row.policyNumber}` },
	{ columnDef: 'policyName',  header: 'Policy Name', cell: (row: Policy) => `${row.policyName}` },
];

export const POLICYDISPLAY = [
	{ columnDef: 'policyNumber',  header: 'Policy Number', cell: (row: Policy) => `${row.policyNumber}` },
	{ columnDef: 'policyName',  header: 'Policy Name', cell: (row: Policy) => `${row.policyName}` },
	{ columnDef: 'salesAgent',  header: 'Sales Agent', cell: (row: Policy) => `${row.userId}` },
	{ columnDef: 'insurerId',  header: 'Insurer ID', cell: (row: Policy) => `${row.insurerId}` },
];

export const NOTESDISPLAY = [
	{ columnDef: 'creationTime',  header: 'Date', cell: (row: Note) => `${row.creationTime}` },
	{ columnDef: 'noteTitle',  header: 'Note Subject', cell: (row: Note) => `${row.noteTitle}` },
	{ columnDef: 'userId',  header: 'Note User ID', cell: (row: Note) => `${row.userId}` },
];

export const TODAYLEADACTIVITYDISPLAY = [
	{ columnDef: 'creationTime',  header: 'Date', cell: (row: TodayLeadActivity) => `${row.creationTime}` },
	{ columnDef: 'todayActivityId',  header: 'Today Activity Id', cell: (row: TodayLeadActivity) => `${row.todayActivityId}` },
	{ columnDef: 'userId',  header: 'User Id', cell: (row: TodayLeadActivity) => `${row.userId}` },
];

export const REMINDERSDISPLAY = [
	{ columnDef: 'reminderTitle',  header: 'Title', cell: (row: Reminder) => `${row.reminderTitle}` },
	{ columnDef: 'reminderDate',  header: 'Date', cell: (row: Reminder) => `${row.reminderDate}` },
];


/*********Single customer displays********** */
export const CUSTOMERINSURANCELEADSDISPLAY = [
	{ columnDef: 'state',  header: 'State', cell: (row: UnfilteredInsuranceLead) => `${row.stateId}` },
	{ columnDef: 'leadStatusId',  header: 'Lead Status', cell: (row: UnfilteredInsuranceLead) => `${row.leadStatusId}` },
	{ columnDef: 'lastContactDate',  header: 'Last Contacted', cell: (row: UnfilteredInsuranceLead) => `${row.lastContactDate}` },
	{ columnDef: 'salesAgent',  header: 'Sales Agent', cell: (row: UnfilteredInsuranceLead) => `${row.userId}` },
];
export const CUSTOMERPOLICYDISPLAY = [
	{ columnDef: 'policyNumber',  header: 'Policy Number', cell: (row: Policy) => `${row.policyNumber}` },
	{ columnDef: 'insurerId',  header: 'Insurer ID', cell: (row: Policy) => `${row.insurerId}` },
];
export const CUSTOMEREMAILDISPLAY = [
	{ columnDef: 'emailAddress',  header: 'Email Address', cell: (row: CustomerEmail) => `${row.emailAddress}` },
	{ columnDef: 'creationTime',  header: 'Date', cell: (row: CustomerEmail) => `${row.creationTime}` },
	{ columnDef: 'createdBy',  header: 'Added By', cell: (row: CustomerEmail) => `${row.createdBy}` },
];
export const CUSTOMERDOCUMENTDISPLAY = [
	{ columnDef: 'name',  header: 'File Name', cell: (row: FileStoreDocument) => `${row.fileName}`},
	{ columnDef: 'contentType',  header: 'Content-Type', cell: (row: FileStoreDocument) => `${row.contentType}` },
	{ columnDef: 'size',  header: 'File Size', cell: (row: FileStoreDocument) => `${row.fileSize}` },
];

/****Admin Displays****/
export const USERSDISPLAY = [
	{ columnDef: 'userName',  header: 'Username', cell: (row: User) => `${row.userName}`},
	{ columnDef: 'firstName',  header: 'First Name', cell: (row: User) => `${row.firstName}` },
	{ columnDef: 'lastName',  header: 'Last Name', cell: (row: User) => `${row.lastName}` },
	{ columnDef: 'roleId',  header: 'Role Id', cell: (row: User) => `${row.roleId}` }
];

export const ROLESDISPLAY = [
	{ columnDef: 'id',  header: 'Id', cell: (row: Role) => `${row.id}`},
	{ columnDef: 'label',  header: 'Label', cell: (row: Role) => `${row.label}`},
	{ columnDef: 'canEdit',  header: 'Can Edit?', cell: (row: Role) => `${row.canEdit}` },
	{ columnDef: 'canAdd',  header: 'Can Add?', cell: (row: Role) => `${row.canAdd}` },
	{ columnDef: 'canDelete',  header: 'Can Delete?', cell: (row: Role) => `${row.canDelete}` },
];

export const EMAILLOGDISPLAY = [
	{ columnDef: 'toRecipient',  header: 'To', cell: (row: EmailLog) => `${row.toRecipient}`},
	{ columnDef: 'fromRecipient',  header: 'From', cell: (row: EmailLog) => `${row.fromRecipient}` },
	{ columnDef: 'sentDate',  header: 'Sent', cell: (row: EmailLog) => `${row.sentDate}` },
];

export const DOCUMENTDISPLAY = [
	{ columnDef: 'name',  header: 'File Name', cell: (row: FileStoreDocument) => `${row.fileName}`},
	{ columnDef: 'contentType',  header: 'Content-Type', cell: (row: FileStoreDocument) => `${row.contentType}` },
	{ columnDef: 'size',  header: 'File Size', cell: (row: FileStoreDocument) => `${row.fileSize}` },
];

export const EMAILDISPLAY = [
	{ columnDef: 'id',  header: 'Id', cell: (row: CustomerEmail) => `${row.id}`},
	{ columnDef: 'emailAddress',  header: 'Email Address', cell: (row: CustomerEmail) => `${row.emailAddress}` },
	{ columnDef: 'customerId',  header: 'Customer Id', cell: (row: CustomerEmail) => `${row.customerId}` },
];

export const EMAILTEMPLATESDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: EmailTemplate) => `${row.label}`},
	{ columnDef: 'website',  header: 'Website', cell: (row: EmailTemplate) => `${row.website}` },
	{ columnDef: 'from',  header: 'From', cell: (row: EmailTemplate) => `${row.from}` },
	{ columnDef: 'leadSourceId',  header: 'LeadSourceId', cell: (row: EmailTemplate) => `${row.leadSourceId}` }
];


/****REFERENCE DATA**** */
export const STATESDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: State) => `${row.label}`},
	{ columnDef: 'code',  header: 'Code', cell: (row: State) => `${row.code}` },
	{ columnDef: 'zoneId',  header: 'Zone', cell: (row: State) => `${row.zoneId}` },
	{ columnDef: 'isDisabled',  header: 'Disabled', cell: (row: State) => `${row.isDisabled}` },
	{ columnDef: 'deleted',  header: 'Deleted', cell: (row: State) => `${row.deleted}` }
];

export const LOCATIONSDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: State) => `${row.label}`},
	{ columnDef: 'deleted',  header: 'Deleted', cell: (row: State) => `${row.deleted}` }
];

export const HOMETYPEDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: HomeType) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: HomeType) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: LeadSource) => `${row.deleted}` }
];

export const INSURERDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: Insurer) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: Insurer) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: Insurer) => `${row.deleted}` }
];

export const ROOFTYPEDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: RoofType) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: RoofType) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: RoofType) => `${row.deleted}` }
];

export const SIDINGTYPEDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: SidingType) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: SidingType) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: SidingType) => `${row.deleted}` }
];

export const REFFERALSDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: Referral) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: Referral) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: Referral) => `${row.deleted}` }
];

export const DEADLEADREASONSDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: DeadLeadReason) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: DeadLeadReason) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: DeadLeadReason) => `${row.deleted}` }
];

export const LEADSOURCEDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: LeadSource) => `${row.label}` },
	{ columnDef: 'website',  header: 'Website', cell: (row: LeadSource) => `${row.website}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: LeadSource) => `${row.deleted}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: LeadSource) => `${row.id}` }
];

export const LEADSTATUSDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: LeadStatus) => `${row.label}` },
	{ columnDef: 'rank',  header: 'Rank', cell: (row: LeadStatus) => `${row.rank}` },
	{ columnDef: 'isDefault',  header: 'Default?', cell: (row: LeadStatus) => `${row.isDefault}` },
	{ columnDef: 'isSelectable',  header: 'Selectable?', cell: (row: LeadStatus) => `${row.isSelectable}` },
	{ columnDef: 'isPermanent',  header: 'Permanent?', cell: (row: LeadStatus) => `${row.isPermanent}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: LeadStatus) => `${row.deleted}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: LeadStatus) => `${row.id}` }
];

export const PHONETYPEDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: PhoneType) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: PhoneType) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: PhoneType) => `${row.deleted}` }
];

export const ZONEDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: Zone) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: Zone) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: Zone) => `${row.deleted}` }
];

export const TODAYACTIVITYDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: TodayActivity) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: TodayActivity) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: TodayActivity) => `${row.deleted}` }
];

export const TODAYACTIVITYGROUPDISPLAY = [
	{ columnDef: 'label',  header: 'Label', cell: (row: TodayActivityGroup) => `${row.label}` },
	{ columnDef: 'id',  header: 'Id', cell: (row: TodayActivityGroup) => `${row.id}` },
	{ columnDef: 'deleted',  header: 'Deleted?', cell: (row: TodayActivityGroup) => `${row.deleted}` }
];
