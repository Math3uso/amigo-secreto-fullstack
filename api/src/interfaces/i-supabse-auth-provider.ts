export interface AuthLoginResponse {
    accessToken: string;
    refrashToken: string;
    confirmationSentAt: string
}

export interface ISupabaseAuthProvider {
    register(email: string, password: string): Promise<{ userId: string }>
    logIn(email: string, password: string): Promise<AuthLoginResponse>
}