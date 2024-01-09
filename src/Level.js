export default class Level {
    constructor(scene) {
        this.scene = scene;
    }

    create() {
        // Set up game elements
        const playerTxt = this.scene.add.text(540, 100, ' PLAYER ', {}).setOrigin(0.5);
        playerTxt.tintFill = true;
        playerTxt.tintBottomLeft = 8700130;
        playerTxt.tintBottomRight = 8700130;
        playerTxt.setStyle({ "align": "center", "fontSize": "64px", "fontStyle": "bold italic" });
        const computerTxt = this.scene.add.text(540, 1820, ' Computer ', {}).setOrigin(0.5);
        computerTxt.tintFill = true;
        computerTxt.tintBottomLeft = 8600130;
        computerTxt.tintBottomRight = 8600130;
        computerTxt.setStyle({ "align": "center", "fontSize": "64px", "fontStyle": "bold italic" });
        const playerStoneText = this.scene.add.text(100, 200, 'Stone', { "align": "center", "fontSize": "32px", "fontStyle": "bold italic" }).setOrigin(0.5).setInteractive();
        playerStoneText.tintFill = true;
        playerStoneText.tintBottomLeft = 8700030;
        playerStoneText.tintBottomRight = 8700030;
        const playerPaperText = this.scene.add.text(540, 200, 'Paper', { "align": "center", "fontSize": "32px", "fontStyle": "bold italic" }).setOrigin(0.5).setInteractive();
        playerPaperText.tintFill = true;
        playerPaperText.tintBottomLeft = 8700030;
        playerPaperText.tintBottomRight = 8700030;
        const playerScissorText = this.scene.add.text(980, 200, 'Scissor', { "align": "center", "fontSize": "32px", "fontStyle": "bold italic" }).setOrigin(0.5).setInteractive();
        playerScissorText.tintFill = true;
        playerScissorText.tintBottomLeft = 8700030;
        playerScissorText.tintBottomRight = 8700030;
        const computerStoneText = this.scene.add.text(100, 1720, 'Stone', { "align": "center", "fontSize": "32px", "fontStyle": "bold italic" }).setOrigin(0.5);
        computerStoneText.tintFill = true;
        computerStoneText.tintBottomLeft = 8400130;
        computerStoneText.tintBottomRight = 8400130;
        const computerPaperText = this.scene.add.text(540, 1720, 'Paper', { "align": "center", "fontSize": "32px", "fontStyle": "bold italic" }).setOrigin(0.5);
        computerPaperText.tintFill = true;
        computerPaperText.tintBottomLeft = 8400130;
        computerPaperText.tintBottomRight = 8400130;
        const computerScissorText = this.scene.add.text(980, 1720, 'Scissor', { "align": "center", "fontSize": "32px", "fontStyle": "bold italic" }).setOrigin(0.5);
        computerScissorText.tintFill = true;
        computerScissorText.tintBottomLeft = 8400130;
        computerScissorText.tintBottomRight = 8400130;

        // Add event listeners
        playerStoneText.on('pointerdown', () => {
            playerPaperText.disableInteractive();
            playerScissorText.disableInteractive();
            this.generateComputerChoice('stone');
        });
        playerPaperText.on('pointerdown', () => {
            playerStoneText.disableInteractive();
            playerScissorText.disableInteractive();
            this.generateComputerChoice('paper');
        });
        playerScissorText.on('pointerdown', () => {
            playerPaperText.disableInteractive();
            playerStoneText.disableInteractive();
            this.generateComputerChoice('scissor');
        });
    }
    generateComputerChoice(playerChoice) {
        const playerChoiceText = this.scene.add.text(540, 500, `Player chose: ${playerChoice}`, { fontSize: '46px', fill: '#ffff' }).setOrigin(0.5);
        playerChoiceText.tintFill = true;
        playerChoiceText.tintBottomLeft = 8700030;
        playerChoiceText.tintBottomRight = 8700030;
        playerChoiceText.setStyle({ "align": "center", "fontSize": "58px", "fontStyle": "bold italic" });
        // Generate a random choice for the computer
        const choices = ['stone', 'paper', 'scissor'];
        const randomIndex = Phaser.Math.Between(0, 2);
        const computerChoiceText = this.scene.add.text(540, 1420, `Computer chose: ${choices[randomIndex]}`, { fontSize: '46px', fill: '#ffff' }).setOrigin(0.5);
        computerChoiceText.tintFill = true;
        computerChoiceText.tintBottomLeft = 8400130;
        computerChoiceText.tintBottomRight = 8400130;
        computerChoiceText.setStyle({ "align": "center", "fontSize": "58px", "fontStyle": "bold italic" });
        const winner = this.determineWinner(playerChoice, choices[randomIndex]);
        // Display the result
        this.displayResult(playerChoice, choices[randomIndex], winner);
    }
    determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'tie';
        } else if (
            (playerChoice === 'stone' && computerChoice === 'scissor') ||
            (playerChoice === 'paper' && computerChoice === 'stone') ||
            (playerChoice === 'scissor' && computerChoice === 'paper')
        ) {
            return 'player';
        } else {
            return 'computer';
        }
    }
    displayResult(playerChoice, computerChoice, winner) {
        // Create a text object to display the result
        let resultText;
        // Determine the result message based on the winner
        if (winner === 'tie') {
            resultText = this.scene.add.text(540, 960, 'It\'s a tie!').setOrigin(0.5);
        } else if (winner === 'player') {
            resultText = this.scene.add.text(540, 960, `You win! ${playerChoice} beats ${computerChoice}`).setOrigin(0.5);
        } else {
            resultText = this.scene.add.text(540, 960, `You lose! ${computerChoice} beats ${playerChoice}`).setOrigin(0.5);
        }
        // Set the result text to be interactive
        resultText.tintFill = true;
        if (winner == 'player') {
            resultText.setTint(8700030);
        }
        if (winner == 'tie') {
            resultText.setTint(8700130);
        }
        if (winner == 'computer') {
            resultText.setTint(8400130);
        }
        resultText.setStyle({ "align": "center", "fontSize": "58px", "fontStyle": "bold italic" });
        // Add an event listener to remove the result text when clicked
        const playAgain_button = this.scene.add.text(540, 1160, 'Play Again');
        playAgain_button.setTint(8410130);
        playAgain_button.setStyle({ "align": "center", "fontSize": "58px", "fontStyle": "bold italic" });
        playAgain_button.setInteractive();
        playAgain_button.setOrigin(0.50);
        playAgain_button.on('pointerdown', () => {
            this.scene.scene.restart();
        });
    }
}