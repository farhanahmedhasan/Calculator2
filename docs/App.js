//Selecting The DOM Elements 
const output_Operation_Element = document.querySelector('.operation .value')
const output_Result_Element = document.querySelector('.result .value')
const input_Element = document.querySelector('.input')

let calculator_Buttons = [
  {
		name: 'delete',
		symbol: '⌫',
		formula:false,
		type : 'key'
	},
	{
		name: 'clear',
		symbol: 'C',
		formula: false,
		type:'key'
	},
	{
		name: 'percent',
		symbol: '%',
		formula: '/100',
		type : 'number'
	},
	{
		name: 'division',
		symbol: '÷',
		formula: '/',
		type : 'operator'
	},
	//2nd Row
	{
		name: '7',
		symbol: 7,
		formula: 7,
		type : 'number'
	},
	{
		name: '8',
		symbol: 8,
		formula: 8,
		type : 'number'
	},
	{
		name: '9',
		symbol: 9,
		formula: 9,
		type : 'number'
	},
	{
		name: 'multiplication',
		symbol: '×',
		formula: '*',
		type : 'operator'
	},
	//3rd Row
	{
		name: '4',
		symbol: 4,
		formula: 4,
		type : 'number'
	},
	{
		name: '5',
		symbol: 5,
		formula: 5,
		type : 'number'
	},
	{
		name: '6',
		symbol: 6,
		formula: 6,
		type : 'number'
	},
	{
		name: 'addition',
		symbol: '+',
		formula: '+',
		type : 'operator'
	},
	//4th Row
	{
		name: '1',
		symbol: 1,
		formula: 1,
		type : 'number'
	},
	{
		name: '2',
		symbol: 2,
		formula: 2,
		type : 'number'
	},
	{
		name: '3',
		symbol: 3,
		formula: 3,
		type : 'number'
	},
	{
		name: 'subtraction',
		symbol: '-',
		formula: '-',
		type : 'operator'
	},
	//5th row
	{
    name : "0",
    symbol : 0,
    formula : 0,
    type : "number"
	},
	{
    name : "comma",
    symbol : ".",
    formula : ".",
    type : "number"
	},
	{
    name : "calculate",
    symbol : "=",
    formula : "=",
    type : "calculate"
    }
]

//Showing The Button
function createCalculatorButtons() {
	const buttons_Per_Row = 4;
	let added_btns = 0;
	
	calculator_Buttons.forEach((button) => {
		if (added_btns % buttons_Per_Row == 0) {
			input_Element.innerHTML += `<div class='row'></div>`
		}

		const row = document.querySelector('.row:last-child')
		row.innerHTML += `<button id = "${button.name}">${button.symbol}</button>`

		added_btns++
	})
}
createCalculatorButtons()

//Adding Click Event for my input Element
input_Element.addEventListener('click', (event)=>{
	const target_btn = event.target

	calculator_Buttons.forEach((button) => {
		if (button.name == target_btn.id) {
			calculator(button)
		}
	})
})

//Calculator data
let data = {
	operation: [],
	result: []
}

//Calculator
function calculator(button) {
	//If user Click Operator Type Buttons
	if (button.type == 'operator') {
		data.operation.push(button.symbol)
		data.result.push(button.formula)
	}

	//If User Click Number type Buttons
	else if (button.type == 'number') {
		data.operation.push(button.symbol)
		data.result.push(button.formula)
	}
		
		//If user Click Key Types Button
	else if (button.type == 'key') {
		if (button.name == 'delete') {
			data.operation.pop()
			data.result.pop() //Pop method will delete the last item from array
		}
		else if (button.name == 'clear') {
			data.operation = []
			data.result = []
			updateOutputResult(0)
		}
	}
		
		//If User Click Calculate Type Buttons
	else if (button.type == 'calculate') {
		let join_Result = data.result.join('')
		let result = eval(join_Result)

		result = formatResult(result)
		updateOutputResult(result)

		data.operation = []
		data.result = []

		data.operation.push(result)
		data.result.push(result)

		return;
	}

	updateOutputOperation(data.operation.join(''))
}

function updateOutputOperation(operation) {
	output_Operation_Element.innerHTML = operation
}

function updateOutputResult(result) {
	output_Result_Element.innerHTML = result
}

//Formatting The Result
function formatResult(result){
	const max_output_number_length = 10
	const output_precision = 5

	if( digitCounter(result) > max_output_number_length) {
		if (isFloat(result)) {
			//if a number is float
      const result_int = parseInt(result);
      const result_int_length = digitCounter(result_int);

			if( result_int_length > max_output_number_length ) {
				return result.toPrecision(output_precision)
			}
			else {
				const num_digits_after_point = max_output_number_length - result_int_length;
        return result.toFixed(num_digits_after_point)
			}
		}
		//If a number is Integer
		else {
			return result.toPrecision(output_precision)
		}
	}
	else {
		return result
	}
}

//digit Counter
function digitCounter(number){
    return number.toString().length;
}

//Checking if a number is float
function isFloat(number){
    return number % 1 != 0;
}