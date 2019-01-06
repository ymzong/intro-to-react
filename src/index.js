import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Best practices for imports in ES6: https://stackoverflow.com/a/38469257/2448960
import { determineWinner, generateRewindText } from './utils.js';

/**
 * The original states of Square have been lifted up to the Board.
 * Square is now a controlled component.
 */
class SquareFullDefinition extends React.Component {
    render() {
        /**
         * We can specify onClick function with JavaScript between braces.
         *
         * Since we invoke setState within onClick for Square, it causes Square to re-render itself
         * whenever it's clicked. It also causes child components (if any) to re-render.
         */
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

/**
 * The following is the function component definition of Square, and it's suitable for components
 * that only have `render()` method. It's equivalent to the full definition above.
 *
 * Prop of the component is passed in as the only parameter.
 *
 * Note that the onClick function no longer uses the arrow syntax, as it's only necessary to use
 * arrow syntax to access the correct `this` in a class.
 */
function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

/**
 * Board is a controlled component now that it doesn't have any states.
 * Board status and next player are tracked in and passed down from Game.
 */
class Board extends React.Component {
    renderSquare(i) {
        /**
         * In order for a click on Square to modify the state of Game, we need to pass down
         * a function (`this.props.onClick(i)`) that is defined in Game.
         */
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    /**
     *
     * React elements can have state by having a constructor that initializes this.state (as dict).
     * In JavaScript, it's necessary to call super() when defining the constrctor of a subclass.
     *
     * State can be modified with this.setState({ k: v }).
     *
     * Lifting state up from Square to Board and then Game allows Game to have complete information
     * about the game, such that it can render the Board as well as all Square elements and
     * determine the winner easily.
     * 
     * This is the clean, recommended approach.
     */
    constructor(props) {
        super(props);
        // history prop tracks all historical boards in an array; last element is the current board
        this.state = {
            history: [{ squares: Array(9).fill(null), player: null, position: null }],
            nextMove: "🦄️",
            stepNumber: 0
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentBoard = history[this.state.stepNumber];

        // Ignore already occupied squares or already won game
        if (currentBoard.squares[i] !== null || determineWinner(currentBoard.squares)) {
            return;
        }

        // Note the use of immutable array by making a hard copy with slice().
        // It allows for pure components in React.
        const currentSquares = currentBoard.squares.slice();
        currentSquares[i] = this.state.nextMove;
        this.setState({
            history: history.concat([{
                squares: currentSquares,
                player: this.state.nextMove,
                position: i
            }]),
            nextMove: (this.state.nextMove === "🦊") ? "🦄️" : "🦊",
            stepNumber: history.length
        });
    }

    rewindBoard(idx) {
        this.setState({
            nextMove: ["🦄️", "🦊"][idx % 2],
            stepNumber: idx
        });
    }

    /**
     * By default, `render()` is invoked to refresh the component as well as its children (in this
     * case, Board and Squares) whenever `setState` is called for the component.
     */
    render() {
        const history = this.state.history;
        const currentBoard = history[this.state.stepNumber];

        const winner = determineWinner(currentBoard.squares);
        let gameInfo;
        if (winner === null) {
            gameInfo = "Next Player: " + this.state.nextMove;
        } else {
            gameInfo = "Winner is " + winner + "!";
        }

        /**
         * In dynamic component lists like `moves`, it's important to specify a reasonable `key` to
         * each element such that React knows when to create, delete, or re-render elements.
         */
        const moves = history.map((elem, idx) => {
            const description = generateRewindText(idx, elem.player, elem.position);
            const elementClass = (idx == this.state.stepNumber) ? "game-history-selected" : "";
            return (
                <li key={idx} className={elementClass}>
                    <button
                        onClick={() => this.rewindBoard(idx)}
                        className={elementClass}
                    >
                        {description}
                    </button>
                </li>
            );
        });

        return (
            <div className="game-area">
                <h1 className="game-title">🦄️Tic-Tac-Toe Gameboard🦊</h1>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={currentBoard.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{gameInfo}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * ShoppingList is a React Component.
 *
 * Each React Component has a render() method that describes what to be rendered on the screen,
 * and it usually uses JSX (XML-like syntax) for convenience. Any JavaScript expression can be
 * put inside braces, e.g. {this.props.name}.
 *
 * render() can refer to the component's props (properties) that are passed in during
 * instantiation, e.g. <ShoppingList name="Jimmy Zong" />
 *
 * React elements are JavaScript objects that can be passed around.
 */
class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}:</h1>
                <ul>
                    <li>Effective Java</li>
                    <li>Clean Code</li>
                    <li>Site Reliability Workbook</li>
                </ul>
            </div>
        );
    }
}

// The below are rendered on the page
ReactDOM.render(
    <div>
        <ShoppingList name="Jimmy Zong" />
        <Game />
    </div>,
    document.getElementById('root')
);
