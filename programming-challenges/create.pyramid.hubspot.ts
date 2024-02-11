function displayAsterisk (size = 1) {
    for (let asteriskCount = 0; asteriskCount < size; asteriskCount++) {
        const space = Array(size - asteriskCount).fill(' ').join('');
        const asterisk = Array(asteriskCount + 1).fill('*').join(' ');

        console.log(space, asterisk);
    }
}


// Here the input is 5.
// displayAsterisk(5);

/*
    Output:
            *
           * *
          * * *
         * * * *
        * * * * *
*/

export default displayAsterisk;
