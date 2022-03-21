// PgDataServiceTypes

export type PgDataSource = 'github'|'sync';

export type ItemId = string; // base64-encoded UUID

export type Timestamp = string; // date time in ISO 8601 UTC format with millisecond precision (i.e. YYYY-MM-DDThh:mm:ss.sssZZ)

export type ItemStatus = 'open'|'closed'|'blocked'|'held';

export type ItemPriority = 1|2|3|4;

export type ItemRelation = {
    relatedItem: ItemId;
    relationType: string;
};

export type ItemDetails = {
    id?: ItemId; // only `undefined` for items being created
    title: string;
    created: Timestamp;
    lastModified: Timestamp;
    status?: ItemStatus;
    priority?: ItemPriority;
    notes?: string;
    startDate?: Timestamp;
    endDate?: Timestamp;
    relatives?: ItemRelation[];
};

// TODO consider using the `neverthrow` library
export interface PgError<Data> {
    err: Error;
    data?: Data;
};

// TODO add the "edits type" as well here so we can maintain a running lists of edit for syncing
