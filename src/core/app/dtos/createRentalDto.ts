import { IsString, IsNotEmpty, IsNumber, MaxLength, MinLength, IsDate, ValidateIf} from 'class-validator';
import { Type } from 'class-transformer'
export class CreateRentalDto {

    // client name splitted in two to follow normalization rules for SQL databases
    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    @MinLength(3)
    clientFirstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    @MinLength(3)
    clientLastName: string;

    // check both start and end dates; check if its valid date; check if "start date" is before "end date"
    @IsNotEmpty()
    @Type(()=> Date)
    @IsDate()
    startDate: Date

    @IsNotEmpty()
    @Type(()=> Date)
    @IsDate()
    @ValidateIf(o => o.startDate < o.endDate, {message: "End date must be after starting date."})
    endDate: Date

    @IsNotEmpty()
    @IsNumber()
    revenue: number;

}

