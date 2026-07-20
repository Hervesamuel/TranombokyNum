import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROLES } from "../utils/roles";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuteurLayout from "../layouts/AuteurLayout";

// Pages publiques
import Accueil from "../pages/Accueil";
import Connexion from "../pages/Connexion";

// Dashboards
import Admin from "../pages/admin";
import Auteur from "../pages/auteur";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== Routes publiques (avec le layout principal : header/footer) ===== */}
        <Route element={<MainLayout />}>
          <Route index element={<Accueil />} />
          <Route path="connexion" element={<Connexion />} />
          {/* <Route path="inscription" element={<Inscription />} /> */}
          {/* <Route path="catalogue" element={<Catalogue />} /> */}
          {/* <Route path="livre/:id" element={<DetailLivre />} /> */}

          {/* ===== Routes protégées : tout utilisateur connecté ===== */}
          {/* <Route element={<ProtectedRoute rolesAutorises={[ROLES.ADMIN, ROLES.AUTEUR, ROLES.LECTEUR]} />}> */}
          {/*   <Route path="profil" element={<Profil />} /> */}
          {/*   <Route path="favoris" element={<Favoris />} /> */}
          {/*   <Route path="historique" element={<Historique />} /> */}
          {/*   <Route path="notifications" element={<Notifications />} /> */}
          {/*   <Route path="lecture/:id" element={<Lecture />} /> */}
          {/* </Route> */}
        </Route>

        {/* ===== Espace ADMIN (réservé au rôle ADMIN) ===== */}
        <Route
          path="admin"
          element={
            <ProtectedRoute rolesAutorises={[ROLES.ADMIN]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Admin />} />
          {/* Sous-pages à venir : validation, gestion-auteurs, gestion-utilisateurs, gestion-livres */}
        </Route>

        {/* ===== Espace AUTEUR (réservé au rôle AUTEUR) ===== */}
        <Route
          path="auteur"
          element={
            <ProtectedRoute rolesAutorises={[ROLES.AUTEUR]}>
              <AuteurLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Auteur />} />
          {/* Sous-pages à venir : ajouter, modifier/:id */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;