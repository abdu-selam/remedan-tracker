import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    name: "",
    email: "",
    log: false
  },

  setName: (name) =>
    set((state) => ({
      user: {
        ...state.user,
        name,
      },
    })),

  setEmail: (email) =>
    set((state) => ({
      user: {
        ...state.user,
        email,
      },
    })),

  setLog: (log) =>
    set((state) => ({
      user: {
        ...state.user,
        log,
      },
    })),
}));

export default useStore;
