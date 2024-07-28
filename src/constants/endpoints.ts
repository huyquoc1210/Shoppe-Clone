const Endpoints = {
  login: '/login',
  register: '/register',
  logout: '/logout',
  profile: 'profile',
  products: 'products',
  category: 'categories',
  productDetail: ':nameId',
  purchases: 'purchases',
  user: {
    index: 'me'
  }
} as const;

export default Endpoints;
