export const routeBuilders = {
  home: () => "/",
  login: () => "/login",
  investors: () => "/investors",
  investorDetails: (id: string) => `/investors/${id}`,
} as const;
