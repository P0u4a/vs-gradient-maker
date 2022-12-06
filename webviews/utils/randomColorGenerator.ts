export function randomColorGenerator() : string {
    /*
    The largest hexidecimal value is #FFFFFF (white) which has a decimal representation of 16777215.
    A random number can be generated using the decimal representation, and then converted back to
    the hexidecimal representation to generate a random color. The randomly generated hex string may
    be shorter than 6 characters, whenever this occurs, a '0' is added to the start of the string until
    its length becomes 6.
    */
    const randomColor = "#"+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

    return randomColor;
    
}