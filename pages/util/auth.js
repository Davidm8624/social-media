import cookie from "js-cookie";
import Router from "next/router";

export const baseURL = `http://localhost:${process.env.PORT || 3000}`

export const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};

export const redirectUser = (ctx, location) => {
  if(ctx.req){
    ctx.res.writeHead(302, {Location: location})
    ctx.res.end()
  }else{
    Router.push(location)
  }
}