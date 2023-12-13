/** 
 * book_search.js
 * 
 *  Implementation of the function: findSearchTermInBooks().
 *  By Joseph Esquivel
 *  
 * 
 * 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
     // Create result object, returned in current condition if no results found.
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
    // Iterate through each book 
    for (const book of scannedTextObj) {
        const { ISBN, Content } = book;
        // Iterate through each line of each page
        for (const line of Content) {
            const { Page, Line, Text } = line;
            
            if (Text.includes(searchTerm)) {
                // Update result object for later return
                result.Results.push({
                    "ISBN": ISBN,
                    "Page": Page,
                    "Line": Line
                });
            }
        }
    }
    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}


const test3ExpectedOutput = {
    "SearchTerm": "simply",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
};


const test4ExpectedOutput = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
};

const test5ExpectedOutput = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}


/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// Positive test, should return a match:
const test3Result = findSearchTermInBooks("simply", twentyLeaguesIn);
if (JSON.stringify(test3ExpectedOutput) === JSON.stringify(test3Result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", test3ExpectedOutput);
    console.log("Received:", test3Result);
}

// Test Result Sensitivity, "darkn-ness":
const test4Result = findSearchTermInBooks("and", twentyLeaguesIn);
if (JSON.stringify(test4ExpectedOutput) === JSON.stringify(test4Result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", test4ExpectedOutput);
    console.log("Received:", test4Result);
}


// Test Character Sensitivity, "the" vs "The":
const test5result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(test5ExpectedOutput) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test5result);
}














