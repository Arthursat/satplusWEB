import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

const lazyComponent = (path) => () => import(`./../views/${path}`);

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "NotFound",
    component: lazyComponent("NotFound.vue"),
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: lazyComponent("Login.vue"),
  },
  {
    path: "/ultimas_posicoes",
    name: "UltimasPosicoes",
    component: lazyComponent("Usuario/UltimasPosicoes.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/clientes",
    name: "AdminClientes",
    component: lazyComponent("Admin/Clientes.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/admin/usuarios",
    name: "AdminUsuarios",
    component: lazyComponent("Admin/Usuarios.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      if (to.matched.some((record) => record.meta.requiresAdmin)) {
        if (store.state.auth.usuario && store.state.auth.usuario.admin === true) {
          next();
        } else {
          next("/login");
        }
      } else if (to.matched.some((record) => record.meta.requiresModerador)) {
        if (store.state.auth.usuario && store.state.auth.usuario.moderador === true) {
          next();
        } else {
          next("/login");
        }
      } else {
        next();
      }
    } else {
      localStorage.removeItem("token");
      next("/login");
    }
  } else {
    if ((to.path == "/login" || to.path == "/") && localStorage.getItem("token")) {
      if (store.state.auth.usuario && store.state.auth.usuario.admin === true) {
        next({ path: "/admin/clientes" });
      } else if (store.state.auth.usuario && store.state.auth.usuario.moderador === true) {
        next({ path: "/admin/usuarios" });
      } else {
        next({ path: "/ultimas_posicoes" });
      }
    }
    next();
  }
});

export default router;
