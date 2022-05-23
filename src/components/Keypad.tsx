import React, { useEffect, useState } from 'react';
import { getLetters } from '../api/solutionsApi';

interface KeypadProps {
    usedKeys: any
}
 
const Keypad: React.FC<KeypadProps> = ({ usedKeys }) => {

    const [letters, setLetters] = useState<Letter[]>([]);

    useEffect(() => {
        getLetters().then(data => {
            data.length && setLetters(data);
        });
    },[])

    return ( 
        <div className='keypad'>
            {letters.map(item => {
                const color = usedKeys[item.key];
                return (
                    <div key={item.key} className={color || ''}>{item.key}</div>
                )
            })}
        </div>
    );
}
 
export default Keypad;
