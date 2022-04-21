package chapter08.problem_a;

import java.lang.*;
import java.util.*;

public class Main {
    public static final Scanner scanner = new Scanner(System.in);

    /**
     * @param N     그래프의 정점의 수
     * @param adj   2차원 인접 행렬
     * @return      깊이 우선 탐색으로 탐색된 노드들의 번호 리스트
     */
    public static ArrayList<Integer> getDfsOrder(int N, boolean[][] adj){
        ArrayList<Integer> visitedNodes = new ArrayList<>();

        Stack<State> dfsStack = new Stack<>();
        State initialState = new State(1, 1);
        dfsStack.add(initialState);

        boolean visited[] = new boolean[N+1];

        while(dfsStack.isEmpty() == false){ // 스택이 다 빌 때까지 반복한다.

            // 스택에서 탐색할 상태 값을 가져온다.
            State current = dfsStack.pop(); // 최초에 넣은 state 1 1 부터 시작한다.

            // 이미 방문한 노드라면 건너 뛴다.
            if(visited[current.nodeIndex]){
                continue;
            }

            // 방문 한 것으로 처리한다.
            visited[current.nodeIndex] = true;
            visitedNodes.add(current.nodeIndex);

            for(int i=adj[current.nodeIndex].length-1; i>0; i--){ // 현재 노드와 이어진 노드를 체크한다.
                //여기서 주의해야할 점은 여러 경로가 존재한다면 인덱스가 작은 노드를 우선으로 탐색을 해야하기 때문에
                //숫자가 큰 순으로 스택에 쌓는다
                //왜냐하면 가장 나중에 쌓인 것이 먼저 처리되기 때문에
                //역순으로 해야 작은 숫자가 제일 위로 가기 때문이다.
                if(adj[current.nodeIndex][i]){
                    //해당 노드가 이어져있다면 현재 깊이에서 1을 추가해서 해당 노드를 스택에 푸시한다.
                    dfsStack.push(new State(i, current.depth + 1));
                }
            }

        }

        return visitedNodes;
    }

    /**
     * @param N     그래프의 정점의 수
     * @param adj   2차원 인접 행렬
     * @return      너비 우선 탐색으로 탐색된 노드들의 번호 리스트
     */
    public static ArrayList<Integer> getBfsOrder(int N, boolean[][] adj){
        ArrayList<Integer> visitedNodes = new ArrayList<>();

        Queue<State> bfsQueue = new LinkedList<>();
        State initialState = new State(1, 1);
        bfsQueue.add(initialState);

        boolean visited[] = new boolean[N+1];

        while(bfsQueue.isEmpty() == false){
            // 큐에서 탐색할 상태 값을 가져온다.
            State current = bfsQueue.poll(); // 최초에 넣은 state 1 1 부터 시작한다.

            // 이미 방문한 노드라면 건너 뛴다.
            if(visited[current.nodeIndex]){
                continue;
            }

            // 방문 한 것으로 처리한다.
            visited[current.nodeIndex] = true;
            visitedNodes.add(current.nodeIndex);

            for(int i=1; i<adj[current.nodeIndex].length; i++){ // 현재 노드와 이어진 노드를 체크한다.
                //bfs의 경우 queue로 이루어져있기 때문에 dfs와 다르게 순방향으로 조회해서 추가하면 된다
                if(adj[current.nodeIndex][i]){
                    //해당 노드가 이어져있다면 현재 깊이에서 1을 추가해서 해당 노드를 큐에 푸시한다.
                    bfsQueue.add(new State(i, current.depth + 1));
                }
            }
        }

        return visitedNodes;
    }

    public static void main(String[] args){
        int N = scanner.nextInt();
        int M = scanner.nextInt();
        boolean[][] adj = new boolean[N+1][N+1];

        for(int i = 0 ; i < M; i += 1){
            int u = scanner.nextInt();
            int v = scanner.nextInt();
            adj[u][v] = true;
            adj[v][u] = true;
        }

        ArrayList<Integer> dfsOrders = getDfsOrder(N, adj);
        ArrayList<Integer> bfsOrders = getBfsOrder(N, adj);

        printArrayList(dfsOrders);
        printArrayList(bfsOrders);
    }

    public static void printArrayList(ArrayList<Integer> arr){
        for(int i = 0 ; i < arr.size(); i+= 1){
            if( i > 0 ){
                System.out.print("-");
            }

            int node = arr.get(i);
            System.out.print(node);
        }
        System.out.println();
    }
}

class State{
    public final int nodeIndex;     // 현재 정점의 수
    public final int depth;         // 탐색의 깊이
    public State(int nodeIndex, int depth){
        this.nodeIndex = nodeIndex;
        this.depth = depth;
    }
}