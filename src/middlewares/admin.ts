import { admin } from "../helpers/users";

export function guardRoute() {
  if (!admin.get("token")) {
    window.location.replace("/admin/login");
  } else return true;
}

export function reverseRoute() {
  if (admin.get("token")) {
    window.location.replace("/admin");
  } else return true;
}
