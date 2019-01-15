- 2.1-3
```
// <a1, a2, a3, ..., an> 查找v
for j = 1 to A.length
  val = A[j]
  if val == v
    return j
return NIL
```
- 2.1-4
```
// A = []n
// B = []n
// C = []n+1
j = n
overflow = 0
while (j-- > 0)
  sumJ = A[j] + B[j]
  if overflow > 0
    sumJ += overflow
  if sumJ >= 2
    C[j + 1] = sumJ - 2
    overflow = 1
  else
    C[j + 1] = sumJ
    overflow = 0

C[j + 1] = overflow > 0 ? overflow : 0
overflow = 0

```

- 2.2-2
```
// selection sort
// A = <a1, a2, a3, ..., an>
for j = 1 to A.length - 1        // n - 1
  minIdx = j
  for i = j + 1 to A.length
    if (A[i] < A[minIdx])
      minIdx = i
  swap(minIdx, j)
// 
```