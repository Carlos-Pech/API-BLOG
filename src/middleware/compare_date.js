import moment from "moment";

// Función para validar si la suscripción ha finalizado
export const hasSubscriptionEnded = (userSubscriptionStartDate, planDuration) => {
    // Convertir la duración del plan a días
    const durationInDays = convertDurationToDays(planDuration);

    // Obtener la fecha de inicio de la suscripción sin la hora
    const subscriptionStartDate = moment(userSubscriptionStartDate).startOf("day");

    // Obtener la fecha de finalización de la suscripción sumando la duración del plan en días
    const subscriptionEndDate = moment(subscriptionStartDate).add(durationInDays, "days");

    // Obtener la fecha actual sin la hora
    const currentDate = moment().startOf("day");

    // Comparar la fecha actual con la fecha de finalización de la suscripción
    const hasEnded = currentDate > subscriptionEndDate;

    // Devolver un objeto con la fecha de finalización de la suscripción y un booleano indicando si ha finalizado o no
    return {
        subscriptionEndDate,
        hasEnded
    };
};


// Función para convertir la duración a días
const convertDurationToDays = (duration) => {
    const regex = /(\d+)\s*(d[ií]as?|semanas?|mes(es)?|años?)/i;
    const match = duration.match(regex);
    if (!match) {
        return 0;
    }
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    switch (unit) {
        case "dia":
        case "días":
            return value;
        case "semana":
        case "semanas":
            return value * 7;
        case "mes":
        case "meses":
            // Utilizar Moment.js para manejar duraciones de meses
            return value * 30;
        case "año":
        case "años":
            // Considerar un año como 365 días
            return value * 365;
        default:
            return 0;
    }
};