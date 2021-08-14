import React from "react";
import InputComponent from "../../../components/InputComponent";
import { isError, isGlobalError } from "../../../helpers/isError";
import { adminLogin } from "./services";
import ErrorComponent from "../../../components/ErrorComponent";
import { Lock } from "@material-ui/icons";

export default function AdminLogin() {
  const [errors, setErrors] = React.useState([]);
  const [load, setLoad] = React.useState<any>(false);
  const [state, setState] = React.useState<any>({});

  function handleState(key: string, value: any) {
    let clone = { ...state };
    clone[key] = value;
    setState(clone);
  }

  function handleLogin(event: any) {
    event.preventDefault();
    setLoad(true);

    adminLogin(state)
      .then(() => {
        setLoad(false);
        window.location.replace("/admin");
      })
      .catch((err) => {
        setLoad(false);
        setErrors(err.response.data.errors);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/imgs/icon.png"
            alt="Biznes"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <span className="font-medium text-indigo-600 hover:text-indigo-500">
              Welocme to admin panel
            </span>
          </p>
        </div>
        <form
          className="mt-8 rounded-md shadow-md p-8 "
          method="POST"
          onSubmit={handleLogin}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-4">
            <InputComponent
              error={isError(errors, "auth").status}
              helperText={isError(errors, "auth").value}
              type="email"
              label="Email address"
              disabled={load}
              required={true}
              onChange={(event: any) => handleState("auth", event.target.value)}
            />
            <InputComponent
              error={isError(errors, "password").status}
              helperText={isError(errors, "password").value}
              type="password"
              label="Password"
              disabled={load}
              required={true}
              onChange={(event: any) =>
                handleState("password", event.target.value)
              }
            />
          </div>

          <ErrorComponent text={isGlobalError(errors)} />

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
