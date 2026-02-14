export const paths = {
  home: "/",
  login: "/login",

  investors: {
    root: "/investors",
    details: ":id",
    add: "add",
    deposits: ":id/:depositId",
  },
} as const;
