const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Empresas.vue") }],
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
    path: "/trabajos",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Trabajo.vue") },
    ],
  },
  {
    path: "/empresas/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/Empresas.vue"),
        name: "enterprises",
      },
      {
        path: ":slug/",
        component: () => import("src/pages/EmpresaDetalles.vue"),
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
    path: "/his.trabajo/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/HisTrabajo.vue") },
    ],
  },
  {
    path: "/cuenta/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Documentos.vue") },
    ],
  },
  {
    path: "/calendario/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Calendario.vue") },
    ],
  },
  {
    path: "/soporte/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Soporte.vue") }],
  },
  {
    path: "/usuarios/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/Users.vue") }],
  },
  {
    path: '/Configuracion',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/UsuarioConfig.vue') }
    ]
  },
];

export default routes;
