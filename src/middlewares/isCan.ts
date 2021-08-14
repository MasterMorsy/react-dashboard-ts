import { admin } from "../helpers/users";

export function isCan(module: string, action: string) {
  if (admin.get("type") === "admin") return true;
  else {
    const role = admin.get("role");
    const result = role["permissions"]?.find((m: any) => m.name === module)
      .roles[action];

    return result ?? false;
  }
}
