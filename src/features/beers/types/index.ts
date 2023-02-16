// PunkAPI types, according to https://punkapi.com/documentation/v2
export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Volume;
  boil_volume: BoilVolume;
  method: Method;
  ingredients: Ingredients;
  food_pairing: Array<string>;
  brewers_tips: string;
  contributed_by: string;
}

export interface Volume {
  value: number;
  unit: string;
}

export interface BoilVolume {
  value: number;
  unit: string;
}

export interface Method {
  mash_temp: Array<MashTemp>;
  fermentation: Fermentation;
  twist: string;
}

export interface MashTemp {
  temp: TempMashTemp;
  duration: number;
}

export interface TempMashTemp {
  value: number;
  unit: string;
}

export interface Fermentation {
  temp: TempFermentation;
}

export interface TempFermentation {
  value: number;
  unit: string;
}

export interface Ingredients {
  malt: Array<Malt>;
  hops: Array<Hops>;
  yeast: string;
}

export interface Malt {
  name: string;
  amount: Amount;
}

export interface Hops {
  name: string;
  amount: Amount;
  add: string;
  attribute: string;
}

export interface Amount {
  value: number;
  unit: string;
}

export interface BeerListFilters {
  abv_gt?: number;
  abv_lt?: number;
  ibu_gt?: number;
  ibu_lt?: number;
  ebc_gt?: number;
  ebc_lt?: number;
  beer_name?: string;
  yeast?: string;
  brewed_before?: string;
  brewed_after?: string;
  hops?: string;
  malt?: string;
  food?: string;
  ids?: string;
}