import { Student } from "../app/models";


export type PagingnationParams = {
    _limit: number,
    _page: number,
    _totalRows: number,
}

export interface ListResponse<T>{
    data: T[],
    pagination: PagingnationParams
}

export interface ListParams{
    _page?: number,
    _limit?: number,
    _sort?: string,
    _order?: 'asc' | 'desc',
    [key: string]: any;
}


export type TCreateStudent = Omit<Student, "id" | "createdAt" | "updatedAt" | "model">;