/////////////////////////
// home page animation //
/////////////////////////

document.addEventListener('DOMContentLoaded',homepageAnimation);

function homepageAnimation() {
    // create a nodelist of all the elements we want to print on the screen
    var spans = document.querySelectorAll(".typewriter");

    // typing function with set timeouts with predetermined delays to stop typing animations from overlapping
    // function.prototype.bind method allows us to pass typeWriter to setTimeout with an argument
    setTimeout(typeWriter.bind(null, spans[0]), 0);
    setTimeout(typeWriter.bind(null,spans[1]), 500);
    setTimeout(typeWriter.bind(null,spans[2]), 800);
    setTimeout(typeWriter.bind(null, spans[3]), 1200);
    setTimeout(typeWriter.bind(null, spans[4]), 1800);
    setTimeout(typeWriter.bind(null, spans[5]), 2450);
    setTimeout(typeWriter.bind(null, spans[6]), 2650);
    setTimeout(typeWriter.bind(null, spans[7]), 3050);
    setTimeout(typeWriter.bind(null, spans[8]), 4600);
    setTimeout(typeWriter.bind(null, spans[9]), 5600);
    setTimeout(typeWriter.bind(null, spans[10]), 6650);
    setTimeout(typeWriter.bind(null, spans[11]), 8100);
    setTimeout(typeWriter.bind(null, spans[12]), 8950);
};

//typeWriter function
function typeWriter(selectedSpan) {
    selectedSpan.classList.add('cursor');
    let txt = selectedSpan.getAttribute('data-text');
    for(i=0; i<txt.length; i++) {
        (function(i){
            setTimeout(function(){
                selectedSpan.innerHTML += txt[i];
            }, i*100);
        }(i));
    };
    let delay = (txt.length)*100;
    setTimeout(() => selectedSpan.classList.remove('cursor'), delay);
    
    //console.log(delay); used to determine timing
};

//////////////////////////
// change name function //
//////////////////////////

class myNameChanger {
    constructor(txtElement, names, wait = 3000) {
        this.txtElement = txtElement;
        this.names = names;
        this.txt = 'Ian Patterson';
        this.nameIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = true;
    }
    type() {
        // current index of name, allows the function to loop because the last position % index.length is equal to zero
        const current = this.nameIndex % this.names.length;

        // get full text of current name
        const fullTxt = this.names[current];

        // check if deleting
        if(this.isDeleting) {
            // remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // initial type Speed
        let typeSpeed = 300;
        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // if word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // make a pause at end
            typeSpeed = this.wait;
            // set delete to true;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt == '') {
            this.isDeleting = false;
            // move to next name
            this.nameIndex++
            // Pause before start typing
            typeSpeed = 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

function init() {
    const txtElement = document.querySelector('.myName');
    const names = JSON.parse(txtElement.getAttribute('data-names'));
    const wait = txtElement.getAttribute('data-wait');
    // Init myNameChanger
    new myNameChanger(txtElement, names, wait);
    // stop multiples of myNameChanger being invoked on click 
    function disable() {
        txtElement.onclick = null;
    };
    disable();
}
////////////////////////
// responsive top nav //
///////////////////////
// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the menu icon
function myNavBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}
/////////////////
// pop-up form //
////////////////
// Toggle showing and hiding contact form when the user clicks on the button

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}