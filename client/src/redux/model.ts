export interface ActionReducer<TypeAction, TypePayload> {
  payload?: TypePayload;
  type: TypeAction;
}
