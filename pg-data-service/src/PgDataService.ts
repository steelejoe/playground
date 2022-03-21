// PgDataService

import { ItemId, ItemDetails, PgError, Timestamp } from "./PgDataServiceTypes";

export class PgDataService {
    /**
     * This api returns the `ItemDetails` for a single item matching the id specified or undefined if no such item exists.
     * @param id the identifier for the item to retrieve
     * @return ItemDetails | PgError<void>
     */
    public getItem(id: ItemId): ItemDetails | PgError<void> {
        // const item:ItemDetails = {};
        return undefined;
    }

    /**
     * This api will either update an existing item or insert a new one,
     * depending on whether the `details.id` matches an existing item.
     * If the item is being created, the `id` will be `undefined` and must be generated.
     * The `id` is the items unique identifier. This is a base64-encoded UUID.
     * If a sync conflict occurs, an error will be returned to the client with the details of the conflicting item.
     * @param details the details for the item to be created or updated.
     * @return undefined | PgError<ItemDetails>
     */
    public setItem(details: ItemDetails): undefined | PgError<ItemDetails> {
        return undefined;
    }

    /**
     * This api returns `ItemDetails[]` containing the items for the particular day. Up to 1000 items will be returned.
     * If `startIndex` is not specified, the list of items returned will start at 0.
     * If it is negative or larger than the number of items available, no items will be returned.
     * @param date The day to retrieve the items for. The time portion of the timestamp is ignored.
     * @param startIndex the index of the first item returned into the total array of results
     * @return ItemDetails | PgError<void>
     */
    public day(
        date: Timestamp,
        startIndex: number
    ): ItemDetails | PgError<void> {
        return { err: Error("Not implemented") };
    }

    /**
     * This api returns `ItemDetails[]` containing items with start dates within the range specified
     * and the starting index for the first item. Up to 1000 items will be returned.
     * If `startIndex` is not specified, the list of items returned will start at 0.
     * If it is negative or larger than the number of items available, no items will be returned.
     * @param startDate if `undefined`, all items with start date before `endDate` are returned.
     * @param endDate if `undefined`, all items with start date after `startDate` are returned.
     * @param startIndex the index of the first item returned into the total array of results
     * @return ItemDetails[] | PgError<void>
     */
    public range(
        startDate?: Timestamp,
        endDate?: Timestamp,
        startIndex?: number
    ): ItemDetails[] | PgError<void> {
        return { err: Error("Not implemented") };
    }

    /**
     * This api returns `ItemDetails[]` containing all items without a start date
     * and the starting index for the first item. Up to 1000 items will be returned.
     * If `startIndex` is not specified, the list of items returned will start at 0.
     * If it is negative or larger than the number of items available, no items will be returned.
     * @param id the identifier for the item to retrieve
     * @return ItemDetails | PgError<void>
     */
    public backlog(startIndex: number): ItemDetails[] | PgError<void> {
        return { err: Error("Not implemented") };
    }

    /**
     * This api returns `ItemDetails[]` containing all items matching the query string
     * and the starting index for the first item. Up to 1000 items will be returned.
     * The format of `query` and what item data it is compared against is TBD.
     * If `startIndex` is not specified, the list of items returned will start at 0.
     * If it is negative or larger than the number of items available, no items will be returned.
     * @param query the details of how to do the search
     * @param startIndex the index of the first item returned into the total array of results
     * @return ItemDetails[] | PgError<void>
     */
    public search(
        query: RegExp,
        startIndex: number
    ): ItemDetails[] | PgError<void> {
        return { err: Error("Not implemented") };
    }
}
