# Python3 program to implement traveling salesman 
# problem using naive approach. 
import sys
from sys import maxsize 
import json

  
V = float(sys.argv[1].split(",")[0])
mtx = [float(i) for i in sys.argv[2].split(",")]

V = int(V)

def to_matrix(l, n):
    return [l[i:i+n] for i in range(0, len(l), n)]

# implementation of traveling Salesman Problem 
def travellingSalesmanProblem(graph, s): 
  
    # store all vertex apart from source vertex 
    vertex = [] 
    for i in range(V): 
        if i != s: 
            vertex.append(i) 
  
    # store minimum weight Hamiltonian Cycle 
    min_path = maxsize
    min_ver = []
  
    while True: 
        # store current Path weight(cost) 
        current_pathweight = 0
  
        # compute current path weight 
        k = s 
        for i in range(len(vertex)): 
            current_pathweight += graph[k][vertex[i]] 
            k = vertex[i] 
        #current_pathweight += graph[k][s] 
  
        # update minimum 
        min_path = min(min_path, current_pathweight)
        if (min_path == current_pathweight):
            min_ver = vertex[:]

        if not next_permutation(vertex): 
            break
    return min_path, min_ver 
  
# next_permutation implementation 
def next_permutation(L): 
  
    n = len(L) 
  
    i = n - 2
    while i >= 0 and L[i] >= L[i + 1]: 
        i -= 1
  
    if i == -1: 
        return False
  
    j = i + 1
    while j < n and L[j] > L[i]: 
        j += 1
    j -= 1
  
    L[i], L[j] = L[j], L[i] 
  
    left = i + 1
    right = n - 1
  
    while left < right: 
        L[left], L[right] = L[right], L[left] 
        left += 1
        right -= 1
  
    return True
  
# Driver Code 
if __name__ == "__main__": 
    graph = to_matrix(mtx,int(V))
    # matrix representation of graph 
    # graph = [[0, 10, 15, 20], [10, 0, 35, 25],  
    #          [15, 35, 0, 30], [20, 25, 30, 0]] 
    # s = 0 
    # print(travellingSalesmanProblem(graph, s)) 
    s = 0
    c = { "min":travellingSalesmanProblem(graph, s)[0], "steps": travellingSalesmanProblem(graph, s)[1]}

    print(json.dumps(c))

    sys.stdout.flush()
  
# This code is con    print(V)tributed by 
# sanjeev2552 
