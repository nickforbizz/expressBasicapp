const getPagination = (page, size) => {
  const limit = size ? +size : 15;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (items, page, limit) => {
  const { count: totalItems, rows: data } = items;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  const nextPage = currentPage == totalPages ? +currentPage : +currentPage + 1;

  return { totalItems, data, totalPages, currentPage, nextPage };
};



module.exports.getPagination = getPagination
module.exports.getPagingData = getPagingData