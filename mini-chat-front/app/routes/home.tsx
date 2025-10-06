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
  email: z.string().email(),
  password: z.string().min(6),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const jsonData = Object.fromEntries(formData);
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    body: JSON.stringify(jsonData),
  });
  console.log(jsonData);
  
  const token = await response.json();
  console.log({token});
  
  return null;
};

export default function Home() {
  return <Welcome />;
}