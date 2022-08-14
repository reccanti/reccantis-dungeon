/**
 * Utility function for breaking up an array into separate chunks that are each
 * "partionSized"
 */
export function partition<T>(
  array: readonly T[],
  partitionSize: number
): readonly T[][] {
  const partitions: T[][] = [];
  let curPartition: T[] = [];

  array.forEach((item) => {
    curPartition.push(item);
    if (curPartition.length >= partitionSize) {
      partitions.push(curPartition);
      curPartition = [];
    }
  });

  if (curPartition.length > 0) {
    partitions.push(curPartition);
  }
  return partitions;
}
