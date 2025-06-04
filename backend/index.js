const express = require("express");
const {
  GOOGLE_OAUTH_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_ACCESS_TOKEN_URL,
} = require("./env");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const axios = require("axios");

const port = 4000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.get("/user", (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  res.cookie("token", "amit", {
    httpOnly: true,
    secure: true, // only over HTTPS
    sameSite: "None", // or "None" for cross-site
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  return res.json({ name: "sumit", age: 22 });
});
app.get("/auth/google", async (_, res) => {
  const state = "some_state";
  const scopes = [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
  ].join(" ");
  const authConsentUrl = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(authConsentUrl);
});

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.get("/some", (req, res) => {
  console.log(res);
});
app.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;
    const response = await axios.post(GOOGLE_ACCESS_TOKEN_URL, null, {
      params: {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
      },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const { access_token } = response.data;

    const {
      data: { name, email },
    } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.cookie("token", "some token", {
      httpOnly: true,
      secure: true, // only over HTTPS
      sameSite: "None", // or "None" for cross-site
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    return res.redirect("http://localhost:3000/dashboard");
  } catch (err) {
    // console.log(err);
    return res.json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
