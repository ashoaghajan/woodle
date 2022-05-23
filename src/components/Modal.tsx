import React from 'react';

interface ModalProps {
    isCorrect: boolean,
    turn: number,
    solution: string
}
 
const Modal: React.FC<ModalProps> = ({ isCorrect, turn, solution }) => {
    return ( 
        <div className='modal'> 
        {isCorrect ? (
            <div>
                <h1>You Win!</h1>
                <p className="solution">{solution}</p>
                <p>You found the solution in {turn - 1} guesses :)</p>
            </div>
        ) : (
            <div>
                <h1>Nevermind!</h1>
                <p className="solution">{solution}</p>
                <p>Better luck next time :)</p>
            </div>
        )}
        </div>
    );
}
 
export default Modal;