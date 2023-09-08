import { ItemProps } from "@/app/interfaces/Item.interface";
import { API_ENDPOINT } from "../../base";

async function postData(data: ItemProps) {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const dat = await res.json();
    return dat;   
  } catch (error) {
    console.error('Error in postData:', error);
    throw error;
  }
}

export default postData;
