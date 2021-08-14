import endPoint from "../../../../services";

export function createSkill(form: any) {
  return endPoint.post("/skills", form);
}

export function updateSkill(id: string, form: any) {
  return endPoint.put("/skills/" + id, form);
}

export function getSkill(id: string) {
  return endPoint.get("/skills/" + id);
}

export function listSkills() {
  return endPoint.get("/skills");
}

export function deleteSkill(id: string) {
  return endPoint.delete("/skills/" + id);
}
