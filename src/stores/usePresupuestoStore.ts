import { create } from "zustand";
import type { dataSelect } from "../types/dataSelect";
import type { articulo } from "../types/articulo";

type ContadorState = {
  paciente: dataSelect | null;
  razonSocial: dataSelect | null;
  obraSocial: dataSelect | null;
  detalle: articulo[];
  setPaciente: (pac: dataSelect | null) => void;
  setRazonSocial: (rs: dataSelect | null) => void;
  setObraSocial: (os: dataSelect | null) => void;
  setDetalle: (detalle: articulo[]) => void;
  reset: () => void;
};

export const usePresupuestoStore = create<ContadorState>((set) => ({
  paciente: null,
  razonSocial: null,
  obraSocial: null,
  detalle: [],
  setPaciente: (pac) => {
    set({ paciente: pac });
  },
  setRazonSocial: (rs) => {
    set({ razonSocial: rs });
  },
  setObraSocial: (os) => {
    set({ obraSocial: os });
  },
  setDetalle: (det) => {
    set({ detalle: det });
  },
  reset: () =>
  {
    set({ paciente: null });
    set({ obraSocial: null });
    set({ razonSocial: null });
    set({ detalle: [] });
  }
}));

type AuthState = {
  isLogged: boolean;
  error: string | null
  nombre: string | null
  login: () => void;
  logout: (msg : string | null) => void;
  setNombre: (nombre: string) => void;
};

export const useAuth = create<AuthState>((set) => ({
  isLogged: false,
  error : null,
  nombre: null,
  login: () => {
    set({ isLogged: true });
    set({ error: null });
    usePresupuestoStore.getState().reset();
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
  }, setNombre: (nombre: string ) => set({nombre: nombre})
}));