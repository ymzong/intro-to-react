
/**
 * Given a Tic-Tac-Toe board represented in 1D-array form, return the winner or `null` if none.
 */
export function determineWinner(board) {
    const winningIdx = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningIdx) {
        const [i, j, k] = combo;
        if (board[i] !== null && board[i] === board[j] && board[i] === board[k]) {
            return board[i];
        }
    }

    return null;    // no winner found
}
