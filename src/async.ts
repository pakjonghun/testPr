export async function async(a: boolean) {
  if (a) return Promise.reject("error");
  else return Promise.resolve({ status: 200, action: "action" });
}
