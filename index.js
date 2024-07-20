class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    describe() {
        const valueNames = [null, null, "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        return `${valueNames[this.value]} of ${this.suit}`;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        for (let suit of suits) {
            for (let value = 2; value <= 14; value++) {
                this.cards.push(new Card(value, suit));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        return this.cards.pop();
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.hand = [];
    }

    playCard() {
        return this.hand.pop();
    }

    incrementScore() {
        this.score++;
    }

    describe() {
        return `${this.name} has ${this.score} points.`;
    }
}

class Game {
    constructor() {
        this.player1 = new Player('Player 1');
        this.player2 = new Player('Player 2');
        this.deck = new Deck();
    }

    start() {
        this.deck.shuffle();
        this.dealCards();
        this.playGame();
        this.declareWinner();
    }

    dealCards() {
        for (let i = 0; i < 26; i++) {
            this.player1.hand.push(this.deck.deal());
            this.player2.hand.push(this.deck.deal());
        }
    }

    playGame() {
        for (let i = 0; i < 26; i++) {
            const card1 = this.player1.playCard();
            const card2 = this.player2.playCard();
            console.log(`Player 1 plays: ${card1.describe()}`);
            console.log(`Player 2 plays: ${card2.describe()}`);
            if (card1.value > card2.value) {
                this.player1.incrementScore();
                console.log('Player 1 wins the round');
            } else if (card2.value > card1.value) {
                this.player2.incrementScore();
                console.log('Player 2 wins the round');
            } else {
                console.log('It\'s a tie');
            }
            console.log(this.player1.describe());
            console.log(this.player2.describe());
            console.log('-------------------------');
        }
    }

    declareWinner() {
        console.log(this.player1.describe());
        console.log(this.player2.describe());
        if (this.player1.score > this.player2.score) {
            console.log('Player 1 wins the game!');
        } else if (this.player2.score > this.player1.score) {
            console.log('Player 2 wins the game!');
        } else {
            console.log('It\'s a tie game!');
        }
    }
}

const game = new Game();
game.start();
