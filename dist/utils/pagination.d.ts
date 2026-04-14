import { Repository, FindManyOptions, ObjectLiteral } from "typeorm";
export interface PaginationResult<T extends ObjectLiteral> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export interface PaginationOptions {
    page?: number;
    limit?: number;
}
export declare function paginate<T extends ObjectLiteral>(repository: Repository<T>, options: FindManyOptions<T>, paginationOptions: PaginationOptions): Promise<PaginationResult<T>>;
