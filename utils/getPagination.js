const getPagination = ( page,size ) => {
    // considerons que size egale  à 6
   
    let limit = 0
    let offset = 0
    if(isPageValid(page)){
        limit  = size ? +size : 4
        offset = limit * (page-1)
    }
    return { limit , offset };
}

const isPageValid = (page) => {
    return page >= 1
}

module.exports = getPagination