/*
    Module for simulation of typing effect in the Command Prompt.
*/

const typingConsole = (text, callback) => {
    let i = 0;
    let clear = true;
    const typeWriter = () => {
        if (clear) {
            console.clear();
            process.stdout.write('\n   ');
            clear = !clear;
        }
        if (i < text.length) {
            const symbol = text.charAt(i);
            i++;
            if (symbol === '\/') {
                setTimeout(typeWriter, 3000);
                clear = true;
            }
            else {
                process.stdout.write(symbol);
                setTimeout(typeWriter, 100);
            }
        }
        else {
            const time = new Date().getTime() / 1000;
            callback(time);
        }
    };
    typeWriter();
};

export default typingConsole;
