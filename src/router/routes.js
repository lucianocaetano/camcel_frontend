const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Empresas.vue') }
    ]
  },

  {
    path: '/error/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ErrorNotFound.vue') }
    ]
  },
  {
    path: '/login/',
    component: () => import('pages/InicioSesion.vue'),
    
  },
  {
    path: '/documentos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Documentos.vue') }
    ]
  },
  {
    path: '/empresas/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Empresas.vue'), name: "enterprises"},
      { path: ':slug', component: () => import('src/pages/EmpresaDetalles.vue'), name: "enterprise-detail" }
    ]
  },
  {
    path: '/his.trabajo/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HisTrabajo.vue') }
    ]
  }, {
    path: '/cuenta/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Documentos.vue') }
    ]
  }, {
    path: '/trabajos/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Trabajo.vue') }
    ]
  }, {
    path: '/soporte/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Soporte.vue') }
    ]
  },

]

export default routes

