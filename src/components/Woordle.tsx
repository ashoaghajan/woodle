import React, { useEffect, useState } from 'react';
import { useWoordle } from '../hooks/useWoordle';
import GuessGrid from './GuessGrid';
import Keypad from './Keypad';
import Modal from './Modal';

interface WoordleProps {
    solution: string
}
 
const Woordle: React.FC<WoordleProps> = ({ solution }) => {

    const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp } = useWoordle(solution);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        if(isCorrect || turn > 6){
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener('keyup', handleKeyUp);
        }

        return () => window.removeEventListener('keyup', handleKeyUp);
    },[handleKeyUp, isCorrect, turn]);

    return ( 
        <div>
            <div>solution - {solution}</div>
            <div>current guess - {currentGuess}</div>
            <GuessGrid turn={turn} currentGuess={currentGuess} guesses={guesses}/>
            <Keypad usedKeys={usedKeys}/>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
        </div>
    );
}
 
export default Woordle;