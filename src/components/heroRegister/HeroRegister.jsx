// daisyUI Hero with form
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";

const HeroRegister = () => {
  const auth = getAuth(app);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log("handle button works");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accept = e.target.checkbox.checked;
    console.log(email, password, accept);

    // clint site validation without sending to firebase
    if (password.length < 6) {
      setRegError(
        "Your Password is weak! Should be at least 6 characters or longer"
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegError(
        "Your password should have at least one upper case characters."
      );
      return;
    } else if (!accept) {
      setRegError("Pleace accept our terms & conditions.");
      return;
    }

    // reset error & success
    setRegError("");
    setRegSuccess("");

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setRegSuccess("Your account has been created");
      })
      .catch((error) => {
        console.error(error);
        setRegError(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>

                  {/* password eye  */}
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="input input-bordered w-full"
                    />
                    <div
                      onClick={() => setShowPass(!showPass)}
                      className="absolute top-4 right-4 text-lg cursor-pointer"
                    >
                      {showPass ? <AiOutlineEye /> : <AiFillEyeInvisible />}
                    </div>
                  </div>

                  {/* terms and conditions checkbox  */}
                  <br />
                  <div className="flex gap-1 items-center">
                    <input className="" type="checkbox" name="checkbox" id="" />
                    <label htmlFor="checkbox">
                      <a href="" className="underline">
                        Accept our terms & conditions.
                      </a>
                    </label>
                  </div>
                  <br />

                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>

              {regError && (
                <p className="text-sm text-red-600 mt-2 mx-auto">
                  Error: {regError}
                </p>
              )}
              {regSuccess && (
                <p className="text-sm text-green-600 mt-2 mx-auto">
                  Success: {regSuccess}
                </p>
              )}
              <p>
                Already have an account? Please <Link to="/login" className="underline font-bold">Login</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
