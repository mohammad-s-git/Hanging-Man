var wordList, randomNumber, selectedWord, wrongAnswerCounter, hasBegun;

wordList = ['DOG', 'BOOK', 'BAG', 'SHOP', 'APPLE', 'HOUSE','LIBRARY', 'OFFICE'];

// setter
var blank = [];

randomNumber = Math.floor( Math.random() * 8 ) + 1;
selectedWord = wordList[randomNumber];
wrongAnswerCounter = 0;
hasBegun = true;
document.querySelector(".man-in-danger").src = '';



document.querySelector('.btn-start').addEventListener('click', function(){
    // console.log( selectedWord );
    if(hasBegun)
    {
        setter( selectedWord );
        hasBegun = false;

        var tenMinutes = 60 * 10,
        display = document.querySelector('#timer');

        startTimer( tenMinutes, display );
    }
});

document.querySelector(".keyboard").addEventListener('click', function(){

    if( wrongAnswerCounter !== 10 ){
        event.target.disabled = true;
        checkLetter(event.target.textContent);
    }
    else{
        document.querySelector(".container").addClass("disabledbutton");
    }
});

function checkLetter(letter) {
    console.log(letter);

    // find a letter occurrence/s in a selectedWord
    if ( selectedWord.indexOf(letter) !== -1 ) 
    {
        console.log(selectedWord.indexOf(letter));

        var indices = [];

        for(var i=0; i < selectedWord.length; i++) 
        {
            if (selectedWord[i] === letter) 
            {
                indices.push(i);
            }
        }

        // console.log( indices )
        for( var i=0; i < indices.length; i++ )
        {
            console.log(i)
            blank[indices[i]] = letter;
        }

        // console.log( blank )
        answerFieldUpdater();
    }
    else
    {
        // console.log("else");
        wrongAnswerCounter += 1;
        document.querySelector('.man-in-danger').src = "images/hm" + wrongAnswerCounter + ".gif";
        document.querySelector('.wrong-field').value += letter + '-'; 
        document.querySelector(".man-in-danger").style.visibility = 'visible';
    }
}



function setter( word ) {

    // console.log( word );
    for (var i = 0; i < word.length; i++) {
        // console.log(word[i]);
        blank.push('?');
    }
    console.log(blank);
    // console.log(blank.join(''))
    document.querySelector('.answer-field').value = blank.join('');
}

// updates ? in black in .answer-field
function answerFieldUpdater() {
    document.querySelector('.answer-field').value = blank.join('');
}

function myFunction(){
    randomNumber = Math.floor( Math.random() * 8 ) + 1;
    selectedWord = wordList[randomNumber];
}



function startTimer(duration, display) 
{
    var timer = duration, minutes, seconds;

    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            location.reload();
        }
        
    }, 1000);

}
