import { seedSubscriptions } from "../data/seedSubscriptions";

const STORAGE_KEY = "subscription-tracker-data";
const SIMULATE_ERROR = false;

const wait = (milliseconds = 500) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const getStoredSubscriptions = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (!storedData) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(seedSubscriptions)
    );

    return seedSubscriptions;
  }

  return JSON.parse(storedData);
};

const saveSubscriptions = (subscriptions) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(subscriptions)
  );
};

export const getSubscriptions = async () => {
  await wait();

  if (SIMULATE_ERROR) {
    throw new Error(
      "Unable to load subscriptions."
    );
  }

  return getStoredSubscriptions();
};

export const getSubscription = async (id) => {
  await wait();

  const subscriptions = getStoredSubscriptions();

  return subscriptions.find(
    (subscription) => subscription.id === id
  );
};

export const createSubscription = async (subscriptionData) => {
  await wait();

  const subscriptions = getStoredSubscriptions();

  const newSubscription = {
    ...subscriptionData,
    id: `sub-${Date.now()}`,
  };

  const updatedSubscriptions = [
    ...subscriptions,
    newSubscription,
  ];

  saveSubscriptions(updatedSubscriptions);

  return newSubscription;
};

export const updateSubscription = async (
  id,
  subscriptionData
) => {
  await wait();

  const subscriptions = getStoredSubscriptions();

  const updatedSubscriptions = subscriptions.map(
    (subscription) =>
      subscription.id === id
        ? {
            ...subscription,
            ...subscriptionData,
          }
        : subscription
  );

  saveSubscriptions(updatedSubscriptions);

  return updatedSubscriptions.find(
    (subscription) => subscription.id === id
  );
};

export const deleteSubscription = async (id) => {
  await wait();

  const subscriptions = getStoredSubscriptions();

  const updatedSubscriptions = subscriptions.filter(
    (subscription) => subscription.id !== id
  );

  saveSubscriptions(updatedSubscriptions);

  return true;
};