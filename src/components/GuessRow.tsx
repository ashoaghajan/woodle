import React from 'react';

interface GuessRowProps {
    guess: Guess,
    currentGuess?: string
}
 
const GuessRow: React.FC<GuessRowProps> = ({ guess, currentGuess }) => {

    if(guess){
        return (
            <div className="row past">
                {guess.map((letter, index) => (
                    <div key={index} className={letter.color}>{letter.key}</div>
                ))}
            </div>
        );
    }
    else if(currentGuess){
        return (
            <div className="row current">
                {currentGuess.split('').map((letter, index) => (
                    <div key={index} className='filled'>{letter}</div>
                ))}
                {[...Array(5 - currentGuess.length)].map((_, index) => (
                    <div key={index}></div>
                ))}
            </div>
        );
    }
    else{
        return ( 
            <div className="row">
                {[1,2,3,4,5].map(number => (
                    <div key={number}></div>
                ))}
            </div>
        );
    }
}
 
export default GuessRow;

