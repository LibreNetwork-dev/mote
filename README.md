# Building 
1. Run npx rspack build
2. Output is dist/mote.bundle.js

# Usage 
Mote is a simple library that can do three things. Components, "jsx" (in quotes because it does not act like real jsx), and signals.      

This is an example of a counter that encompasses most mote features     
```html
<html>    
	<head>      
		<script src="mote.bundle.js"></script>
	</head>     

	<body>    
        <script>     
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
                        on:click=${() => count.value++}   
                        class=${countBtn}>    
						increase the number     
						</button>    
					</div>    
				`;    
			}    

			document.body.appendChild(Counter());   
		</script>
	</body>
</html>

```