import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  const id = setInterval(() => {
    subscriber.next("test");
    console.log("leak");
  }, 1000);

  return () => {
    clearInterval(id);
  };
});

const subscription = observable.subscribe({
  next: (value) => {
    console.log(value);
  },
  complete: () => {
    console.log("completed call!");
  },
  error: (error) => {
    console.error(error);
  },
});
setTimeout(() => {
  subscription.unsubscribe();
}, 4000);
