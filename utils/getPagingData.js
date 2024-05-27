const getPagingData = (data, page, limit) => {
    const { count,rows: tripsListData } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(count / limit) - 1
    const totalItems = count 
    
    return { totalItems, tripsListData, totalPages, currentPage }
  };
  
module.exports = getPagingData