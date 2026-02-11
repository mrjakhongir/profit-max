export const routeBuilders = {
  home: () => "/",
  login: () => "/login",
  investors: () => "/investors",
  addInvestor: () => "add",
  investorDetails: (id: string) => `/investors/${id}`,
} as const;
