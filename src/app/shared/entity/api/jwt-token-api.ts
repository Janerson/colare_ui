export interface JwtToken {
    access_token?: string;
    token_type?:   string;
    expires_in?:   number;
    scope?:        string;
    nome?:         string;
    sobrenome?:    string;
    jti?:          string;
}

export interface JwtPayload {
    user_name?:   string;
    scope?:       string[];
    nome?:        string;
    exp?:         number;
    sobrenome?:   string;
    authorities?: string[];
    jti?:         string;
    client_id?:   string;
}

