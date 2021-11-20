
export interface Book{
  name: string;
  description?:string;
  author:string;
  photoURL: string;
  photoPath?: string;
  lender:boolean;
  year: number;
  code :string;
  id?: string;
}
