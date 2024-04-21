// Shell Sort in C++ programming

#include <iostream>
using namespace std;

// Shell sort
void shellSort(float distance[], int n){
    // Rearrange elements at each n/2, n/4, n/8, ... intervals
    for(int interval = n / 2; interval > 0; interval /= 2){
        // Iterates through the array to look for possible swaps
        for(int index = interval; index < n; ++index){
            float temp = distance[index];
            int back;
            // backtracks and swaps if index is smaller than a previous(varying elements away) element
            for(back = index; back >= interval && distance[back - interval] > temp; back -= interval)
                distance[back] = distance[back - interval];
            distance[back] = temp;
        }
    }
}

// Prints the array
void printArray(float distance[], int size){
    for(int i = 0; i < size; i++)
        cout << distance[i] << " ";
}

int main(){
    float distance[] = {0.1, 0.11, 0.101, 0.09, 0.100001, 0.099999, 0.4, 0.1};
    int size = sizeof(distance) / sizeof(distance[0]);
    shellSort(distance, size);
    cout << "Sorted array: ";
    printArray(distance, size);
}