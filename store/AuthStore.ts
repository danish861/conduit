import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import { postUser } from "../APIs/user";
import { setCookie } from "cookies-next";

// import { enableStaticRendering } from "mobx-react-lite";
// // there is no window object on the server
// enableStaticRendering(typeof window === "undefined");
// import { create } from "mobx-persist";

class AuthStore {
  @persist username = "";
  @persist image = "";
  @persist isLoggedIn = false;
  @persist token = "";
  error = "";

  constructor() {
    makeAutoObservable(this, {
      username: observable,
      image: observable,
      token: observable,
      error: observable,
      postLogInUsers: action,
    });
  }

  async postSignUpUsers(url: string, body: any) {
    try {
      const response = await postUser(url, body);

      this.isLoggedIn = true;
      this.username = response.user.username;
      this.image = response.user.image;
      const tokenValue = response.user.token;
      localStorage.setItem("token", tokenValue);
      this.token = tokenValue;
      setCookie("authToken", response.user.token, {
        maxAge: 30 * 24 * 60 * 60,
      });
      return response;
    } catch (error: any) {
      if (
        error.response?.data.errors.username &&
        error.response.data.errors.email
      ) {
        this.error = "username and email have already been taken ";
      } else if (error.response.data.errors.email) {
        this.error = "email has already been taken ";
      } else if (error.response.data.errors.username) {
        this.error = "username has already been taken ";
      }

      return error;
    }
  }

  async postLogInUsers(url: string, body: any) {
    try {
      const data = await postUser(url, body);
      console.log("response for login", data);
      this.isLoggedIn = true;
      this.username = data.user.username;
      this.image = data.user.image;
      const tokenValue = data.user.token;
      localStorage.setItem("token", tokenValue);
      this.token = tokenValue;
      setCookie("authToken", data.user.token, {
        maxAge: 30 * 24 * 60 * 60,
      });

      return data;
    } catch (err: any) {
      console.log(err);
      this.error = err.response.data.errors["email or password"][0];
      return err;
    }
  }

  async hydrate(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }
}

// export default new AuthStore();
// const hydrate = create();

const authStore = new AuthStore();
export default authStore;

// hydrate("authStore", authStore).then(() => {
//   // persisted data has been loaded into the store
//   console.log(authStore);
// });
