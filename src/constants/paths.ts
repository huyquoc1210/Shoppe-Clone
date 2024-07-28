const Paths = {
  index: '/',
  login: {
    route: '/login'
  },
  register: {
    route: '/register'
  },
  productList: {
    route: ''
  },
  productDetail: {
    route: ':nameId'
  },
  cart: {
    route: 'cart'
  },
  user: {
    route: 'user',
    profile: {
      route: '/user/profile'
    },
    changPassword: {
      route: '/user/password'
    },
    historyPurchase: {
      route: '/user/purchase'
    }
  }
} as const;

export default Paths;
