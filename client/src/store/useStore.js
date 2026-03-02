import { create } from "zustand";

const useStore = create((set) => ({
  user: {
    name: "",
    email: "",
    initiated: false,
    log: false,
    alert: false,
    today: 1,

    ibada: {
      quran: {
        data: [],
        progress: "",
      },
      zhikr: {
        data: [],
        progress: "",
      },
      terawih: {
        data: [],
        progress: "",
      },
    },

    progress: {
      today: "",
      total: "",
    },
  },

  setName: (name) =>
    set((state) => ({
      user: { ...state.user, name },
    })),

  setEmail: (email) =>
    set((state) => ({
      user: { ...state.user, email },
    })),

  setInitiated: (initiated) =>
    set((state) => ({
      user: { ...state.user, initiated },
    })),

  setLog: (log) =>
    set((state) => ({
      user: { ...state.user, log },
    })),

  setAlert: (alert) =>
    set((state) => ({
      user: { ...state.user, alert },
    })),

  setToday: (today) =>
    set((state) => ({
      user: { ...state.user, today },
    })),

  setQuran: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          quran: {
            ...state.user.ibada.quran,
            data,
          },
        },
      },
    })),

  setTerawih: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          terawih: {
            ...state.user.ibada.terawih,
            data,
          },
        },
      },
    })),

  setZhikr: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          zhikr: {
            ...state.user.ibada.zhikr,
            data,
          },
        },
      },
    })),

  setQuranProgress: (progress) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          quran: {
            ...state.user.ibada.quran,
            progress,
          },
        },
      },
    })),

  setTerawihProgress: (progress) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          terawih: {
            ...state.user.ibada.terawih,
            progress,
          },
        },
      },
    })),

  setZhikrProgress: (progress) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          zhikr: {
            ...state.user.ibada.zhikr,
            progress,
          },
        },
      },
    })),

  setTodayProgress: (today) =>
    set((state) => ({
      user: {
        ...state.user,
        progress: {
          ...state.user.progress,
          today,
        },
      },
    })),

  setTotalProgress: (total) =>
    set((state) => ({
      user: {
        ...state.user,
        progress: {
          ...state.user.progress,
          total,
        },
      },
    })),

  setSingleDayQuran: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          quran: {
            ...state.user.ibada.quran,
            data: state.user.ibada.quran.data.map((elem) => {
              if (elem.remedan != data.remedan) {
                return elem;
              }
              return data;
            }),
          },
        },
      },
    })),

  setSingleDayTerawih: (data) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          terawih: {
            ...state.user.ibada.terawih,
            data: state.user.ibada.terawih.data.map((elem) => {
              if (elem.remedan != data.remedan) {
                return elem;
              }
              return data;
            }),
          },
        },
      },
    })),

  setSingleDayZhikr: (data, name) =>
    set((state) => ({
      user: {
        ...state.user,
        ibada: {
          ...state.user.ibada,
          zhikr: {
            ...state.user.ibada.zhikr,
            data: state.user.ibada.zhikr.data.map((elem) => {
              if (elem.remedan == data.remedan) {
                elem.zhikr[name] = {
                  amount: data.amount,
                  description: data.description,
                  limit: data.limit,
                  progress: data.progress,
                };
              }
              return elem;
            }),
          },
        },
      },
    })),
}));

export const useLocalStore = create((set) => ({
  updated: [],

  dashboard: [
    {
      text: "This green animated box shows your today's data. To update it, click it, enter the amount you read from the Quran, then press 'Enter' or click the 'Update' button at the top.",
      style: "top-90 left-10",
    },
    {
      text: "These three buttons help you navigate through your Quran, Zhikr, and Terawih progress.",
      style: "bottom-20 left-10",
    },
    {
      text: "This is your daily and mothly progress!",
      style: "top-27 left-20",
    },
  ],

  zhikr: [
    {
      text: "Click this menu button to view different Zhikr plans.",
      style: "top-55  left-12",
    },
  ],

  setUpdated: (newUpdate) =>
    set((state) => ({
      updated: [...new Set([...state.updated, ...newUpdate])],
    })),
}));

export default useStore;
