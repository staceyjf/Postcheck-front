export interface PostCodeForm {
  associatedSuburbs?: SuburbResponse[];
  id?: number;
  postcode?: string;
}

export interface PostCodeResponse {
  associatedSuburbs: SuburbResponse[];
  id: number;
  postcode: string;
}

export interface SuburbForm {
  id?: number;
  name?: string;
  state?: string;
}

export interface SuburbResponse {
  id: number;
  name: string;
  state: string;
}

export interface UserForm {
  email?: string;
  password?: string;
  username: string;
}

export interface UserResponse {
  email?: string;
  password?: string;
  username: string;
}
