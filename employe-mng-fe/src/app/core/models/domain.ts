// export interface User{

// }
// export interface Nanufactyrer{

// }


export interface City{
    zip_code:number;
    name:string;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    role: string;
  }

  
export interface Manufacturer {
    id: number,
    company_number: string,
    name: string,
    tax_number: string,
    city: City
  }
  
  export interface ManufacturerDTO {
    id: number,
    company_number: string,
    name: string,
    tax_number: string,
    city: number;
  }
  
  