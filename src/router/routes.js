const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Enterprises.vue") }],
  },
  {
    path: "/error/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ErrorNotFound.vue") },
    ],
  },
  {
    path: "/login/",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/enterprise/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Enterprises.vue"),
        name: "enterprises",
      },
      {
        path: ":slug/",
        component: () => import("src/pages/EnterpriseDetail.vue"),
        name: "enterprise-detail",
      },
      {
        path: ":enterprise/operator/:pk/",
        component: () => import("src/pages/OperatorDetail.vue"),
        name: "operators-detail",
      },
    ],
  },
  {
    path: "/users/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Users.vue"),
        name: "users",
      },
    ],
  },
  {
    path: "/trabajos",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Trabajo.vue"),
        name: "trabajos",
      },
    ],
  },
  {
    path: "/his.trabajo/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/HisTrabajo.vue"),
        name: "his.trabajo",
      },
    ],
  },
  {
    path: "/cuenta/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      
    ],
  },
 
  
  {
    path: "/Configuracion",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/UsuarioConfig.vue"),
        name: "Configuracion",
      },
    ],
  },
];

export default routes;
