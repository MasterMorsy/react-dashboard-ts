import endPoint from "../../../services";

export function adminLogin(form: any) {
  return endPoint.post("/admins/login", form);
}
