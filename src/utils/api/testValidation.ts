function testValidation(inputType: string, inputText: string) {
    let regexp: RegExp;
    switch (inputType) {
        case "first_name": regexp = /^[A-ZА-ЯЁ][a-zа-яё]*-?[a-zа-яё]*$/gi;
        break;
        case "second_name": regexp = /^[A-ZА-ЯЁ][a-zа-яё]*-?[a-zа-яё]*$/gi;
        break;
        case "login": regexp = /^(?![0-9]+$)[a-zA-Z0-9_-]{3,20}$/gi;
        break;
        case "email": regexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/gi;
        break;
        case "password": regexp = /^(?=.*[A-Z])(?=.*\d).{8,40}$/gi;
        break;
        case "phone": regexp = /^(\+\d{10,15}|\d{10,15})$/gi;
        break;
        default: regexp = /^(?!\s*$).+/gi
    }

    return regexp.test(inputText)
}

export default testValidation