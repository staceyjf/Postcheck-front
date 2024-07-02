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

interface DataPoint {
  x: number;
  y: Date;
}

interface StateDataPoint {
  color: string;
  data: DataPoint[];
  id: string;
}

export interface ReportingResponse {
  data: StateDataPoint[];
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
