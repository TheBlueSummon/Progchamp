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

// Wrapper Func
function mergeSortRepos(og, repos) {
    const distances = repos.map(repo => ({
        repo,
        distance: dis(og, repo)
    }));

    // Sorts the elements using merge
    function mergeSort(arr, start, end) {
        if (end - start > 1) {
            let middle = Math.floor((start + end) / 2);
            mergeSort(arr, start, middle);
            mergeSort(arr, middle, end);
            merge(arr, start, middle, end);
        }
    }
    
    // Merge Sort
    function merge(arr, start, middle, end) {
        // array to store merged
        let left = start;
        let right = middle;
        const temp = [];
        // merge two halves
        while (left < middle && right < end) {
            if (arr[left].distance < arr[right].distance) {
                temp.push(arr[left++]);
                } else {
                    temp.push(arr[right++]);
                }
            } 
            // copy left side
            while (left < middle) {
                temp.push(arr[left++]);
            }
            // copy right side
            while (right < end) {
                temp.push(arr[right++]);
            }
            for (let i = 0; i < temp.length; i++) {
                arr[start + i] = temp[i];
            }
        }
    
        mergeSort(distances, 0, distances.length);
        return distances.map(item => item.repo);
    }
