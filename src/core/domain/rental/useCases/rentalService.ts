import { CreateRentalDto } from "../../adapters/dtos/createRentalDto.js";
import type { IRentalRepository } from "../ports/IRentalRepository.js";
import type { IRentalService } from "../ports/IRentalService.js";

export class RentalService implements IRentalService {
    private databaseAdapter: IRentalRepository
    
    constructor(){
        this.databaseAdapter =
    }
    
    createRental(dto: CreateRentalDto) {
        const rental = this.databaseAdapter.save(dto)
    }
    getRental(start_date: Date, clent_name: string) {
        throw new Error("Method not implemented.");
    }
    deleteRental(id: string) {
        throw new Error("Method not implemented.");
    }
    updateRental(id: string, toBeUpdated: any) {
        throw new Error("Method not implemented.");
    }

}