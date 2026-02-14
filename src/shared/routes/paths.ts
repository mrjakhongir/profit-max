export const paths = {
  home: "/",
  login: "/login",
  investors: "/investors",
  investorDetails: "/investors/:id",
  addInvestor: "/investors/add",
  transactions: "/transactions",
  deposits: {
    dividends: "/investors/deposits/",
    withdrawals: "/investors/deposits/withdraw",
  },
} as const;
