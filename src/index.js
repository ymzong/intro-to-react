import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {/* TODO */}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
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
                <h1>Tic-Tac-Toe Gameboard</h1>,
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
