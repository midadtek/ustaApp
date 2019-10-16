
export interface Usta {
    id?: string,
    name: string,
    img_profile?: string;
    img_gallery?: Array<string>
    img_file: string
    mobile: string,
    rate: number,
    description: string
    ustarate: number
    experienceyear: number,
    work_experience: string,
    price: number,
    locationCode: string,
    sectionIds: Array<string>
    subservices:Array<SubSection>
    whatsappmobile: string
    guarantee: string
    sex: string
    language: Array<string>
    nationality: Array<string>
    locations: Array<string>
    ustatype: Array<string>
    country
  }
  export interface Section {
    id?: string,
    section: string
    description: string
    ustacount: number
    icon: string
    active: boolean
    meta: string
  }
  export interface SubSection {
    id?: string,
    title: string
  }
  export interface Banner {
    id?: string;
    active: boolean;
    img: string;
  }
  export interface Rate {
    id?: string;
    client: string;
    message: string,
    ustaId: string;
    usta_name: string;
    rate_value: number;
    created_at: Date;
    active: boolean
  }
  export interface Country {
    id: string
    title: string
    active: boolean
    addedfrom: string
  }
  export interface City {
    id?: string
    title_ar: string
    title_tr: string
    lat: string
    lon: string
    ustacount: number
  }
  export interface Question {
    title: string
    description: string
  }
  export interface SectionLocation {
    sectionId: string
    locationId: string
    ustacount: number
  }
  
  export interface Nationality {
    id?: string
    active: boolean
    title_ar: string
    title_en: string
  }
