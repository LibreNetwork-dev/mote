# About 
mote is a minimalist library, meant for speed and size. It is 1.3kb minified and gzipped, and it is 2.3kb minified       
its features are css and html templating engines, a signal system, and on:* events 

# Building 
1. Run npx rspack build
2. Output is dist/mote.bundle.js

# Usage 
Mote is a simple library that can do three things. Components, "jsx" (in quotes because it does not act like real jsx), and signals.      

This is an example that encompasses most of mote's features   
```js
// init is a prop
function Counter(init=0) {    
    const count = signal(init);   
                
    let countBtn = css`   
        background-color: rgb(41, 41, 41);   
        color: white;   
        &:hover {    
            background-color: white;     
            color: rgb(41, 41, 41);    
        }    
    `    
    return html`    
        <div>    
            <h1>Count: ${count}</h1>     
            <button       
                on:click=${() => {
                    count.value++
                    localStorage.setItem("c", count.value)
                }}   
                class=${countBtn}>    
                increase the number     
            </button>    
        </div>    
    `;    
}    
// think of the params passed into Counter() as props
document.body.appendChild(Counter(
    localStorage.getItem("c") || 0
    ));
```