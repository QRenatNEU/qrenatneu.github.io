let str =
`
In scenario #1, the characters are:

- Ane
- Mike

In scenario #2, the characters are:

- Ane
- Mike
- Sam
`;
str = str.replaceAll('\n', '|')
console.log(str)
let matches = str.match(/(- |\d+\. )(.*?)(#|$)/g);
let matches2 = matches.map(part => {
    const list = part.match(/(- |\d+\. )([a-zA-Z\s]*[a-zA-Z])/g).map(
        str => {
            return str.slice(2).trim(); // Remove the first 2 characters and trim the string
        }
    )
    return list;
})
console.log(matches2);
