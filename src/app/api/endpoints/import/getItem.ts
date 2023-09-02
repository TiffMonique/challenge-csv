import { IItem } from "@/app/interfaces/Item.interface";
import { API_ENDPOINT } from "../../base";

async function getData() {
  const res = await fetch(API_ENDPOINT, { method: 'GET' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data.items as IItem[];
}
export default getData;