import {createDeliveryClient} from "@kontent-ai/delivery-sdk";
import {Walk} from "../Models/content-types/walk";

export async function getWalks() {
  const deliveryClient = createDeliveryClient({
    projectId: 'fcbe81c7-c5c4-005d-4e52-9ae1bd03ab94',
  });

  // fetch items
  const response = await deliveryClient.items<Walk>()
    .type('walk')
    .toPromise();
  return response.data.items;
}
