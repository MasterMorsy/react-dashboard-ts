import AdminBaseLayout from "./components/BaseLayout/admin";
import { adminAuthRoutes, adminRoutes } from "./routes";
import routerGroup from "./utilities/routerGroup";
import { guardRoute, reverseRoute } from "./middlewares/admin";
import "./shared/style/index.scss";

export default function app() {
  if (window.location.pathname === "/admin/login") {
    routerGroup({
      routes: adminAuthRoutes,
      middleware: reverseRoute,
    });
  } else {
    routerGroup({
      layout: AdminBaseLayout,
      routes: adminRoutes,
      middleware: guardRoute,
    });
  }
}
