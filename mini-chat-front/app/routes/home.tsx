import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import type { ActionFunctionArgs } from "react-router-dom";
import { object } from "zod";
import { z } from "zod";

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const jsonData = Object.fromEntries(formData);
  const parsedData = loginSchema.parse(jsonData);
  
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    body: JSON.stringify(parsedData),
    headers: {"Content-Type": "application/json"},
  });
  console.log(parsedData);

  const token = await response.json();
  console.log({token});
  
  return null;
};

export default function Home() {
  return <Welcome />;
}