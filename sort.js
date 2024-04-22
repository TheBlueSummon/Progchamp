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
    // create an array 
    let distances = new Array(repos.length);
    for (let i = 0; i < repos.length; i++) {
        distances[i] = dis(og, repos[i]);
    }
    // Sorts the elements using merge
    function mergeSort(left, right) {
        if (right - left > 1) {
            const middle = Math.floor((left + right) / 2);
            mergeSort(left, middle); // sort left
            mergeSort(middle, right); // sort right
            merge(left, middle, right); // merge two halves
        }
    }
    
    // Merge Sort
    function merge(left, middle, right) {
        let i = left;
        let j = middle;
        let tempRepos = [];
        let tempDistances = [];

        // merge halves based on distance
        while (i < middle && j < right) {
            if (distances[i] < distances[j]) {
                tempRepos.push(repos[i]);
                tempDistances.push(distances[i]);
                i++;
            } else {
                tempRepos.push(repos[j]);
                tempDistances.push(distances[j]);
                j++;
            }
        }
        // left half
        while (i < middle) {
            tempRepos.push(repos[i]);
            tempDistances.push(distances[i]);
            i++;
        }
        // right half
        while (j < right) {
            tempRepos.push(repos[j]);
            tempDistances.push(distances[j]);
            j++;
        }
        // copy the sorted elements back into the original array and distances array
        for (let k = 0; k < tempRepos.length; k++) {
            repos[left + k] = tempRepos[k];
            distances[left + k] = tempDistances[k];
        }
    }
    mergeSort(0, repos.length);
}


// Returns a 2D array that, for each language, shows the most closely related languages 
function langSort(langList, list2lang, repos) {
    // initialize the arrays
    var languages = new Array(langList.length); // string names
    var langVals = new Array(langList.length);  // similarity values
    for (let i=0;i<langList.length;++i) {
        languages[i] = [...langList];
        langVals[i] = new Array(langList.length);
        for (let j=0;j<langList.length;++j) {
            langVals[i][j] = 0;
        }
        langVals[i][i] += 500;
    }

    // Calculating similarity between languages by simply summing %lang1 * %lang2 among all repos
    for (let r in repos) {
        if (repos[r]['languages']) {
        let p = new Array(Object.keys(repos[r]['languages']).length);
        sum = 0
        for (let l in repos[r]['languages']) {
            sum += repos[r]['languages'][l];
        }
        let index = 0;
        for (let l in repos[r]['languages']) {
            p[index] = repos[r]['languages'][l] / sum;
            ++index;
        }
        index = 0
        for (let l in repos[r]['languages']) {
            if(l in list2lang){
            let s = list2lang[l];
            let index2 = 0
            for (let l2 in repos[r]['languages']) {
                if(l2 in list2lang){
                let t = list2lang[l2];
                langVals[s][t] += p[index]*p[index2];}
                ++index2;
            }}
            ++index;
        }}
    }

    // Sorting our languages based on similarity
    for (let i=0; i<languages.length; ++i) {
        let n = langVals[i].length;
        // Rearrange elements at each n/2, n/4, n/8, ... intervals
        for (let interval = Math.floor(n / 2); interval > 0; interval = Math.floor(interval / 2)) {
            // Iterates through the array to look for possible swaps
            for (let index = interval; index < n; ++index) {
                let temp = langVals[i][index];
                let temp_lang = languages[i][index];
                var back;
                // backtracks and swaps if index is larger than a previous(varying elements away) element
                for (back = index; back >= interval && langVals[i][back - interval] < temp; back -= interval) {
                    langVals[i][back] = langVals[i][back - interval];
                    languages[i][back] = languages[i][back - interval];
                }
                langVals[i][back] = temp;
                languages[i][back] = temp_lang;
            }
        }
    }   
    return languages; 
}
