import java.io.*;
import java.lang.*;
import java.util.*;

public class Main {
    public static final Scanner scanner = new Scanner([System.in](http://system.in/));

    /**
     * @param N     그래프의 정점의 수
     * @param adj   각 노드들에 대한 인접 리스트의 배열
     * @return      깊이 우선 탐색으로 탐색된 노드들의 번호 리스트
     */
    public static ArrayList<Integer> getDfsOrder(int N, ArrayList<Integer>[] adj){
        ArrayList<Integer> visitedNodes = new ArrayList<>();

        Stack<State> dfsStack = new Stack<>();
        State initialState = new State(1, 1);
        dfsStack.add(initialState);

        boolean visited[] = new boolean[N+1];

        while(dfsStack.isEmpty() == false){

            State current = dfsStack.pop();

            if(visited[current.nodeIndex]){
                continue;
            }

            visitedNodes.add(current.nodeIndex);
            visited[current.nodeIndex] = true;

            for(int i=adj[current.nodeIndex].size()-1; i>=0; i--){
                if(!visited[adj[current.nodeIndex].get(i)]){
                    dfsStack.push(new State(adj[current.nodeIndex].get(i), current.depth + 1));
                }
            }

        }

        return visitedNodes;
    }

    /**
     * @param N     그래프의 정점의 수
     * @param adj   각 노드들에 대한 인접 리스트의 배열
     * @return      너비 우선 탐색으로 탐색된 노드들의 번호 리스트
     */
    public static ArrayList<Integer> getBfsOrder(int N, ArrayList<Integer>[] adj){
        ArrayList<Integer> visitedNodes = new ArrayList<>();

        Queue<State> bfsQueue = new LinkedList<>();
        State initialState = new State(1, 1);
        bfsQueue.add(initialState);

        boolean visited[] = new boolean[N+1];

        while(bfsQueue.isEmpty() == false){

            State current = bfsQueue.poll();

            if(visited[current.nodeIndex]){
                continue;
            }

            visitedNodes.add(current.nodeIndex);
            visited[current.nodeIndex] = true;

            for(int i=0; i<adj[current.nodeIndex].size(); i++){
                if(!visited[adj[current.nodeIndex].get(i)]){
                    bfsQueue.add(new State(adj[current.nodeIndex].get(i), current.depth + 1));
                }
            }

        }

        return visitedNodes;
    }

    public static void main(String[] args){
        int N = scanner.nextInt();
        int M = scanner.nextInt();
        ArrayList<Integer>[] adj = new ArrayList[N+1];

        for(int i = 1; i <= N; i += 1){
            adj[i] = new ArrayList<>();
        }

        for(int i = 0 ; i < M; i += 1){
            int u = scanner.nextInt();
            int v = scanner.nextInt();
            adj[u].add(v);
            adj[v].add(u);
        }

        for(int i = 1; i <= N; i+= 1){
            Collections.sort(adj[i]);
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
    public final int nodeIndex;
    public final int depth;
    public State(int nodeIndex, int depth){
        this.nodeIndex = nodeIndex;
        this.depth = depth;
    }
}