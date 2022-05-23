import { useState } from "react";


export const useWoordle = (solution: string) => {

    const [turn, setTurn] = useState(1);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState<Guess[]>([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState<String[]>([]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState<any>({});

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        const solutionArray = solution.split('');
        const formatedGuess = currentGuess.split('').map((letter, index) => {
            if(solutionArray[index] === letter){
                solutionArray[index] = '';
                return { key: letter, color: 'green' };
            }
            else{
                return { key: letter, color: 'grey' };
            }
        }).map(letterObj => {
            if(solutionArray.includes(letterObj.key)){
                solutionArray[solutionArray.indexOf(letterObj.key)] = '';
                return { ...letterObj, color: 'yellow' };
            }
            else{
                return letterObj;
            }
        })
        return formatedGuess;
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formatedGuess: Guess) => {
        if(currentGuess === solution){
            setIsCorrect(true);
        }
        setGuesses(prevGuesses => {
            const newGuesses = [...prevGuesses];
            newGuesses[turn - 1] = formatedGuess;
            return newGuesses;
        });
        setHistory(prev => [...prev, currentGuess]);
        setTurn(prev => prev + 1);
        setUsedKeys((prev: any) => {
            const newKeys = { ...prev };
            formatedGuess.forEach(item => {
                const currentColor = newKeys[item.key];
                if(item.color === 'green'){
                    newKeys[item.key] = item.color;
                }
                else if(item.color === 'yellow' && currentColor !== 'green'){
                    newKeys[item.key] = item.color;
                }
                else if(item.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
                    newKeys[item.key] = item.color;
                }
            });
            return newKeys;
        });
        setCurrentGuess('');
    }

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyUp = ({ key }: KeyboardEvent) => {
        if(key === 'Backspace'){
            setCurrentGuess(prev => prev.slice(0, - 1));
        }
        else if(key === 'Enter'){
            if(turn > 6){
                console.log('You have already used up all your guesses');
            }
            else if(currentGuess.length !== 5){
                console.log('Word must be 5 letters long');
            }
            else{
                const duplicate = history.includes(currentGuess);
                if(duplicate){
                    console.log('You have already tried that word');
                }
                else{
                    const formatedGuess = formatGuess();
                    addNewGuess(formatedGuess);
                }
            }
        }
        else if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length < 5){
                setCurrentGuess(prev => prev + key.toLowerCase());
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp };
}