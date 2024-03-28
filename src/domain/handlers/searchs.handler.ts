export const paginateAndSort = (query:any, page: number, pageSize: number, sort: string) => {
    return query
        .sort({ title: sort === 'desc' ? -1 : 1 }) // ordena por título
        .skip((page - 1) * pageSize)
        .limit(pageSize);
}
