/////////////////////////////
//HOMEPAGE TYPING ANIMATION//
/////////////////////////////
function typeWriter(selectedSpan, typeSpeed) {
    // in case of weirdness
    if(selectedSpan == undefined || typeSpeed == NaN) {
        return ['',0];
    }
    // add cursor effect
    selectedSpan.classList.add('cursor');
    // get text data from span element
    let txt = selectedSpan.getAttribute('data-text');
    // this loop creates the typing effect
    for(c=0; c<txt.length; c++) { // c is for character
        (function(c){
            setTimeout(function(){
                selectedSpan.innerHTML += txt[c];
            }, c*typeSpeed);
        }(c));
    };
    // remove cursor effect
    let duration = (txt.length)*typeSpeed;
    setTimeout(() => selectedSpan.classList.remove('cursor'), duration);
    console.log(duration); // used to check timing
    // create output for controller to check text output and determine timing
    let outputArray = [txt, duration];
    return outputArray;
};

class myController {
    constructor(spansList, textArray, wait, typeSpeed) {
        this.spansList = spansList;
        this.textArray = textArray;
        this.index = 0;
        this.wait = parseInt(wait,10);
        this.typeSpeed = parseInt(typeSpeed,10);
        this.isTyping = false;
        this.output = '';
        this.type();
    }
    type() {
        // initialise pause
        let pause = 0;
        // initialise text check variable
        const current = this.textArray[this.index];

        // if current text has finished being typed
        if(this.isTyping && this.output[0] == current) {
            console.log("wordEnd");// for debugging purposes
            // increment index counter
            this.index++;
            // signal to controller that typing has finished
            this.isTyping = false; console.log(this.isTyping);// for debugging purposes
            // change pause to set wait time between words
            pause = this.wait;
            // reset output array
            this.output = [];

         // check if current text hasn't started typing
        } else if(!this.isTyping && this.output == '') {
            console.log("wordStart");// for debugging purposes
            // signal to controller that typing has started
            this.isTyping = true;
            console.log(this.isTyping);// for debugging purposes
            // start typing a new word
            this.output = typeWriter(this.spansList[this.index], this.typeSpeed);
            console.log(this.output);// for debugging purposes
            pause = this.output[1];
        }
        // check if entire text has finished typing
        console.log(this.index, this.spansList.length); // for debugging purposes
        if(this.index == this.spansList.length) {
            console.log("exit");// for debugging purposes
            // exit
            return;

         // if not, callback
        } else {
            console.log("callback");// for debugging purposes
            setTimeout(() => this.type(), pause);
        }
    }
}

function homeAnimationInit() {
    const spansList = document.querySelectorAll('.typewriter');
    const textArray = [];
    for (i = 0; i < spansList.length; i++) {
        let text = spansList[i].getAttribute('data-text');
        textArray.push(text);;
    }
    console.log(textArray); console.log(spansList);// for debugging purposes
    const wait = 200;
    const typeSpeed = 100;
    // start myController
    console.log('Start'); // for debugging purposes
    new myController(spansList, textArray, wait, typeSpeed);
}
document.addEventListener('DOMContentLoaded',homeAnimationInit);