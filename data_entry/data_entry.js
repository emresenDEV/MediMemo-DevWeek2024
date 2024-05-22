//REPLACE CLIENT WITH THE NAME OF THE CLIENT IN ALL INPUT FIELDS
const client = "John";
const inputs = document.getElementsByTagName('input')
for (let i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('value', inputs[i].value.replace('<CLIENT>', client));
}

//TAB THROUGH PHRASES ENCLOSED IN BRACKETS IN INPUT FIELDS
document.addEventListener('keydown', function(event) {
    //if input is currently selected
    if (event.key === 'Tab' && document.activeElement.tagName === 'INPUT') {
        console.log('Tab pressed, active element is an input')
        //search for and return the next regex match in the current input
        const input = document.activeElement
        const regex = /<([^>]+)>/g;
        const cursor_position = input.selectionStart
        const blanks_found = input.value.slice(cursor_position).match(regex)
        console.log(blanks_found)
        if (blanks_found !== null) {
            //if match found record the specifics of the match's location
            const next_match = blanks_found[0]
            // console.log(next_match)

            const next_match_start = input.value.indexOf(next_match)
            // console.log(next_match_start)

            const next_match_end = next_match.length + next_match_start
            // console.log(next_match_end)

            //Check that the next found match is not already highlighted
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;
            
            // console.log('Highlighted text starts at: ' + selectionStart);
            // console.log('Highlighted text ends at: ' + selectionEnd);

            if (selectionStart !== next_match_start && selectionEnd !== next_match_end) {
                //prevent default tabbing and highlght the match
                event.preventDefault()
                input.setSelectionRange(next_match_start, next_match_end)
            }
            else {
                //if the match is already highlighted and check for another match in the input
                if (blanks_found.length > 1) {

                    const second_match = blanks_found[1]
                    // console.log(second_match)
        
                    const second_match_start = input.value.indexOf(second_match)
                    // console.log(second_match_start)
        
                    const second_match_end = second_match.length + second_match_start
                    // console.log(second_match_end)
        
                    //highlght the match
                    event.preventDefault()
                    input.setSelectionRange(second_match_start, second_match_end)
                }
                //if there's no other match in the input, move to the next input (aka do nothing)
                }
            }
        }
        })

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let jsonObject = {};

    for (const [key, value]  of formData.entries()) {
        jsonObject[key] = value;
    }

    console.log(JSON.stringify(jsonObject));
});