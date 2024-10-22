import { UserLoginData, UserRegistrationData } from "@/types/user";


//Validate user registration
export function UserRegistrationValidator(
    data: UserRegistrationData
): [boolean, ErrorObject] {

    let errors: ErrorObject = {};

    if (!data.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!data.firstName) {
        errors.firstName = "First name is required";
    }

    const hasErrors = Object.keys(errors).length > 0;

    return [hasErrors, errors];
}

//Validate user login
export function userLoginValidator(
    data: UserLoginData
): [boolean, ErrorObject] {

    let errors: ErrorObject = {};

    if (!data.email) {
        errors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!data.password) {
        errors.password = "Password is required";
    }

    const hasErrors = Object.keys(errors).length > 0;

    return [hasErrors, errors];
}

/* export default function userValidator(data: UserData): [boolean, ErrorObject] {
    let errors: ErrorObject = {};

    if (!data.firstName) {
        errors.firstName = "First name is required";
    }

    if (!data.lastName) {
        errors.lastName = "Last name is required";
    }

    if (!data.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email is invalid";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    const hasErrors = Object.keys(errors).length > 0;

    return [hasErrors, errors];
} */