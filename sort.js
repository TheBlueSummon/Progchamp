// Shell sort
function shellSort(distance){
    var n = distance.length;
    // Rearrange elements at each n/2, n/4, n/8, ... intervals
    for (var interval = Math.floor(n / 2); interval > 0; interval = Math.floor(interval / 2)) {
        // Iterates through the array to look for possible swaps
        for (var index = interval; index < n; ++index) {
            var temp = distance[index];
            var back;
            // backtracks and swaps if index is smaller than a previous(varying elements away) element
            for (back = index; back >= interval && distance[back - interval] > temp; back -= interval) {
                distance[back] = distance[back - interval];
            }
            distance[back] = temp;
        }
    }
}

// Merge Sort
function merge(first, middle, last) {
    // temp array to store merged
    var temp = Array.from({ length: last - first }, (_, i) => first + i);
    var left = first,
        right = middle,
        it = 0;
    // merge two halves
    while (left < middle && right < last) {
        if (comp(left, right)) { // orders based on the comparator
            temp[it++] = left++;
        }
        else {
            temp[it++] = right++;
        }
    }

    // copy left over elements (left side)
    while (left < middle) {
        temp[it++] = left++;
    }
    // copy left over elements (right side)
    while (right < last) {
        temp[it++] = right++;
    }

    for (var i = 0; i < temp.length; i++) {
        first[i] = temp[i];
    }
}

// Sorts the elements using merge
function mergeSort(first, last) {
    if (last - first > 1) {
        var middle = Math.floor((first + last) / 2);
        mergeSort(first, middle, comp);
        mergeSort(middle, last, comp);
        merge(first, middle, last, comp);
    }
}
