interface Fruit {
    x: number;
    y: number;
}

interface Snake {
    x: number;
    y: number;
    velX: number;
    velY: number;
}

interface State {
    gameId: string;
    width: number;
    height: number;
    score: number;
    fruit: Fruit;
    snake: Snake;
}

export { State, Fruit, Snake };