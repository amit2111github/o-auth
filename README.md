i have used localtunnel to run backend on https kind of reverse proxy.
flow is like fe -> signin using google -> navigate to backend url. -> redirect google consent page
pass redirect url as some backend endpoint google will call that with "code" in query.
now using this code get access_token then from access_token get user_info
and now can redirect to FE with token in cookie.
