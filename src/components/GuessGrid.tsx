import React from 'react';
import GuessRow from './GuessRow';

interface GuessGridProps {
    turn: number,
    currentGuess: string,
    guesses: Guess[]
}
 
const GuessGrid: React.FC<GuessGridProps> = ({ turn, currentGuess, guesses }) => {
    return ( 
       <div>
            {guesses.map((guess, index) => {
                if(index === turn - 1){
                    return <GuessRow key={index} guess={guess} currentGuess={currentGuess}/>
                }
                else{
                    return <GuessRow key={index} guess={guess}/>
                }
            })}
       </div>
    );
}
 
export default GuessGrid;

