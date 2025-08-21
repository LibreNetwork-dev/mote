<h1 align="center">Mote</h1>

Mote is a minimalistic UI library, inspired by JSX. It has **no** virtual dom, and **no** build step. It is 2.6kb minified, which is smaller than preact. It is also super simple, with reactivity being done with signals.

# Building 
1. Run npx rspack build
2. Output is dist/mote.bundle.js

# Usage 
Mote is a simple library that can do three things. Components, "jsx" (in quotes because it does not act like real jsx), and signals.      

This is an example that encompasses most of mote's features   
```js
function Counter() {    
    const count = signal(0);   
                
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
document.body.appendChild(Counter());
```
    
If you have any questions, join the libre network discord for support.   