import { api } from ".";

export async function userSignIn(email: string): Promise<UserType & {token: string}> {
    return api.post(`/users/signIn`, {
        email
    })
    .then(res => res.data)
    .catch(err => {
        console.error(err);
        return null
    })

}
export async function userSignUp (email: string): Promise<UserType> {
    return api.post(`/users`, {
        user: {
            email,
            name: email
        }
    })
    .then(res => res.data)
    .catch(err => {
        console.error(err);
        return null
    })

}