import endPoint from "../../../../services";

export function createRole(form: any) {
  return endPoint.post("/roles", form);
}

export function updateRole(id: string, form: any) {
  return endPoint.put("/roles/" + id, form);
}

export function getRole(id: string) {
  return endPoint.get("/roles/" + id);
}

export function listRoles() {
  return endPoint.get(`/roles`);
}

export function deleteRole(id: string) {
  return endPoint.delete("/roles/" + id);
}
