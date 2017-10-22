export default class IdentifiedUser {
    static IDENTIFIED_USER: string = 'identified_user';

    static getUserIdentified() {
        return window.localStorage.getItem(IdentifiedUser.IDENTIFIED_USER);
    }

    static setUserIdentified(user: any) {
        window.localStorage.setItem(IdentifiedUser.IDENTIFIED_USER, JSON.stringify(user));
    }

    static removeUserIdentified(): void {
        window.localStorage.removeItem(IdentifiedUser.IDENTIFIED_USER);
    }
}
