export function check(
  predicate: Function,
  onSuccess: Function,
  onFail: Function
) {
  const key = predicate();
  if (key) {
    onSuccess("yes");
  } else {
    onFail("no");
  }
}
