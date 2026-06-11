export const saveToken = (Token) =>{
    localStorage.setItem('access_token', Token.access)
    localStorage.setItem('refresh_token', Token.refresh)
}

export const cleartoken = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

export const getAcessToken =()=>{
    return localStorage.getItem('access_token')
}

export const authFetch = (url, options= {})=>{
    const token = getAcessToken();
    const headers = options.headers? {...options.headers}: {};
    if(token) headers["Authorization"] = `Bearer ${token}`;
    headers["Content-Type"] = "application/json";
    return fetch(url,{
        ...options,
        headers,
    })

}