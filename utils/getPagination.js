const getPagination = ( page,size ) => {
    // considerons que size egale  à 6
    const limit  = size ? +size : 2
    const offset = page>=0 ? limit * page: 0;
    // const offset = 2
    console.log("page")
    console.log(page)
    console.log("limit")
    console.log(limit,offset)
    return { limit , offset };
}

module.exports = getPagination