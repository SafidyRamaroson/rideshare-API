const getPagination = ( page,size ) => {
    // considerons que size egale  à 6
    const limit = size ? size : 0;
    const offset = page ? limit*page: 0;

    return { limit , offset };
}

module.exports = getPagination