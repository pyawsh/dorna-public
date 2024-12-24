// تابع کمکی برای ایجاد شیء کوئری
export const createQuery = (filters: any) => {
    const query: any = {}
    for (const key in filters) {
        if (filters[key] && key !== 'params') {
            if (key === 'report') {
                continue
            }
            // if (key === 'gender' || key === 'isActive' || key === 'read'||key==='withSound') {
            if (filters[key] === 'false' || filters[key] === 'true') {
                query[key] = filters[key]
            } else {
                query[key] = new RegExp(filters[key])
            }
        }
    }
    return query
}
