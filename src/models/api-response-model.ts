export interface ApiResponseModel { 
    id: number, 
    name: string, 
    height: string, 
    weight: string, 
    types: {
    type: {
      name: string
    }
  }[]
}