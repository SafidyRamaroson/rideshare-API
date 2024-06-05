const getPagination = ( page,size ) => {
    // considerons que size egale  à 6

    const limit  = size ? +size : 4
    const offset = page>=1 ? limit * (page-1): 1;
    return { limit , offset };
}

module.exports = getPagination