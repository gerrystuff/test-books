export const cleanObject = (obj: {[key: string]: any}): {[key: string]: any} => {
    Object.keys(obj).forEach(key => {
        if (obj[key] === null || obj[key] === undefined) {
            delete obj[key];
        }
    });
    return obj;
}