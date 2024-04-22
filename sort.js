function dis (og, next){
    let og_sum = 0;
    let next_sum = 0;
    for (let l in og['languages']) {
        og_sum += og['languages'][l];
    }
    for (let l in next['languages']) {
        next_sum += next['languages'][l];
    }
    let distance = 0;
    for (let l in og['languages']) {
        if(l in next['languages']) {
            distance += Math.abs(og['languages'][l]/og_sum-next['languages'][l]/next_sum);}
        else {
            distance += og['languages'][l]/og_sum;
        }
    }
    return distance;
}
// Shell sort
function shellSort(og, repos){
    let distance = new Array(repos.length);
    for(let i=0; i<repos.length; ++i) {
        distance[i] = dis(og,repos[i]);
    }
    let n = distance.length;
    // Rearrange elements at each n/2, n/4, n/8, ... intervals
    for (let interval = Math.floor(n / 2); interval > 0; interval = Math.floor(interval / 2)) {
        // Iterates through the array to look for possible swaps
        for (let index = interval; index < n; ++index) {
            let temp = distance[index];
            let temp_repo = repos[index];
            var back;
            // backtracks and swaps if index is smaller than a previous(varying elements away) element
            for (back = index; back >= interval && distance[back - interval] > temp; back -= interval) {
                distance[back] = distance[back - interval];
                repos[back] = repos[back - interval];
            }
            distance[back] = temp;
            repos[back] = temp_repo;
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