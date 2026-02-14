export const routeBuilders = {
  investorDetails: (investorId: string) => `/investors/${investorId}`,

  deposits: (investorId: string, depositId: string) =>
    `/investors/${investorId}/${depositId}`,
} as const;
