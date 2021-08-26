export const getAllProducts = (cateName) => {
  return {
    type: 'GET_ALL_PRODUCTS',
    payload: {
      request: {
        method: 'GET',
        url: `/graphql?operationName=FilteredProducts&variables=%7B%22includeCannabinoids%22%3Afalse%2C%22showAllSpecialProducts%22%3Afalse%2C%22productsFilter%22%3A%7B%22dispensaryId%22%3A%22609c48195960d500bb8eda47%22%2C%22pricingType%22%3A%22rec%22%2C%22strainTypes%22%3A%5B%5D%2C%22subcategories%22%3A%5B%5D%2C%22Status%22%3A%22Active%22%2C%22removeProductsBelowOptionThresholds%22%3Atrue%2C%22types%22%3A%5B%22Flower%22%5D%2C%22useCache%22%3Afalse%2C%22sortDirection%22%3A1%2C%22sortBy%22%3Anull%2C%22bypassOnlineThresholds%22%3Afalse%2C%22isKioskMenu%22%3Afalse%7D%2C%22page%22%3A0%2C%22perPage%22%3A50%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22b6ff0c53f33a7971a20ae49e81ab24b70c0095add648534e1c6a140943759883%22%7D%7D`
      }
    }
  }
}
