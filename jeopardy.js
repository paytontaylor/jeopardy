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

let catIds = [];
let width = 6;
let height = 5;
$('#start').on('click', setupAndStart);

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const res = await axios.get("http://jservice.io/api/categories?count=100");
    let catIds = res.data.map(cat => cat.id);
    return _.sampleSize(catIds, width);
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
    let clues = category_data.clues.map(c => ({
        question: c.question,
        answer: c.answer,
        showing: null,
    }));
    return {
        title: category_data.title,
        clues
    };

}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */


async function fillTable() {
    let $head = $("#head");
    let $headRow = $("<tr>");
    $('#jeopardy #head').empty();
    for (let catIdx = 0; catIdx < width; catIdx++) {
        $headRow.append($("<th>").text(categories[catIdx].title));
    }
    $head.append($headRow);
    let $body = $("#body");
    $('#jeopardy #body').empty();
    for (let y = 0; y < height; y++) {
        let $bodyRow = $("<tr>");
        $body.append($bodyRow);
        for (let x = 0; x < width; x++) {
            $bodyRow.append($("<td>").attr("id", `${x}-${y}`).text("?"));
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

$("#jeopardy").on("click", "td", handleClick);

function handleClick(evt) {
    let id = evt.target.id;
    let [x, y] = id.split("-");
    let clue = categories[x].clues[y];
    let text;
    if (!clue) {
        console.log("Clue doesn't exist")
    }

    if (!clue.showing) {
        text = clue.question
        clue.showing = 'question'
    }
    else if (clue.showing === 'question') {
        text = clue?.answer
        clue.showing = 'answer'
    }
    else {
        return
    }
    $(`#${x}-${y}`).text(text);
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() { }

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() { }

/** Start game:
 *
 * - get random category Ids
 * - get data for each catego
 *]\
 ]=]y
 * - create HTML table
 * */

async function setupAndStart() {
    let catIds = await getCategoryIds();
    categories = [];
    for (let catId of catIds) {
        categories.push(await getCategory(catId));
    }
    console.log(categories)
    fillTable();
};

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */
