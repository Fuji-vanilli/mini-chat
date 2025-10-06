import { createCookieSessionStorage } from "react-router-dom";


const { getSession, commitSession} = createCookieSessionStorage({
    cookie: {
        name: "__session",
    }
});

export const getUserToken = async (request: Request) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("token");
    return token;
}

export const setUserToken = async (request: Request, token: string) => {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("token", token);
    const cookie = await commitSession(session);
    return cookie;
}

