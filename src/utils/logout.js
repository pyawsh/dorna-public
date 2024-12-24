export const hardLogoutLocalStorage = () => {
    localStorage.setItem("logged_in", false);
    localStorage.removeItem("token");
    localStorage.removeItem("mobile");
    localStorage.removeItem("last_auth_date");
    localStorage.removeItem("user_id");
};

export const softLogoutLocalStorage = () => {
    localStorage.setItem("logged_in", false);
    // localStorage.removeItem("user_id", false);
};