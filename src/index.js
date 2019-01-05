import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class Board extends React.Component {
    /**
     *
     * React elements can have state by having a constructor that initializes this.state (as dict).
     * In JavaScript, it's necessary to call super() when defining the constrctor of a subclass.
     *
     * State can be modified with this.setState({ k: v }).
     *
     * Lifting state up from Square to Board allows Board to have information on all boards,
     * such that it can render all Square elements and determine the winner easily.
     * This is the clean, recommended approach.
     */
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            nextMove: "🦄️"
        };
    }

    handleClick(i) {
        // Ignore already occupied squares
        if (this.state.squares[i] !== null) {
            return;
        }

        // Note the use of immutable array by making a hard copy with slice().
        // It allows for pure components in React.
        const currentSquares = this.state.squares.slice();
        currentSquares[i] = this.state.nextMove;
        this.setState({
            squares: currentSquares,
            nextMove: (this.state.nextMove === "🦊") ? "🦄️" : "🦊"
        });
    }

    renderSquare(i) {
        /**
         * In order for a click on Square to modify the state of Board, we need to pass down
         * a function like this.handleClick(i) below.
         */
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="status">Next Player: {this.state.nextMove}</div>
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
    render() {
        return (
            [
                <h1>🦄️Tic-Tac-Toe Gameboard🦊</h1>,
                <div className="game">
                    <div className="game-board">
                        <Board />
                    </div>
                    <div className="game-info">
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
            ]
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
            <div class="shopping-list">
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
