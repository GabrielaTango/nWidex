import type { Cliente } from "./clientes";

export interface IPresupuesto {
  paciente: Cliente | null;
  razonSocial: Cliente | null;
  obraSocial: Cliente | null;
  items: IPresupuestoItem[];
  seleccionWidex: IPresupuestoVendedor[];
  vendedores: IPresupuestoVendedor[];
  nroOrdenDeCompra: string;
  certificadoDiscapacidad: string;
  cobertura: number;
}

export interface IPresupuestoItem {
  codArticu: string;
  descripcio: string;
  descAdic: string;
  cantidad: number;
  precio: number;
  importe: number;
  cobertura: number;
  diferencia: number;

  sinonimo?: string;
  codBarra?: string;

  value?: string;
  label?: string;
}

export interface IPresupuestoVendedor {
  codigo: string;
  nombre: string;
  comision: number;
}
