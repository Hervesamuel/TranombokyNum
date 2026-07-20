import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Affiche un toast (type: "succes" | "erreur" | "info")
  const afficherToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    // Disparait automatiquement après 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ afficherToast }}>
      {children}
      {/* Conteneur des toasts, affiché en overlay */}
      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              padding: "12px 18px",
              borderRadius: 8,
              color: "#fff",
              minWidth: 220,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backgroundColor: t.type === "succes" ? "#2563eb" : t.type === "erreur" ? "#dc2626" : "#374151",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}