import { create } from "zustand";
import type {
  IPresupuesto,
  IPresupuestoItem,
  IPresupuestoVendedor,
} from "../types/presupuestos";
import type { Cliente } from "../types/clientes";

type AuthState = {
  isLogged: boolean;
  error: string | null;
  nombre: string | null;
  login: () => void;
  logout: (msg: string | null) => void;
  setNombre: (nombre: string) => void;
};

export const useAuth = create<AuthState>((set) => ({
  isLogged: false,
  error: null,
  nombre: null,
  login: () => {
    set({ isLogged: true });
    set({ error: null });
    //usePresupuestoStore.getState().reset();
  },

  logout: (msg: string | null) => {
    localStorage.removeItem("token");
    set({ isLogged: false });
    set({ error: msg });
  },

  checkToken: () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({ isLogged: false });
      return;
    }
    return;
  },
  setNombre: (nombre: string) => set({ nombre: nombre }),
}));

type PresupuestoStore = {
  presupuesto: IPresupuesto;
  // setters genéricos
  setPresupuesto: (data: Partial<IPresupuesto>) => void;
  reset: () => void;

  // acciones específicas
  setPaciente: (paciente: Cliente | null) => void;
  setRazonSocial: (paciente: Cliente | null) => void;
  setObraSocial: (paciente: Cliente | null) => void;
  setCobertura: (valor: number) => void;
  addItem: (item: IPresupuestoItem) => void;
  updateItem: (data: IPresupuestoItem) => void;
  removeItem: (codigo: string) => void;
  addVendedor: (v: IPresupuestoVendedor) => void;
};

const initialPresupuesto: Presupuesto = {
  paciente: null,
  razonSocial: null,
  obraSocial: null,
  items: [],
  seleccionWidex: [],
  vendedores: [],
  nroOrdenDeCompra: "",
  certificadoDiscapacidad: "",
  cobertura: 0,
};

export const usePresupuestoStore = create<PresupuestoStore>((set) => ({
  presupuesto: initialPresupuesto,
  // actualizar parcialmente
  setPresupuesto: (data) =>
    set((state) => ({
      presupuesto: { ...state.presupuesto, ...data },
    })),

  reset: () => set({ presupuesto: initialPresupuesto }),

  // acciones específicas
  setPaciente: (paciente) =>
    set((state) => ({
      presupuesto: { ...state.presupuesto, paciente: paciente },
    })),
  setRazonSocial: (razonSocial) =>
    set((state) => ({
      presupuesto: { ...state.presupuesto, razonSocial: razonSocial },
    })),
  setObraSocial: (obraSocial) =>
    set((state) => ({
      presupuesto: { ...state.presupuesto, obraSocial: obraSocial },
    })),
  setCobertura: (valor) =>
    set((state) => ({
      presupuesto: { ...state.presupuesto, cobertura: valor },
    })),

  addItem: (item) =>
    set((state) => ({
      presupuesto: {
        ...state.presupuesto,
        items: [...state.presupuesto.items, item],
      },
    })),

  updateItem: (data: IPresupuestoItem) =>
    set((state) => ({
      presupuesto: {
        ...state.presupuesto,
        items: state.presupuesto.items.map((i) =>
          i.codArticu === data.codArticu ? { ...i, ...data } : i
        ),
      },
    })),

  removeItem: (codigo) =>
    set((state) => ({
      presupuesto: {
        ...state.presupuesto,
        items: state.presupuesto.items.filter((i) => i.codArticu !== codigo),
      },
    })),

  addVendedor: (v) =>
    set((state) => ({
      presupuesto: {
        ...state.presupuesto,
        vendedores: [...state.presupuesto.vendedores, v],
      },
    })),
}));
