import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

				const [inputValue, setInputValue ] = React.useState('');
				const [inputValue2, setInputValue2 ] = React.useState('');

				let sweeterArray = [];
				let lista = [];
				
				const validateInput = () => {
						if(inputValue === "") alert("The input cannot be empty");
						else alert("All perfect!");
						};
				
				const validateInput2 = () => {
					if(inputValue2 === "") {
						alert("The input cannot be empty"+inputValue2);
					}
					else {
						alert("All perfect!"+inputValue2);
						lista.push(inputValue2);							
					
						
						// for(let i = 0; i<lista.length; i++){
						// 		console.log(lista[i]);							
						// 	}					

					}
				};
				
				return <div>
							<button onClick={validateInput2}>Click to validate empty</button>
							<div className="input-group mb-3">	
								<form onSubmit={validateInput2}>				
									<input  type="text" onChange={e => setInputValue2(e.target.value)} value={inputValue2} className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>					
									{lista}
								</form>
							</div>
				</div>;
			}


export default Home;
