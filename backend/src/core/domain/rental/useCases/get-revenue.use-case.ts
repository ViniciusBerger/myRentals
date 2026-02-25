import { IRentalRepository } from "src/core/app/ports/IRentalRepository";

export class GetRevenueUseCase {
    constructor(private readonly rentalRepository: IRentalRepository){}
    

    async getYearlyRevenue(){
        const revenue = await this.rentalRepository.getYearlyRevenueCurrentYear()

        return revenue
    }

    async getMonthlyRevenue(){
        const revenue = await this.rentalRepository.getMonthlyRevenueCurrentYear()
        return revenue
    }
}