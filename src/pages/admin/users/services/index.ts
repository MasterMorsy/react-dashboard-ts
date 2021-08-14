import endPoint from "../../../../services";

export function createUser(form: any) {
  return endPoint.post("/users", form);
}

export function updateUser(id: string, form: any) {
  return endPoint.put("/users/" + id, form);
}

export function getUser(id: string) {
  return endPoint.get("/users/" + id);
}

export function listUsers(query?: string) {
  return endPoint.get(`/users${query}`);
}

export function deleteRegion(id: string) {
  return endPoint.delete("/users/region/" + id);
}

export function deleteUser(id: string) {
  return endPoint.delete("/users/" + id);
}
