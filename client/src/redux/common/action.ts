export enum CommonAction {
  SetRedirectPath = "Set_Redirect_Path",
  RemoveRedirectPath = "Remove_Redirect_Path",
}
export const CommonFunction = {
  setRedirectPath: (redirectPath: string) => ({
    type: CommonAction.SetRedirectPath,
    payload: { redirectPath },
  }),
  removeRedirectPath: () => ({
    type: CommonAction.RemoveRedirectPath,
  }),
};
