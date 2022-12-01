// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

// let $body = $("#body");
// for (let y = 0; y < height; y++) {
//     let $bodyRow = $("<tr>");
//     $body.append($bodyRow);
//     for (let x = 0; x < width; x++) {
//         $bodyRow.append(`<td>?</td>`);
//     }
// }

let categories = [];
let width = 6;
let height = 5;

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const res = await axios.get("http://jservice.io/api/categories?count=100");
    let NUM_CATEGORIES = _.sampleSize(res.data, [(n = 6)]);
    for (let category of NUM_CATEGORIES) {
        categories.push(category.id);
    }
    return categories;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const res = await axios.get(`http://jservice.io/api/category?id=${catId}`);
    let category_data = res.data;
    return {
        title: category_data.title,
        clues: category_data.clues,
    };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

let $head = $("#head");
let $headRow = $("<tr>");

async function fillTable() {
    $head.append($headRow);
    for (let category of categories) {
        category = await getCategory(category);
        $headRow.append(`<td>${category.title}</td>`);
    }
    let $body = $("#body");
    for (let y = 0; y < height; y++) {
        let $bodyRow = $("<tr>");
        $body.append($bodyRow);
        for (let x = 0; x < width; x++) {
            $bodyRow.append(`<td class='q-mark'>?</td>`);
        }
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

function addClueEvent() {
    $(".q-mark");
}