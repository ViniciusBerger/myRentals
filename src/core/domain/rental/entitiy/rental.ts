
export class Rental {
    clientFirstName:string;
    clientLastName: string;
    startDate: Date;
    endDate: Date;
    revenue: number;
    id?: string;
    createdAt?: Date;

    constructor(clientFirstName: string, clientLastName: string, startDate: Date, endDate: Date, revenue: number,id?: string, createdAt?: Date) {
        
        this.clientFirstName= clientFirstName;
        this.clientLastName = clientLastName;
        this.startDate = startDate;
        this.endDate = endDate
        this.revenue = revenue
        this.id = id;
        this.createdAt = createdAt
    }
}