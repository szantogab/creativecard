import { DropDownHolder } from './DropdownHolder';
import hu from '../locales/hu';

const translateOrDefault = (error: any, message?: string) => {
    const translated = hu[error];
    if (!translated) {
        if (message) { return message; }
        return hu.some_error_happened + ' (' + error + ')';
    }
    return translated;
};

export const getErrorMessage = (error: any) => {
    if (typeof error === 'string') { return translateOrDefault(error); }
    if (error && error.networkError) { return hu.no_server_connection; }
    if (error.graphQLErrors && error.graphQLErrors.length !== 0) { return translateOrDefault(error.graphQLErrors[0].message); }
    if (typeof error === 'object' && error.message) { return translateOrDefault(error.message); }
};

export const handleError = (err: Error) => {
    console.log(err);
    if (err) {
        DropDownHolder.dropDown.addNotification({
            message: getErrorMessage(err),
            level: 'error'
        });
    }
};