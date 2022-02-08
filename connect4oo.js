// see email from 07feb22 for help. 


class Game {
    constructor(HEIGHT = 6, WIDTH = 7) {
        this.HEIGHT = HEIGHT;
        this.WIDTH = WIDTH;
        this.board = [];
        this.top = document.createElement('tr');
        // this.handleGameClick = this.handleClick.bind(this);
        this.currPlayer = 1

    };
    makeBoard() {
        for (let y = 0; y < this.HEIGHT; y++) { this.board.push(Array.from({ length: this.WIDTH })) }
    };
    makeHTMLBoard() {
        const board = document.getElementById('board');
        // make column tops (clickable area for adding a piece to that column)
        this.top.setAttribute('id', 'column-top');
        this.top.addEventListener('click', this.handleGameClick);

        for (let x = 0; x < this.WIDTH; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            this.top.append(headCell);
        }

        board.append(this.top);

        // make main part of this.board
        for (let y = 0; y < this.HEIGHT; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.WIDTH; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
            }

            board.append(row);
        }
    };
    findSpotForCol(x) {
        for (let y = this.HEIGHT - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
                return y;
            }
        }
        return null;
    };
    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.classList.add(`p${this.currPlayer}`);
        piece.style.top = -50 * (y + 2);

        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    };
    endGame(msg) {
        alert(msg);
    };

    handleClick(evt) {
        // get x from ID of clicked cell
        const x = +evt.target.id;

        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(this.x);
        if (y === null) {
            return;
        }

        // place piece in this.board and add to HTML table
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        // check for win
        if (this.checkForGameWin()) {
            return endGame(`Player ${currPlayer} won!`);
        }

        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
            return endGame('Tie!');
        }

        // switch players
        this.currPlayer = this.currPlayer === 1 ? 2 : 1;
    };
    handleGameClick = this.handleClick.bind(this);
    checkForWin() {
        function _win(cells) {
            // Check four cells to see if they're all color of current player
            //  - cells: list of four (y, x) cells
            //  - returns true if all are legal coordinates & all match currPlayer

            return cells.every(
                ([y, x]) =>
                    y >= 0 &&
                    y < this.HEIGHT &&
                    x >= 0 &&
                    x < this.WIDTH &&
                    this.board[y][x] === currPlayer
            );
        }

        for (let y = 0; y < this.HEIGHT; y++) {
            for (let x = 0; x < this.WIDTH; x++) {
                // get "check list" of 4 cells (starting here) for each of the different
                // ways to win
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

                // find winner (only checking each win-possibility as needed)
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }
            }
        }
    }
    checkForGameWin = this.checkForWin.bind(this);
}

const myGame = new Game();
myGame.makeBoard();
myGame.makeHTMLBoard();


























