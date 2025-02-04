function knightMoves(start,end, outputElement) {
    const output = outputElement;
    output.innerHTML = ''; // Clear previous results

    function logToPage(message) {
        output.innerHTML += message + '\n';
    }

    if (start[0] === end[0] && start[1] === end[1]) {
        logToPage(`Start and end are identical!`);
        return [start]; 
    }

    const queue = [[start,[start]]];
    logToPage(`Initial queue:`, JSON.stringify(queue));

    const visited = new Set();//Prevents revisits <~> Set is a built-in object that lets you store a collection of unique values.
    visited.add(start.toString());
    logToPage(`Initial visited:`, [...visited]);
    
    const moves = [ // All possible knight moves
        [2, 1], [2, -1],
        [-2, 1], [-2, -1],
        [1, 2], [1, -2],
        [-1, 2], [-1, -2]
    ];

    while(queue.length > 0) {                                           // Core Algorithm Flow
        logToPage(`\n=== QUEUE LENGTH: ${queue.length} ===`);        //  loop continues as long as there are positions in the queue 
        const [currentPos,path] = queue.shift();                      // removes the first element (a position and its path) from the queue.
        logToPage(`Testing: [${currentPos}] path:`, JSON.stringify(path));

        logToPage(`Generating moves from [${currentPos}]:`); 
        for (const [dx,dy] of moves) {                             //Calculates all L-shaped knight moves & loop over each knight path
            const newX = currentPos[0] + dx;
            const newY = currentPos[1] + dy;
            const newPosition = [newX, newY];

         if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 ) { // Check if new position is within the chessboard (0 to 7)
            const key = newPosition.toString();
            logToPage(`checking move to ${newPosition}`)

            if (!visited.has(key)) {                     //If NOT in visited → add to visited and queue, If in visited → skip adding to queue
                visited.add(key);                       //added to new set() 
                const newPath = [...path,newPosition]; //Creates a copy of existing path <~>  path = [[0,0], [1,2]], ...path, Then adds newPos at the end
                queue.push([newPosition, newPath]);   //Each queue entry maintains its own path history
                logToPage(`    ✅ Valid new path:`, JSON.stringify(newPath));
            } else {
                logToPage(`    ❌ Already visited [${newPosition}]`)
            }
         } else {
            logToPage(`    ❌ Invalid move to [${newPosition}] (out of board)`);
         }
        }
        logToPage(`Updated queue [newPos, newPath]:`, JSON.stringify(queue));
        logToPage(`Updated visited positions:`, [...visited]);

        if (currentPos[0] === end[0] && currentPos[1] === end[1]  ) { 
            logToPage(`You made it in ${path.length - 1} moves! Here's your path:`);
            path.forEach(pos => logToPage(`[${pos}]`));
            return path
         }
    };
    logToPage("No path found. This is impossible on a standard 8x8 chessboard!");
    return null;
};