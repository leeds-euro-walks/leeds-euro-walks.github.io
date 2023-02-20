import {createDeliveryClient} from "@kontent-ai/delivery-sdk";
import {Walk} from "../Models/content-types/walk";
import {HomepageWelcomeText} from "../Models/content-types/homepage_welcome_text";

export async function fetchWalks() {
  const deliveryClient = createDeliveryClient({
    projectId: 'fcbe81c7-c5c4-005d-4e52-9ae1bd03ab94',
  });

  // fetch items
  const response = await deliveryClient.items<Walk>()
    .type('walk')
    .toPromise();
  return response.data.items.sort(orderWalkByNumber);
}
export async function fetchHomepageText() {
  const deliveryClient = createDeliveryClient({
    projectId: 'fcbe81c7-c5c4-005d-4e52-9ae1bd03ab94',
  });

  // fetch items
  const response = await deliveryClient.items<HomepageWelcomeText>()
    .type('homepage_welcome_text')
    .toPromise();
  return response.data.items;
}

function orderWalkByNumber(walk1: Walk, walk2: Walk) {
  return walk1.elements.number.value! < walk2.elements.number.value! ? -1 : 1;
}
