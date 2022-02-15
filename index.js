class Model {
    constructor(size) {
        let {
            gameSize = 6,
            gameScore = 0,
            gameHighestScore = 0,
            gameValue = undefined,
        } = JSON.parse(localStorage.getItem("2048_Advance")) || {};
        this.gameSize = gameSize;
        this.gameScore = gameScore;
        this.gameHighestScore = gameHighestScore;
        this.gameValue = gameValue;
        if (this.gameValue === undefined) this._restartGame();
    }

    _restartGame() {
        this.gameValue = [];
        for (let i = 0; i < this.gameSize; i++) {
            let tmpArray = new Array();
            for (let j = 0; j < this.gameSize; j++) {
                tmpArray.push(0);
            }
            this.gameValue.push(tmpArray);
        }
        this.getRandomPosition();
    }

    _commit() {
        this.getRandomPosition();
        this.gameHighestScore = Math.max(this.gameHighestScore, this.gameScore);
        localStorage.setItem(
            "2048_Advance",
            JSON.stringify({
                gameHighestScore: this.gameHighestScore,
                gameSize: this.gameSize,
                gameScore: this.gameScore,
                gameValue: this.gameValue,
            })
        );
        this.onMove(this.gameValue, this.gameScore);
    }

    getRandomPosition() {
        let x,
            y,
            zeroPositions = new Array();
        for (let i = 0; i < this.gameSize * this.gameSize; i++) {
            x = Math.floor(i / this.gameSize);
            y = Math.floor(i % this.gameSize);
            if (this.gameValue[x][y] == 0) {
                zeroPositions.push(i);
            }
        }
        if (zeroPositions.length === 0) {
            alert("Game over!!! No positions left");
        }

        let guess = Math.floor(Math.random() * zeroPositions.length);
        x = Math.floor(zeroPositions[guess] / this.gameSize);
        y = Math.floor(zeroPositions[guess] % this.gameSize);

        this.gameValue[x][y] = 2;
    }

    upMove() {
        for (let j = 0; j < this.gameSize; j++) {
            let cnt = 0;
            for (let i = 0; i < this.gameSize; i++) {
                if (this.gameValue[i][j] !== 0)
                    this.gameValue[cnt++][j] = this.gameValue[i][j];
            }
            for (let i = cnt; i < this.gameSize; i++) {
                this.gameValue[i][j] = 0;
            }
            cnt = 0;
            for (let i = 0; i < this.gameSize; i++) {
                if (
                    i + 1 < this.gameSize &&
                    this.gameValue[i][j] === this.gameValue[i + 1][j]
                ) {
                    this.gameScore +=
                        this.gameValue[i][j] + this.gameValue[i + 1][j];
                    this.gameValue[cnt++][j] =
                        this.gameValue[i][j] + this.gameValue[i + 1][j];
                    i++;
                } else {
                    this.gameValue[cnt++][j] = this.gameValue[i][j];
                }
            }
            for (let i = cnt; i < this.gameSize; i++) {
                this.gameValue[i][j] = 0;
            }
        }

        this._commit("Up");
    }

    downMove() {
        for (let j = 0; j < this.gameSize; j++) {
            let cnt = this.gameSize - 1;
            for (let i = this.gameSize - 1; i >= 0; i--) {
                if (this.gameValue[i][j] !== 0)
                    this.gameValue[cnt--][j] = this.gameValue[i][j];
            }
            for (let i = cnt; i >= 0; i--) {
                this.gameValue[i][j] = 0;
            }
            cnt = this.gameSize - 1;
            for (let i = this.gameSize - 1; i >= 0; i--) {
                if (
                    i - 1 >= 0 &&
                    this.gameValue[i][j] === this.gameValue[i - 1][j]
                ) {
                    this.gameScore +=
                        this.gameValue[i][j] + this.gameValue[i - 1][j];
                    this.gameValue[cnt--][j] =
                        this.gameValue[i][j] + this.gameValue[i - 1][j];
                    i--;
                } else {
                    this.gameValue[cnt--][j] = this.gameValue[i][j];
                }
            }
            for (let i = cnt; i >= 0; i--) {
                this.gameValue[i][j] = 0;
            }
        }

        this._commit("Down");
    }

    leftMove() {
        for (let i = 0; i < this.gameSize; i++) {
            let cnt = 0;
            for (let j = 0; j < this.gameSize; j++) {
                if (this.gameValue[i][j] !== 0)
                    this.gameValue[i][cnt++] = this.gameValue[i][j];
            }
            for (let j = cnt; j < this.gameSize; j++) {
                this.gameValue[i][j] = 0;
            }
            cnt = 0;
            for (let j = 0; j < this.gameSize; j++) {
                if (
                    j + 1 < this.gameSize &&
                    this.gameValue[i][j] === this.gameValue[i][j + 1]
                ) {
                    this.gameScore +=
                        this.gameValue[i][j] + this.gameValue[i][j + 1];
                    this.gameValue[i][cnt++] =
                        this.gameValue[i][j] + this.gameValue[i][j + 1];
                    j++;
                } else {
                    this.gameValue[i][cnt++] = this.gameValue[i][j];
                }
            }
            for (let j = cnt; j < this.gameSize; j++) {
                this.gameValue[i][j] = 0;
            }
        }
        this._commit("Left");
    }

    rightMove() {
        for (let i = 0; i < this.gameSize; i++) {
            let cnt = this.gameSize - 1;
            for (let j = this.gameSize - 1; j >= 0; j--) {
                if (this.gameValue[i][j] !== 0)
                    this.gameValue[i][cnt--] = this.gameValue[i][j];
            }
            for (let j = cnt; j >= 0; j--) {
                this.gameValue[i][j] = 0;
            }
            cnt = this.gameSize - 1;
            for (let j = this.gameSize - 1; j >= 0; j--) {
                if (
                    j - 1 >= 0 &&
                    this.gameValue[i][j] === this.gameValue[i][j - 1]
                ) {
                    this.gameScore +=
                        this.gameValue[i][j] + this.gameValue[i][j - 1];
                    this.gameValue[i][cnt--] =
                        this.gameValue[i][j] + this.gameValue[i][j - 1];
                    j--;
                } else {
                    this.gameValue[i][cnt--] = this.gameValue[i][j];
                }
            }
            for (let j = cnt; j >= 0; j--) {
                this.gameValue[i][j] = 0;
            }
        }
        this._commit("Right");
    }

    bindValueChange(callback) {
        this.onMove = callback;
    }
}

class View {
    constructor(size) {
        this.gameSize = size;

        this.gameTitle = this.createElement("div", "game-title");
        this.gameTitle.innerHTML = `<h1>2048 Advance </h1>`;
        this.gameScore = this.createElement("div", "game-score");
        this.gameSquares = this.createElement("div", "game-squares");

        this.gameSettings = this.createElement("div", "game-settings");
        this.gameSettings.append(this.gameTitle, this.gameScore);

        this.gameArea = this.createElement("div", "game-area");
        this.gameArea.append(this.gameSquares, this.gameSettings);

        this.gameWrapper = this.getElement(".game-wrapper");
        this.gameWrapper.append(this.gameArea);
    }

    displaySquares(gameValue, gameScore) {
        this.gameScore.innerHTML = `<h3>Score : ${gameScore || 0}</h3>`;
        this.gameSquares.innerHTML = "";
        for (let i = 0; i < this.gameSize; i++) {
            let row = this.createElement("div", "game-squares-row");
            for (let j = 0; j < this.gameSize; j++) {
                let col = this.createElement("div", "game-squares-cell");
                col.innerHTML = `<p>${
                    (gameValue && gameValue[i][j]) || ""
                }</p>`;
                row.append(col);
            }
            this.gameSquares.append(row);
        }
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    bindArrowMove(moves) {
        document.addEventListener("keyup", (event) => {
            event.preventDefault();
            if (event.key === "ArrowUp") moves.upMove();
            if (event.key === "ArrowDown") moves.downMove();
            if (event.key === "ArrowLeft") moves.leftMove();
            if (event.key === "ArrowRight") moves.rightMove();
        });
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.onMove(this.model.gameValue);
        this.view.bindArrowMove(this.handleArrowMove);
        this.model.bindValueChange(this.onMove);
    }

    onMove = (gameValue, gameScore) => {
        this.view.displaySquares(gameValue, gameScore);
    };

    handleArrowMove = {
        upMove: () => {
            this.model.upMove();
        },
        downMove: () => {
            this.model.downMove();
        },
        leftMove: () => {
            this.model.leftMove();
        },
        rightMove: () => {
            this.model.rightMove();
        },
    };
}

var size = 6;
var app = new Controller(new Model(size), new View(size));
