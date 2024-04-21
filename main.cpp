// Shell Sort in C++ programming

#include <iostream>
#include <vector>
using namespace std;

// Shell sort
template <class T, class compare>
void shellSort(vector<T>& distance, compare comp){
    int n = distance.size();
    // Rearrange elements at each n/2, n/4, n/8, ... intervals
    for(int interval = n / 2; interval > 0; interval /= 2){
        // Iterates through the array to look for possible swaps
        for(int index = interval; index < n; ++index){
            T temp = distance[index];
            int back;
            // backtracks and swaps if index is smaller than a previous(varying elements away) element
            for(back = index; back >= interval && comp(distance[back - interval],temp); back -= interval)
                distance[back] = distance[back - interval];
            distance[back] = temp;
        }
    }
}

template <class T>
bool comparator(T a, T b) {
    return a < b;
}

// Prints the array
void printArray(vector<float> distance){
    for(int i = 0; i < distance.size(); i++)
        cout << distance[i] << " ";
}

int main(){
    vector<float> distance = {0.1, 0.11, 0.101, 0.09, 0.100001, 0.099999, 0.4, 0.1};
    shellSort(distance, comparator<float>);
    cout << "Sorted array: ";
    printArray(distance);
}