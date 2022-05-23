/// <reference types="react-scripts" />

type Solution = {
    id: number;
    word: string
}

type Guess = { 
    key: string; 
    color: string; 
}[]

type Letter = {
    key: string
}