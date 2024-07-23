export interface Fruit {
    x: number;
    y: number;
}

export interface Snake {
    x: number;
    y: number;
    velX: number;
    velY: number;
}

export interface State {
    gameId: string;
    width: number;
    height: number;
    score: number;
    fruit: Fruit;
    snake: Snake;
}

export interface Tick {
    velX: number;
    velY: number;
}
