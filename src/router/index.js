import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ListUtilisateur from '../components/utilisateur/ListerUtilisateur.vue';
import AjouterUtilisateur from '../components/utilisateur/CreerUtilisateur.vue';
import DetailsUtilisateur from '../components/utilisateur/DetailsUtilisateur.vue';
import EditerUtilisateur from '../components/utilisateur/EditerUtilisateur.vue';
import Login from '../components/authentification/Login.vue';

//roles
import ListerRole from '../components/roles/ListerRole.vue';
import AjouterRole from '../components/roles/CreerRole.vue';
import EditerRole from '../components/roles/EditerRole.vue';
import DetailsRole from '../components/roles/DetailsRole.vue';

//produits
import ListeProduits from '../components/produits/ListeProduits.vue';
import AjouterProduit from '../components/produits/AjouterProduit.vue';
import EditerProduit from '../components/produits/EditerProduit.vue';
import DetailsProduit from '../components/produits/DetailsProduit.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListUtilisateur,
    },
    {
      path: '/ajouter',
      name: 'ajout-utilisateur',
      component: AjouterUtilisateur,
    },
    {
      path: '/modifier/:id',
      name: 'modification',
      component: EditerUtilisateur,
    },
    {
      path: '/detail/:id',
      name: 'details',
      component: DetailsUtilisateur,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },

    //roles

    {
      path: '/lister-roles',
      name: 'lister-roles',
      component: ListerRole,
    },
    {
      path: '/ajouter-role',
      name: 'ajout-role',
      component: AjouterRole,
    },
    {
      path: '/modifier-role/:id',
      name: 'modification-role',
      component: EditerRole,
    },
    {
      path: '/detail-role/:id',
      name: 'details-role',
      component: DetailsRole,
    },

    //produits
    {
      path: '/liste-produits',
      name: 'liste-produits',
      component: ListeProduits,
    },
    {
      path: '/ajouter-produit',
      name: 'ajouter-produit',
      component: AjouterProduit,
    },
    {
      path: '/editer-produit/:id',
      name: 'editer-produit',
      component: EditerProduit,
    },
    {
      path: '/details-produit/:id',
      name: 'details-produit',
      component: DetailsProduit,
    }
  ],
});

export default router;
