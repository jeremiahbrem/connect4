describe ("testing each function in the connect4 game", () =>{
    beforeEach(() => {
        htmlBoard.innerText = '';
        height = 9;
        width = 10;
        board = [];
        makeBoard();
        makeHtmlBoard();
    })

    it ("should create an array with height number of arrays, each with width number of "+
        "null values with makeBoard()", () => {           
        expect(board.length).toEqual(9);
        for (let y of board) {
            expect(y.length).toEqual(10); 
            for (let x of y) {
                expect(x).toEqual(null);
            }
        }    
    })

    it ("should create HTML table with height + 1 number of tr's and "+
        "numb of tr's * width = number of td's , with makeHtmlBoard()", () => {
        expect(document.querySelectorAll('tr').length).toEqual(10);
        expect(document.querySelectorAll('td').length).toEqual(100);
    })

    it ("should return correct Y coordinate to drop game piece into with findSpotForCol", () => {
        // simulate two pieces already in a column, so function should return the next cell ups
        board[8][5] = 1;
        board[7][5] = 2;
        expect(findSpotForCol(5)).toEqual(6);
    })    

    it ("should create a div game piece and place into the correct cell with placeInTable", () => {
        placeInTable(3,5);
        expect(document.querySelector('.piece').parentElement.id).toEqual("3-5");
    })    

    it ("should place piece in correct column and cell, and switch players with handleClick", () => {

    })
    afterEach(() => {
        htmlBoard.innerText = ''
        height = '';
        width = '';
    })
})