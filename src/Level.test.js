import Level from './Level';
global.Phaser = {
    Math: {
        Between: jest.fn().mockReturnValue(1),
    },
};
describe('Level', () => {
    let level;
    let scene;
    let mockText;

    beforeEach(() => {
        mockText = {
            setOrigin: jest.fn().mockReturnThis(),
            setStyle: jest.fn().mockReturnThis(),
            setTint: jest.fn(),
            setInteractive: jest.fn().mockReturnThis(),
            on: jest.fn().mockReturnThis(),
            disableInteractive: jest.fn().mockReturnThis(),
        };

        scene = {
            add: {
                text: jest.fn().mockReturnValue(mockText),
            },
        };

        level = new Level(scene);
    });

    describe('create', () => {
        it('should create game elements', () => {
            level.create();

            expect(scene.add.text).toHaveBeenCalledTimes(8);
            expect(mockText.setOrigin).toHaveBeenCalledTimes(8);
        });

        it('should add event listeners', () => {
            level.create();

            expect(mockText.setInteractive).toHaveBeenCalledTimes(3);
            expect(mockText.on).toHaveBeenCalledTimes(3);
        });
    });

    describe('generateComputerChoice', () => {
        beforeEach(() => {
            jest.spyOn(level, 'determineWinner').mockReturnValue('tie');
            jest.spyOn(level, 'displayResult');
            jest.spyOn(Phaser.Math, 'Between').mockReturnValue(0);
        });

        it('should generate computer choice and display result', () => {
            level.generateComputerChoice('stone');

            expect(scene.add.text).toHaveBeenCalledTimes(4);
            expect(mockText.setOrigin).toHaveBeenCalledTimes(4);
            expect(level.determineWinner).toHaveBeenCalledWith('stone', 'stone');
            expect(level.displayResult).toHaveBeenCalledWith('stone', 'stone', 'tie');
        });
    });

    describe('determineWinner', () => {
        it('should return "tie" if playerChoice and computerChoice are the same', () => {
            expect(level.determineWinner('stone', 'stone')).toBe('tie');
        });

        it('should return "player" if playerChoice beats computerChoice', () => {
            expect(level.determineWinner('stone', 'scissor')).toBe('player');
        });

        it('should return "computer" if computerChoice beats playerChoice', () => {
            expect(level.determineWinner('stone', 'paper')).toBe('computer');
        });
    });

    describe('displayResult', () => {
        let playerChoice;
        let computerChoice;
        let winner;
        let resultText;
        let playAgain_button;

        beforeEach(() => {
            playerChoice = 'stone';
            computerChoice = 'scissor';
            resultText = {
                setOrigin: jest.fn().mockReturnThis(),
                setTint: jest.fn().mockReturnThis(),
                setStyle: jest.fn().mockReturnThis(),
            };
            playAgain_button = {
                setOrigin: jest.fn().mockReturnThis(),
                setTint: jest.fn().mockReturnThis(),
                setStyle: jest.fn().mockReturnThis(),
                setInteractive: jest.fn().mockReturnThis(),
                on: jest.fn().mockReturnThis(),
            };
            scene.add.text = jest.fn().mockReturnValueOnce(resultText).mockReturnValueOnce(playAgain_button);
        });

        it('should display "It\'s a tie!" if winner is "tie"', () => {
            winner = 'tie';
            level.displayResult(playerChoice, computerChoice, winner);

            expect(scene.add.text).toHaveBeenCalledWith(540, 960, 'It\'s a tie!');
            expect(resultText.setOrigin).toHaveBeenCalledWith(0.5);
            expect(resultText.setTint).toHaveBeenCalledWith(8700130);
            expect(resultText.setStyle).toHaveBeenCalledWith({ "align": "center", "fontSize": "58px", "fontStyle": "bold italic" });
        });

        it('should display player win message if winner is "player"', () => {
            winner = 'player';
            level.displayResult(playerChoice, computerChoice, winner);

            expect(scene.add.text).toHaveBeenCalledWith(540, 960, `You win! ${playerChoice} beats ${computerChoice}`);
            expect(resultText.setOrigin).toHaveBeenCalledWith(0.5);
            expect(resultText.setTint).toHaveBeenCalledWith(8700030);
            expect(resultText.setStyle).toHaveBeenCalledWith({ "align": "center", "fontSize": "58px", "fontStyle": "bold italic" });
        });

        it('should display computer win message if winner is "computer"', () => {
            winner = 'computer';
            level.displayResult(playerChoice, computerChoice, winner);

            expect(scene.add.text).toHaveBeenCalledWith(540, 960, `You lose! ${computerChoice} beats ${playerChoice}`);
            expect(resultText.setOrigin).toHaveBeenCalledWith(0.5);
            expect(resultText.setTint).toHaveBeenCalledWith(8400130);
            expect(resultText.setStyle).toHaveBeenCalledWith({ "align": "center", "fontSize": "58px", "fontStyle": "bold italic" });
        });

        it('should create a "Play Again" button', () => {
            winner = 'player';
            level.displayResult(playerChoice, computerChoice, winner);

            expect(scene.add.text).toHaveBeenCalledWith(540, 1160, 'Play Again');
            expect(playAgain_button.setOrigin).toHaveBeenCalledWith(0.50);
            expect(playAgain_button.setTint).toHaveBeenCalledWith(8410130);
            expect(playAgain_button.setStyle).toHaveBeenCalledWith({ "align": "center", "fontSize": "58px", "fontStyle": "bold italic" });
            expect(playAgain_button.setInteractive).toHaveBeenCalled();
            expect(playAgain_button.on).toHaveBeenCalledWith('pointerdown', expect.any(Function));
        });
    });

});