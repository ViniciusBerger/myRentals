import { addRental } from "./rental-service";
import { loadRevenue } from "./revenue-service"

// fetch and return both yearly and monthly revenue
export const loadDashboardRevenues = async ()=> {
    const revenues:any[] = await loadRevenue();

    return revenues
}

// fetch database and post new rental, delegate heavy lift to rental-service
export const loadDashboardAddRental = async(rentalData: any)=> {
    const rentalAdded = await addRental(rentalData)

    return rentalAdded
}

