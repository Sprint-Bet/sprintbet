export interface JwtBody {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    nbf: number;
    roomId: string;
    voterId: string;
}