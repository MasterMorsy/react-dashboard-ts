import Cities from "../pages/admin/cities/components/index";
import NewCity from "../pages/admin/cities/components/create";
import UpdateCity from "../pages/admin/cities/components/update";

import Skills from "../pages/admin/skills/components/index";
import NewSkill from "../pages/admin/skills/components/create";
import UpdateSkill from "../pages/admin/skills/components/update";

import Stuff from "../pages/admin/stuff/components/index";
import NewStuff from "../pages/admin/stuff/components/create";
import UpdateStuff from "../pages/admin/stuff/components/update";

import Statistics from "../pages/admin/statistics/index";
import AdminLogin from "../pages/admin/auth/AdminLogin";

import Roles from "../pages/admin/roles/components";
import NewRole from "../pages/admin/roles/components/create";
import UpdateRole from "../pages/admin/roles/components/update";

export const adminRoutes = [
  {
    path: "/admin",
    component: Statistics,
  },
  {
    path: "/admin/cities",
    component: Cities,
  },
  {
    path: "/admin/cities/new",
    component: NewCity,
  },
  {
    path: "/admin/cities/:id/update",
    component: UpdateCity,
  },

  {
    path: "/admin/skills",
    component: Skills,
  },
  {
    path: "/admin/skills/new",
    component: NewSkill,
  },
  {
    path: "/admin/skills/:id/update",
    component: UpdateSkill,
  },
  {
    path: "/admin/stuff",
    component: Stuff,
  },
  {
    path: "/admin/stuff/new",
    component: NewStuff,
  },
  {
    path: "/admin/stuff/:id/update",
    component: UpdateStuff,
  },

  {
    path: "/admin/roles",
    component: Roles,
  },
  {
    path: "/admin/roles/new",
    component: NewRole,
  },
  {
    path: "/admin/roles/:id/update",
    component: UpdateRole,
  },
];

export const adminAuthRoutes = [
  {
    path: "/admin/login",
    component: AdminLogin,
  },
];
