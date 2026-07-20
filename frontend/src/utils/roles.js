// Rôles exacts tels que définis dans l'enum Prisma "Role"
export const ROLES = {
  ADMIN: "ADMIN",
  AUTEUR: "AUTEUR",
  LECTEUR: "LECTEUR",
};

// Route du dashboard selon le rôle, utilisée après connexion
export const DASHBOARD_PAR_ROLE = {
  [ROLES.ADMIN]: "/admin",
  [ROLES.AUTEUR]: "/auteur",
  [ROLES.LECTEUR]: "/catalogue",
};