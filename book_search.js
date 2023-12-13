/** 
 * book_search.js
 * 
 *  Implementation of the function: findSearchTermInBooks().
 *  Implemented and Tested by Joseph Esquivel
 *  
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    // Type-checking
    if (typeof searchTerm !== 'string') {
        throw new Error('Invalid input: searchTerm must be a string!');
    }
    
    if (!Array.isArray(scannedTextObj) || !scannedTextObj.every(obj => typeof obj === 'object')) {
        throw new Error('Invalid input: scannedTextObj must be an array of JSON objects.');
    }
    
    // Empty search term, return an empty result.
    if (searchTerm === '') {
        return {
            "SearchTerm": searchTerm,
            "Results": []
        };
    }
     
     // Create result object, returned in current condition if no results found.
    const result = {
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
                // Update result object with match
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


// Another JSON object to test
const notTwentyLeaguesIn = [
    {
        "Title": "Not Twenty Thousand Leagues Under the Sea",
        "ISBN": "4780000528532",
        "Content": [
            {
                "Page": 12,
                "Line": 1,
                "Text": "As the final minutes closed in, it was time"
            },
            {
                "Page": 12,
                "Line": 2,
                "Text": "to submit the implementation of the word search."
            },
            {
                "Page": 12,
                "Line": 3,
                "Text": "The programmer wrote tests and commmitted them."
            } 
        ] 
    }
]
    
/** Example output objects below */
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

// Test Case for "simply" with expected output:
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

// Test Case for "and" with expected output:
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

// Test Case for "The" with epected output:
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


// Test Case for "I" with expected output:
const test6ExpectedOutput = {
    "SearchTerm": "I",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
};

// Test Case for "i" with expected output:
const test7ExpectedOutput = {
    "SearchTerm": "i",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
};

// Test case for 'negative' results
const test8ExpectedOutput = {
    "SearchTerm": "American",
    "Results": [] // No expected result
};

// Test case for 'negative' results
const test9ExpectedOutput = {
    "SearchTerm": "later",
    "Results": [] // No expected result
    
};

// Test case search for "programmer" in a different set of books
const test10ExpectedOutput = {
    "SearchTerm": "programmer",
    "Results": [
        {
            "ISBN": "4780000528532",
            "Page": 12,
            "Line": 3
        }
    ]
};

// Test case search for "inertia" in a different set of books
const test11ExpectedOutput = {
    "SearchTerm": "inertia",
    "Results": [] // No expected result!
};

// Test case Search for an empty string
const test12ExpectedOutput = {
    "SearchTerm": "",
    "Results": [] // No expected result
};

// Test case Search for a space " " - All lines included
const test13ExpectedOutput = {
    "SearchTerm": " ",
    "Results": [
        {
            "ISBN": "4780000528532",
            "Page": 12,
            "Line": 1
        },
        {
            "ISBN": "4780000528532",
            "Page": 12,
            "Line": 2
        },
        {
            "ISBN": "4780000528532",
            "Page": 12,
            "Line": 3
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

// Test for multiple search matches
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

// Test character sensitivity, "I" vs "i":
const test6result = findSearchTermInBooks("I", twentyLeaguesIn);
if (JSON.stringify(test6ExpectedOutput) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", test6ExpectedOutput);
    console.log("Received:", test6result);
}

// Test character sensitivity, "I" vs "i":
const test7result = findSearchTermInBooks("i", twentyLeaguesIn);
if (JSON.stringify(test7ExpectedOutput) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", test7ExpectedOutput);
    console.log("Received:", test7result);
}


// Test for no result returned
const test8Result = findSearchTermInBooks("American", twentyLeaguesIn);
if (JSON.stringify(test8ExpectedOutput) === JSON.stringify(test8Result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", test8ExpectedOutput);
    console.log("Received:", test8Result);
}

// Test again for no result returned
const test9Result = findSearchTermInBooks("later", twentyLeaguesIn);
if (JSON.stringify(test9ExpectedOutput) === JSON.stringify(test9Result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", test9ExpectedOutput);
    console.log("Received:", test9Result);
}

// Test for result on new JSON object
const test10Result = findSearchTermInBooks("programmer", notTwentyLeaguesIn);
if (JSON.stringify(test10ExpectedOutput) === JSON.stringify(test10Result)) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", test10ExpectedOutput);
    console.log("Received:", test10Result);
}

// Test for no result on new JSON object
const test11Result = findSearchTermInBooks("inertia", notTwentyLeaguesIn);
if (JSON.stringify(test11ExpectedOutput) === JSON.stringify(test11Result)) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", test11ExpectedOutput);
    console.log("Received:", test11Result);
}
// Test for an empty string, to compare with a space
const test12Result = findSearchTermInBooks("", notTwentyLeaguesIn);
if (JSON.stringify(test12ExpectedOutput) === JSON.stringify(test12Result)) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", test12ExpectedOutput);
    console.log("Received:", test12Result);
}
// Test for a space, to compare with empty string.
const test13Result = findSearchTermInBooks(" ", notTwentyLeaguesIn);
if (JSON.stringify(test13ExpectedOutput) === JSON.stringify(test13Result)) {
    console.log("PASS: Test 13");
} else {
    console.log("FAIL: Test 13");
    console.log("Expected:", test13ExpectedOutput);
    console.log("Received:", test13Result);
}
