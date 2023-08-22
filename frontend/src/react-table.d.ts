declare module "react-table" {
  import {ComponentType} from "react";

  export interface TableInstance {}

  const useTable: <D extends object>(
    options: TableOptions<D>,
    ...plugins: PluginHook<D>[]
  ) => TableInstance<D>;
}
