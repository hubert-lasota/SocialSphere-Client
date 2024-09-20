export default function filterDuplicateElementsInArray<T>(arr: Array<T>, predicate: (element1: T, element2: T) => boolean): Array<T> {
  if(!arr || !(arr.length > 0)) {
    return [];
  }
  const result: Array<T> = [];
  result.push(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    let predicateResult = false;
    for (let j = 0; j < result.length; j++) {
      if (!predicate(result[j], arr[i])) {
        predicateResult = false;
        break;
      }
      predicateResult = true;
    }
    if (predicateResult) result.push(arr[i]);
  }

  return result;
}
