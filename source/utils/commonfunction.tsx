import NetInfo from "@react-native-community/netinfo";

export function validateIsEmail(email: string) {
    let reg = RegExp("^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+");
    return reg.test(email);
}

export function validateIsPhoneNumber(phone: string) {
    let reg = RegExp("[0-9]{10}$");
    return reg.test(phone);
}

export default class NetworkUtils {
    static async isNetworkAvailable() {
        const response = await NetInfo.fetch();
        return response.isConnected;
    }
}

