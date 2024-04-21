// Shell Sort in C++ programming
// Merge Sort in C++ 

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
            for(back = index; back >= interval && comp(temp, distance[back - interval]); back -= interval)
                distance[back] = distance[back - interval];
            distance[back] = temp;
        }
    }
}


template <class T>
bool comparator(T a, T b) {
    return a < b;
}

// Merge Sort - inspired by https://codereview.stackexchange.com/questions/184402/generic-merge-sort-in-c
template<typename I, typename C>
void merge(I first, I middle, I last, C comp) {
    // temp vector to store merged
    vector<typename iterator_traits<I>::value_type> temp(distance(first, last));
    // iterators for both halves + temp vec
    I left = first, right = middle, it = temp.begin();
    // merge two halves
    while (left != middle && right != last) {
        if (comp(*left, *right)) { // orders based on the comparator
            *it++ = *left++; //
        } else {
            *it++ = *right++;
        }
    }

    it = copy(left, middle, it); // copy left over elements (left side)
    copy(right, last, it); // copy left over elements (right side)
    copy(temp.begin(), temp.end(), first);
}

// Sorts the elements using merge
template<typename I, typename C>
void mergeSort(I first, I last, C comp) {
    if (distance(first, last) > 1) {
        I middle = next(first, distance(first, last) / 2);
        mergeSort(first, middle, comp);
        mergeSort(middle, last, comp);
        merge(first, middle, last, comp);
    }
}

// Prints the array
void printArray(vector<float> distance){
    for(int i = 0; i < distance.size(); i++)
        cout << distance[i] << " ";
}


int main() {
    // Shell Sort Test
    vector<float> distance = {0.1, 0.11, 0.101, 0.09, 0.100001, 0.099999, 0.4, 0.1};
    shellSort(distance, comparator<float>);
    cout << "Sorted array: ";
    printArray(distance);
    cout << endl;

    // Merge Sort test
    vector<float> data = {0.1, 0.11, 0.101, 0.09, 0.100001, 0.099999, 0.4, 0.1};
    mergeSort(data.begin(), data.end(), comparator<float>); 
    cout << "Sorted Array: ";
    printArray(data);
    cout << endl;
}
