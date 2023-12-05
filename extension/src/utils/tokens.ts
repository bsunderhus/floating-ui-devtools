export type ColorTokens = {
  stringColor: string;
  htmlElementColor: string;
  propertyColor: string;
};

export const tokens: Record<keyof ColorTokens, `var(--pdt-${keyof ColorTokens})`> = {
  stringColor: 'var(--pdt-stringColor)',
  htmlElementColor: 'var(--pdt-htmlElementColor)',
  propertyColor: 'var(--pdt-propertyColor)',
};
