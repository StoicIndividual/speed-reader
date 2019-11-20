// a function to create an overlay
const createOverlay = () => {
    // creates element for the overlay and adds it's class name
    const createElemO = document.createElement('DIV');
    document.body.appendChild(createElemO);
    createElemO.className = 'overlay';
    const overlay = document.querySelector('.overlay');
    // styling for overlay
    overlay.style.zIndex='999998';
    overlay.style.top='0';
    overlay.style.left='0';
    overlay.style.width='100%';
    overlay.style.height='100%';
    overlay.style.position='fixed';
    overlay.style.backgroundColor='rgba(0,0,0,0.86)';
};

// a function to create everything that has to do with the reader ui
const createReaderWrapper = () => {
    // creates element for the wrapper and adds it's class name
    const createElemW = document.createElement('DIV');
    document.body.appendChild(createElemW);
    createElemW.className = 'reader-wrapper';
    const readerWrapper = document.querySelector('.reader-wrapper');
    // styling for wrapper
    readerWrapper.style.zIndex='999999';
    readerWrapper.style.position='fixed';
    readerWrapper.style.display='flex';
    readerWrapper.style.flexDirection='row';
    readerWrapper.style.top='50%';
    readerWrapper.style.left='50%';
    readerWrapper.style.transform='translate(-50%, -50%)';

    // a function to create a word box that contains the reticle and the selected words
    const createWordBox = () => {
	// creates element for the word box and adds it's class name
	const createElemWB = document.createElement('DIV');
	const getElemW = document.querySelector('div.reader-wrapper');
	getElemW.appendChild(createElemWB);
	createElemWB.className = 'word-box';
	const wordBox = document.querySelector('.word-box');
	// styling for word box
	wordBox.style.width='400px';
	wordBox.style.height='100px';
	wordBox.style.backgroundColor='rgb(48, 48, 48)';
	wordBox.style.position='relative';
	
	// a function that creates the reticle
	const createReticle = () => {
	    // creates element for the reticle and adds it's class name
	    const createElemR = document.createElement('DIV');
	    const getElemWB = document.querySelector('div.word-box');
	    getElemWB.appendChild(createElemR);
	    createElemR.className = 'reticle';
	    const reticle = document.querySelector('div.reticle');
	    // styling for reticle
	    reticle.style.position='absolute';
	    reticle.style.width='10px';
	    reticle.style.height='100px';
	    reticle.style.left='110px';
	    reticle.style.borderTop='20px solid rgb(101, 101, 101)';
	    reticle.style.borderBottom='20px solid rgb(101, 101, 101)';
	    reticle.style.boxSizing='border-box';
	};

	// a function that creates the word
	const createWord = () => {
	    // creates element for the word and adds it's class name
	    const createElemWrd = document.createElement('DIV');
	    const getElemWB = document.querySelector('div.word-box');
	    getElemWB.appendChild(createElemWrd);
	    createElemWrd.className = 'word';
	    const word = document.querySelector('div.word');
	    // styling for word
	    word.style.left='0px';
	    word.style.position='absolute';
	    word.style.top='50%';
	    word.style.transform='translateY(-50%)';

	    // a function that creates the pivot
	    const createPivot = () => {
		// creates element for the pivot and adds it's class name
		const createElemP = document.createElement('SPAN');
		const getElemWrd = document.querySelector('div.word');
		getElemWrd.appendChild(createElemP);
		createElemP.className = 'pivot';
		const pivot = document.querySelector('span.pivot');
		// styling for pivot
		pivot.style.color='rgb(115, 181, 238)';
		pivot.style.fontSize='50px';
		pivot.style.fontFamily='monospace';
	    };
	    
	    // a function that creates the remaining word halfs on the pivot's sides
	    const createWordHalfs = () => {
		// creates the two word halfs and positions them accordingly
		const createElemLH = document.createElement('SPAN');
		const createElemRH = document.createElement('SPAN');
		const getElemWrd = document.querySelector('div.word');
		getElemWrd.insertBefore(createElemLH, getElemWrd.childNodes[0]);
		getElemWrd.appendChild(createElemRH);
		createElemLH.className = 'left-half';
		createElemRH.className = 'right-half';
		const leftHalf = document.querySelector('span.left-half');
		const rightHalf = document.querySelector('span.right-half')
		// styling for the halfs
		leftHalf.style.color='rgb(224, 224, 224)';
		leftHalf.style.fontSize='50px';
		leftHalf.style.fontFamily='monospace';
		rightHalf.style.color='rgb(224, 224, 224)';
		rightHalf.style.fontSize='50px';
		rightHalf.style.fontFamily='monospace';
	    };
	    createPivot();
	    createWordHalfs();
	};
	createReticle();
	createWord();
    };

    // a function that creates the blocks on the sides of the word box
    const createBlocks = () => {
	// creates the two side blocks and positions them accordingly
	const createElemLB = document.createElement('DIV');
	const createElemRB = document.createElement('DIV');
	const getElemW = document.querySelector('div.reader-wrapper');
	getElemW.insertBefore(createElemLB, getElemW.childNodes[0]);
	getElemW.appendChild(createElemRB);
	createElemLB.className = 'left';
	createElemRB.className = 'right';
	const left = document.querySelector('div.left');
	const right = document.querySelector('div.right');
	// styling for wrap (applies to both left and right blocks) class
	left.style.backgroundColor='rgb(64, 64, 64)';
	left.style.width='40px';
	left.style.height='100px';
	right.style.backgroundColor='rgb(64, 64, 64)';
	right.style.width='40px';
	right.style.height='100px';
	// styling for left block
	left.style.borderTopLeftRadius='8px';
	left.style.borderBottomLeftRadius='8px';
	// styling for right block
	right.style.borderTopRightRadius='8px';
	right.style.borderBottomRightRadius='8px';
    };
    createWordBox();
    createBlocks();
};

/*the switcher variable is used to determine whether the reader
  should run or not, meant for preventing the reader from running in
  the background even if the gui is not displayed*/
let switcher = true;
// a function for ui logic (or in other words, the heart of the speed reader)
const createSpeedReadFunction = (n) => {
    const reader = (n) => {
    	// [LOCAL VARIABLES]
    	const wpm = 200;
    	// delay for punctuation should be half of the normal wpm
    	const pwpm = 100;
    	const setNormalDelay = 60000 / wpm;
    	const setPunctuatedDelay = 60000 / pwpm;
	const selectionObject = window.getSelection();
	// selection array that splits on whitespace and newlines
	const selectionArray = selectionObject.toString().split(/\r\n|\r|\n|\s/g);
	
	/* START OF TESTING PHASE */
	const wordSplitter = (word, pivotInt) => {
	    const wordPunctuationRemoved = word.replace(/[?.,!:;*-]+$/, "");
	    // create variable for individual letters
	    const lettersArr = word.split('');
	    // creates variables for left and right word halfs and pivot
	    const pivotIndex = Math.floor(wordPunctuationRemoved.length/2 - pivotInt);
	    const pivotArr = lettersArr[pivotIndex];
	    const LeftHalfArr = lettersArr.slice(0, pivotIndex);
	    const rightHalfArr = lettersArr.slice(pivotIndex+1, lettersArr.length);
	    // get the location of the elements
	    const pivot = document.querySelector('span.pivot');
	    const leftHalf = document.querySelector('span.left-half');
	    const rightHalf = document.querySelector('span.right-half');
	    // resets spans
	    pivot.innerHTML='';
	    leftHalf.innerHTML='';
	    rightHalf.innerHTML='';
	    // gives values to span
	    pivot.innerHTML=pivotArr;
	    leftHalf.innerHTML=LeftHalfArr.join('');
	    rightHalf.innerHTML=rightHalfArr.join('');
	    // great variable to center pivot
	    const centerPivot = 110 - leftHalf.offsetWidth - 10;
	    // centers pivot
	    document.querySelector('div.word').style.left = centerPivot + 'px';
	};

	const wordCalculator = (word) => {
	    const wordPunctuationRemoved = word.replace(/[?.,!:;*-]+$/, "");
	    switch (true) {
	    case wordPunctuationRemoved.length < 4:
		wordSplitter(word, 0);
		break;
	    case wordPunctuationRemoved.length < 8:
		wordSplitter(word, 1);
		break;
	    case wordPunctuationRemoved.length < 12:
		wordSplitter(word, 2);
		break;
	    case wordPunctuationRemoved.length < 14:
		wordSplitter(word, 3);
		break;
	    }
	};
	/* END OF TESTING PHASE */
	
    	// [RECURSION CONDITION]
    	if (n<selectionArray.length && switcher) {
	    /*checks to see if the word contains a punctuation, if so
	      briefly pause on the word then proceed*/
	    if (selectionArray[n].replace(/[?.,!:;*-]+$/, "") !== selectionArray[n]) {
		if (n===selectionArray.length-1) {
		    setTimeout(()=>{
    			reader(n);
    		    },setNormalDelay);			
		} else {
    		    setTimeout(()=>{
    			reader(n);
    		    },setPunctuatedDelay);			
		}
    	    }
    	    // or else just just at the normal delay
    	    else {
    		setTimeout(()=>{
    		    reader(n);
    		},setNormalDelay);
    	    }
	    wordCalculator(selectionArray[n]);
	    n++;  // increments the number
    	} else {
	    return false;
	}
    };
    reader(0);

};

/*
  Adds a "keydown" event listener on page load,
  runs a function when the if condition is satisfied.
*/
const speedReaderInit = () => {
    createOverlay();
    createReaderWrapper();
    const overlay = document.querySelector('.overlay');
    const readerWrapper = document.querySelector('.reader-wrapper');

    overlay.style.display='none';
    readerWrapper.style.display='none';

    document.addEventListener('keydown', event => {
	if(event.ctrlKey && event.altKey && event.key === 'e') {
            if (overlay.style.display ==='none' && readerWrapper.style.display === 'none') {
		overlay.style.display='block';
		readerWrapper.style.display='flex';

		if (window.getSelection().toString() !== '') {
		    // only run when there's a selection
		    switcher = true;
		    createSpeedReadFunction();
		} else {
		    // run when there isn't a selection
		    // console.log('there is nothing fool!')
		    return false;
		}

            } else {
		overlay.style.display='none';
		readerWrapper.style.display='none';
		switcher = false;
		// still experimental
		const pivot = document.querySelector('span.pivot');
		const leftHalf = document.querySelector('span.left-half');
		const rightHalf = document.querySelector('span.right-half');
		pivot.innerHTML='';
		leftHalf.innerHTML='';
		rightHalf.innerHTML='';
            }
	}

    });
};

speedReaderInit();
