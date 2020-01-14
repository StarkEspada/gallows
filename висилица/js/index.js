
//слова должны быть не длиннее 11 букв

var data = [
	{
		word: ["б","а","н","а","н"]
	},
	{
		word:["я","б","л","о","к","о"]
	},
	{
		word:["а","п","е","л","с","и","н"]
	},
	{
		word:["в","и","н","о","г","р","а","д"]
	},
	{
		word:["м","а","н","д","а","р","и","н"]
	},
	{
		word:["а","р","б","у","з"]
	}
]				

var shuffledArr = data.sort(function(){
  return Math.random() - 0.5;
});

var people = ["img/голова.png", "img/тело.png", "img/правая рука.png", "img/левая рука.png", 
"img/правая нога.png", "img/левая нога.png"]

var alphabet = ["а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н","о","п","р",
				"с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я"]

var k = 0
class Gallows{

	constructor(containerWord, people, containerImage, containerAlphabet, containerLetter, dataAlphabet, start, k, endGame, yes, no, containerWinner, yesWinner, noWinner){
		this.containerLetter = document.querySelector(containerLetter)
		this.containerAlphabet = document.querySelector(containerAlphabet)
		this.containerWord = document.querySelector(containerWord)
		this.containerImage = document.querySelector(containerImage)
		this.containerWinner = document.querySelector(containerWinner)
		this.start = document.querySelector(start)
		this.endGame = document.querySelector(endGame)
		this.yes = document.querySelector(yes)
		this.no = document.querySelector(no)
		this.yesWinner = document.querySelector(yesWinner)
		this.noWinner = document.querySelector(noWinner)
		this.dataAlphabet = dataAlphabet
		this.people = people
		this.k = k
		this.hangmanTwo = []
		this.alphabetArr = []
		this.letterArr = []
		this.letterArrTwo = []
		this.place = []
		this.placeColor = []
		this.letter = null
		this.index = null
		this.boxLetter = null
		this.alphabet = null
		this.winner = null
		this.hangman = null
		this.init()
	}

	createHangman(type){
		var hangman = document.createElement("img")
		hangman.classList.add(type)
		this.containerImage.appendChild(hangman)
		this.hangman = hangman
		this.hangmanTwo.push(this.hangman)
		this.endGame.style.display = "none"
		this.containerWinner.style.display = "none"
		
	}

	renderHangman(){
		for(var i = 0; i < this.people.length; i++){
			this.createHangman("body-part" + i)
			this.hangman.setAttribute("src", this.people[i])
			this.hangmanTwo[i].style.display = "none"
		}
	}


	createCellAlphabet(type){
		var alphabet = document.createElement("div")
		alphabet.classList.add(type)
		this.containerAlphabet.appendChild(alphabet)
		this.alphabet = alphabet
	}

	renderAlphabet(){
		for(var i = 0; i < this.dataAlphabet.length; i++){
			this.createCellAlphabet("box-alphabet")
			this.alphabet.innerHTML = this.dataAlphabet[i]
			this.alphabetArr.push(this.alphabet)
			}
		}


	createCellWordLetter(typeTwo){
		var boxLetter = document.createElement("div")
		boxLetter.classList.add(typeTwo)
		this.containerLetter.appendChild(boxLetter)
		this.boxLetter = boxLetter
	}

	createWordLetter(typeTree){
			var letter = document.createElement("div")
			letter.classList.add(typeTree)
			this.boxLetter.appendChild(letter)
			this.letter = letter
		}

	renderWordLetterCellClass(){
		for(var i = 0; i < shuffledArr[this.k].word.length; i++){
			this.createCellWordLetter("box-letter")
			this.createWordLetter("letter")
			this.letter.innerHTML = shuffledArr[this.k].word[i]
			this.letterArr.push(this.letter.innerHTML)
			this.letterArrTwo.push(this.letter)
			this.letterArrTwo[i].style.display = "none"
			}
	}


	check(){

	this.containerAlphabet.addEventListener("click", handler.bind(this))
		var index = 0
		var winner = 0
		this.winner = winner
		this.index = index
		this.containerAlphabet.style.userSelect = "none";
		function handler(){
			var checkContainer = event.target.classList.contains("box-alphabet")
				if(checkContainer === true){
					var place = event.target;
					var placeColor = event.target;
				} else {
					console.log("Не тот элемент")
				}
				var number = false;
				for(var i = 0; i < shuffledArr[this.k].word.length; i++){
					if(this.letterArr[i] === place.innerHTML){
						this.place.push(place)
						number = true
						this.letterArrTwo[i].style.display = "block"
						placeColor.style.color = "green"
						this.placeColor.push(placeColor)
						this.winner++
						console.log(this.winner)
					} 
				}
				if(this.letterArr.length === this.winner){
					this.containerImage.style.display = "none"
					this.containerWord.style.display = "none"
					this.containerWinner.style.display = "block"
				}
				if(number === false){
					this.hangmanTwo[this.index].style.display = "block"
					place.style.display = "none"
					this.place.push(place)
					this.index++
				} 
				if (this.index === 6){
					this.containerImage.style.display = "none"
					this.containerWord.style.display = "none"
					this.endGame.style.display = "block"
				}

			}
		}


	nextWord(){
		this.start.addEventListener("click", handler.bind(this))

		function handler(){
			this.letterArrTwo = []
			this.letterArr = []
			this.index = 0
			this.winner = 0
			for(var i = 0; i < this.place.length; i++){
				this.place[i].style.display = "inline-block"
			}
			for(var i = 0; i < this.hangmanTwo.length; i++){
				this.hangmanTwo[i].style.display = "none"
			}
			for(var i = 0; i < this.placeColor.length; i++){
				this.placeColor[i].style.color = "black"
			}
			this.containerLetter.innerHTML = ""
			if(this.k === data.length -1){
				console.log("Последнее слово")
			}else {
				this.k++
			}
			this.place = []
			this.renderWordLetterCellClass()
		}
	}

	noloss(){
		this.no.addEventListener("mouseover", handler.bind(this))

		function handler(){
			var randomOne = Math.floor(Math.random() * 250) 
			var randomTwo = Math.floor(Math.random() * 250) 
			this.no.style.marginLeft = randomOne + "px"
			this.no.style.marginTop = randomTwo + "px"
		}
	}

	yesloss(){
		this.yes.addEventListener("click", handler.bind(this))

		function handler(){
			var reload = window.location.reload()
		}
	}

	noVictory(){
		this.noWinner.addEventListener("mouseover", handler.bind(this))

		function handler(){
			var randomOne = Math.floor(Math.random() * 250) 
			var randomTwo = Math.floor(Math.random() * 250) 
			this.noWinner.style.marginLeft = randomOne + "px"
			this.noWinner.style.marginTop = randomTwo + "px"
		}
	}

	yesVictory(){
		this.yesWinner.addEventListener("click", handler.bind(this))

		function handler(){
			var reload = window.location.reload()
		}
	}


	init(){
		this.renderAlphabet()
		this.renderWordLetterCellClass()
		this.renderHangman();
		this.nextWord()
		this.check()
		this.noloss()
		this.yesloss()
		this.noVictory()
		this.yesVictory()
	}
}


var gallows = new Gallows(".container-word", people, ".container-image", ".alphabet", ".container-letter", alphabet, ".start", k, ".end-game", ".yes", ".no", ".winner", ".yes-winner", ".no-winner")