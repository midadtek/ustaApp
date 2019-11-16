
export interface Usta {
    id?: string,
    name: string,
    hash_id?
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
    social
    email
    pricein
    workday
    location
    producercompany
    created_at
    language: Array<string>
    nationality: Array<string>
    locations: Array<any>
    ustatype: Array<string>
    country
    latitude
    longitude
    typeOfconstruction
    numberOfRooms
    Typeofcar
    fuel
    year
    modelOfCar
    gear
    plate
    lift
    deposit
    Furnished
    periodicExpenses
    withinTheComplex
    Delivery
    typedescription
    address
    typecompany
    branchescompany
    hourswork
    targetmarkets
    paymentby
    transporation
    aboutstaffresturant
    companyfeatures
    addresssubcompany1
    servicesubcompany1
    addresssubcompany2
    servicesubcompany2
    addresssubcompany3
    servicesubcompany3
    resturantmenu
    resturantfeatures
    phoneLine
    othernumbers
    webaddress
    facebook
    twitter
    instegram
    
  
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
  export interface years{
    id:string;
    year:number;
  }
  export interface Plate{
    id:string;
    title_ar:string;
    title_en:string
  }
  
  export interface Typeofconstruction{
    id:string;
    title_ar:string;
    title_en:string
  }
  export interface NumberOfRooms{
    id:string;
    room:string;
    order:number
  }
  export interface Fuel{
    id:string;
    title_ar:string;
    title_en:string
  }
  export interface modelsOfCars{
    id:string;
    title:string;
  }
  export interface Gear{
    id:string;
    title_ar:string;
    title_en:string
  }
  export interface Country {
    id: string
    title: string
    active: boolean
    addedfrom: string
    country
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
