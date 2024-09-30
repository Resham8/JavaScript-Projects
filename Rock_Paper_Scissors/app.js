const game = () => {
    let pScore = 0;
    let cScore = 0;

    // Start game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");

            // Add the reset button event listener when the game starts
            const resetBtn = document.getElementById('reset');
            resetBtn.addEventListener('click', resetGame);
        });
    };

    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');

        // Computer options
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach(option => {
            option.addEventListener('click', function () {
                // Computer's choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                compareHands(this.textContent, computerChoice);

                playerHand.src = `./assets/${this.textContent}.png`;
                computerHand.src = `./assets/${computerChoice}.png`;
            });
        });
    };

    const resetGame = () => {
        pScore = 0;
        cScore = 0;
        updateScore();

        const winner = document.querySelector('.winner');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');

        // Reset the text and images
        winner.textContent = 'Choose an Option';
        playerHand.src = './assets/rock.png';
        computerHand.src = './assets/rock.png';
    };

    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.winner');
        if (playerChoice === computerChoice) {
            winner.textContent = 'It is a Tie';
            return;
        }

        // rock
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            }
        }

        // paper
        if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            }
        }

        // scissors
        if (playerChoice === 'scissors') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Computer wins';
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Player wins';
                pScore++;
                updateScore();
                return;
            }
        }
    };

    startGame();
    playMatch();
};
game();
