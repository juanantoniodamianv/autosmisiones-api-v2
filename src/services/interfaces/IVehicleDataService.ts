export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Make {
  id: string;
  name: string;
  categoryId: string;
}

export interface Model {
  id: string;
  name: string;
  makeId: string;
}

export interface Version {
  id: string;
  name: string;
  modelId: string;
  year: number;
  engine?: string;
}
