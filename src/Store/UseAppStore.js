// import { create } from "zustand";

// // Helper to load from localStorage
// const loadEntities = () => {
//   const stored = localStorage.getItem("entities");
//   if (stored) return JSON.parse(stored);

//   // default admin with password
//   return [
//     {
//       id: "admin-1",
//       role: "admin",
//       username: "Admin",
//       email: "admin@example.com",
//       password: "Admin@123", // fixed admin password
//       referralCode: "ADM01",
//       referredById: null,
//     },
//   ];
// };
// // Add in your useAppStore



// // Helper to save into localStorage
// const saveEntities = (entities) => {
//   localStorage.setItem("entities", JSON.stringify(entities));
// };

// export const useAppStore = create((set, get) => ({
//   currentUserId: null,
//   entities: loadEntities(),

//   // Set logged in user
//   setCurrentUser: (id) => set({ currentUserId: id }),

//   // Get user by id
//   getById: (id) => get().entities.find((e) => e.id === id) || null,

//   // Get all children of parent
//   childrenOf: (parentId) =>
//     get().entities.filter((e) => e.referredById === parentId),

//   // Counts
//   counts: () => {
//     const e = get().entities;
//     return {
//       admins: e.filter((x) => x.role === "admin").length,
//       vendors: e.filter((x) => x.role === "vendor").length,
//       mentors: e.filter((x) => x.role === "mentor").length,
//       users: e.filter((x) => x.role === "user").length,
//     };
//   },

//   // Add new user (with password)
//   addUser: ({ id, username, email, role, referredById, referralCode, password }) => {
//     const newEntities = [
//       ...get().entities,
//       { id, username, email, role, referredById, referralCode, password },
//     ];
//     saveEntities(newEntities);
//     set({ entities: newEntities });
//   },

//   // Validate login with email + password
//   login: (email, password) => {
//     const user = get().entities.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (user) {
//       set({ currentUserId: user.id });
//       return user;
//     }
//     return null; // invalid login
//   },

//   // Reset all (for testing)
//   reset: () => {
//     const defaultEntities = [
//       {
//         id: "admin-1",
//         role: "admin",
//         username: "Admin",
//         email: "admin@example.com",
//         password: "Admin@123",
//         referralCode: "ADM01",
//         referredById: null,
//       },
//     ];
//     saveEntities(defaultEntities);
//     set({ entities: defaultEntities, currentUserId: null });
//   },
//   updateUser: (id, updates) => {
//   const entities = get().entities.map((u) =>
//     u.id === id ? { ...u, ...updates } : u
//   );
//   saveEntities(entities);
//   set({ entities });
// },
// }));
import { create } from "zustand";

// Helper to load from localStorage
const loadEntities = () => {
  const stored = localStorage.getItem("entities");
  if (stored) return JSON.parse(stored);

  // default admin with password
  return [
    {
      id: "admin-1",
      role: "admin",
      username: "Admin",
      email: "admin@example.com",
      password: "Admin@123", // fixed admin password
      referralCode: "ADM01",
      referredById: null,
      verified: true, // admin is always verified
    },
  ];
};

// Helper to save into localStorage
const saveEntities = (entities) => {
  localStorage.setItem("entities", JSON.stringify(entities));
};

export const useAppStore = create((set, get) => ({
  currentUserId: null,
  entities: loadEntities(),

  // Set logged in user
  setCurrentUser: (id) => set({ currentUserId: id }),

  // Get user by id
  getById: (id) => get().entities.find((e) => e.id === id) || null,

  // Get all children of parent
  childrenOf: (parentId) =>
    get().entities.filter((e) => e.referredById === parentId),

  // Counts
  counts: () => {
    const e = get().entities;
    return {
      admins: e.filter((x) => x.role === "admin").length,
      vendors: e.filter((x) => x.role === "vendor").length,
      mentors: e.filter((x) => x.role === "mentor").length,
      users: e.filter((x) => x.role === "user").length,
    };
  },

  // Add new user (with password & verified status)
  addUser: ({ id, username, email, role, referredById, referralCode, password }) => {
    const newEntities = [
      ...get().entities,
      { id, username, email, role, referredById, referralCode, password, verified: false },
    ];
    saveEntities(newEntities);
    set({ entities: newEntities });
  },

  // Update user by id
  updateUser: (id, updates) => {
    const entities = get().entities.map((u) =>
      u.id === id ? { ...u, ...updates } : u
    );
    saveEntities(entities);
    set({ entities });
  },

  // Validate login with email + password
  login: (email, password) => {
    const user = get().entities.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      set({ currentUserId: user.id });
      return user;
    }
    return null; // invalid login
  },

  // Reset all (for testing)
  reset: () => {
    const defaultEntities = [
      {
        id: "admin-1",
        role: "admin",
        username: "Admin",
        email: "admin@example.com",
        password: "Admin@123",
        referralCode: "ADM01",
        referredById: null,
        verified: true,
      },
    ];
    saveEntities(defaultEntities);
    set({ entities: defaultEntities, currentUserId: null });
  },
}));

