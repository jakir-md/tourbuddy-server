type IOptions = {
    page?: number;
    limit?: number;
    sortOrder?: string | undefined;
    sortBy?: string | undefined;
};
type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};
export declare const paginationHelper: {
    calculatePagination: (options: IOptions) => IOptionsResult;
};
export {};
//# sourceMappingURL=paginationHelper.d.ts.map