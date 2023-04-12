import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/apiCalls";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header">
                      <h3 class="text-center font-weight-light my-4">
                        Đăng Nhập
                      </h3>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputName"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="name@example.com"
                          />
                          <label for="inputName">Tên đăng nhập</label>
                        </div>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputPassword"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                          />
                          <label for="inputPassword">Mật khẩu</label>
                        </div>
                        <div class="form-check mb-3">
                          <input
                            class="form-check-input"
                            id="inputRememberPassword"
                            type="checkbox"
                            value=""
                          />
                          <label
                            class="form-check-label"
                            for="inputRememberPassword"
                          >
                            Nhớ mật khẩu
                          </label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button class="btn btn-primary" onClick={handleClick}>
                            Đăng Nhập
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="card-footer text-center py-3">
                      <div class="small">
                        <a href="register.html">Need an account? Sign up!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright &copy; Your Website 2022</div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
