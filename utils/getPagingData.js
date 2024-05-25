const getPagingData = (data, page, limit) => {
    const { count, rows: tripsListData } = data

    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(count / limit) - 1
    const totalItems = count - 1

    return { totalItems, tripsListData, totalPages, currentPage }
  };
  
module.exports = getPagingData