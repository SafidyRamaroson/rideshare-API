const getPagination = ( page,size ) => {
    // considerons que size egale  à 6
    const limit  = size ? + size : 4
    const offset = limit * page
    return { limit , offset };
}

module.exports = getPagination