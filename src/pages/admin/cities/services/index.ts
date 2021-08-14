import endPoint from "../../../../services";

export function createCity(form: any) {
  return endPoint.post("/cities", form);
}

export function updateCity(id: string, form: any) {
  return endPoint.put("/cities/" + id, form);
}

export function getCity(id: string) {
  return endPoint.get("/cities/" + id);
}

export function listCities() {
  return endPoint.get("/cities");
}

export function deleteRegion(id: string) {
  return endPoint.delete("/cities/region/" + id);
}

export function deleteCity(id: string) {
  return endPoint.delete("/cities/" + id);
}
