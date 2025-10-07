import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router-dom";
import { json, z } from "zod";
import { commitUserToken, getUserToken } from "~/sessions.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const tokenSchema = z.object({
  access_token: z.string(),
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userToken = await getUserToken(request);
  const isLoggedIn = Boolean(userToken);
  return { isLoggedIn };
}; 

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const jsonData = Object.fromEntries(formData);
  const parsedData = loginSchema.parse(jsonData);
  
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    body: JSON.stringify(parsedData),
    headers: {"Content-Type": "application/json"},
  });


  const { access_token } = tokenSchema.parse(await response.json());
  console.log(access_token);
  const headers = new Headers();
  headers.set("Set-Cookie", await commitUserToken(request, access_token));

  return redirect("", {
    headers : {
      "Set-Cookie": await commitUserToken(request, access_token)
    }
  });
};

export default function Home() {
  return <Welcome />;
}