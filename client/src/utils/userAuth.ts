import { userLoginInfo, userSignUpInfo } from "../types/User";
const isBroken = async () => {
    return false;
}
export const UserSignUp = async (userInfo: userSignUpInfo) => {
    try {
        const Response = await fetch("http://localhost:8000/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                password: userInfo.password,
                budget_limit: userInfo.budgetLimit,
            }),
        });
        if (Response.ok) {
            const data = await Response.json();
            localStorage.setItem("token", data.token);
            return true;
        } else {
            return await isBroken();
        }
    } catch (error) {
        return await isBroken();
    }
};

export const userLogin = async (userInfo: userLoginInfo) => {
    try {
        const Response = await fetch("http://localhost:8000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email: userInfo.email, password: userInfo.password }),
        })
        if (Response.ok) {
            const data = await Response.json();
            localStorage.setItem("token", data.token);
            return true;
        }
        else {
            return await isBroken();
        }
    }
    catch (error) {
        return await isBroken();
    }

};
