const groupBy = (array, getKey) => {
    return array.reduce((obj, cur, idx, src) => {
        const key = getKey(cur, idx, src);
        (obj[key] || (obj[key] = [])).push(cur);
        return obj;
    }, {});
};
