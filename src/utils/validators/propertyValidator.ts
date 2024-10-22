//src/utils/validators/propertyValidator.ts

import { PropertyData } from "@/types/property";

export default function propertyValidator(data: PropertyData): [boolean, ErrorObject] {
    let errors: ErrorObject = {};

    if (!data.name) {
        errors.name = "Property name is required";
    }

    if (data.description.length < 10) {
        errors.description = "Description must be at least 10 characters";
    }

    if (!data.location) {
        errors.location = "Location is required";
    }

    if (!data.pricePerNight) {
        errors.pricePerNight = "Price per night is required";
    } else if (data.pricePerNight < 0) {
        errors.pricePerNight = "Price per night must be a positive number";
    }



    const hasErrors = Object.keys(errors).length > 0;

    return [hasErrors, errors];
}