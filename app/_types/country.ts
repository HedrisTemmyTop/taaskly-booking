export interface CountryInterface {
  name: { common: string; official: string };
  flags: { svg: string };
  idd: { root: string; suffixes: string[] };
}
