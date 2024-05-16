const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tripsListData } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, tripsListData, totalPages, currentPage };
  };
  
module.exports = getPagingData;