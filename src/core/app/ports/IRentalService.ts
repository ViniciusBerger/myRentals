export interface IRentalService{
    createRental(data: string): any;
    
    getRental(start_date: Date, clent_name: string): any;
    
    deleteRental(id: string): any;

    updateRental(id: string, toBeUpdated: any): any; 
}