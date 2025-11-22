import type { IStaticMethods } from "preline/dist";

declare global {
  interface Window {
    // Optional third-party libraries for preline - enable as needed, also enable in main.ts
    // _;
    // $: typeof import("jquery");
    // jQuery: typeof import("jquery");
    // DataTable;
    // Dropzone;
    // VanillaCalendarPro;

    // Preline UI
    HSStaticMethods: IStaticMethods;
  }
}

export {};
