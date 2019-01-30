let field = document.createElement('div'); // создем переменную field и туда записываем новый div
document.body.appendChild(field); // добавляем div (переменную field) в body
field.classList.add('field'); // переменной field присваем класс field

// создем 100 блоков и помещаем их в наше поле field
for (let i = 1; i <= 100; i++) {
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');	
}

// просвоим каждой ячейки (excel) ее координаты X и Y, сделаем это через присвоение атрибутов
// т.к. переменную excel использовали внутри цикла, то это имя мы можем еще раз использовать вне его
let excel = document.getElementsByClassName('excel');  // находим все 100 ячеек
let x = 1;
let y = 10;

for (let i = 0; i < excel.length; i++){
	if (x > 10) {
		x = 1;
		y--;
	}
	excel[i].setAttribute('posX', x);
	excel[i].setAttribute('posY', y);
	x++;
}

// появление змейки при старте игры в рандомном месте.
// функция выдает два рандомных значения от 1 до 10 по оси X и Y
function generateSnake() {
	let posX = Math.round(Math.random() * (10 - 3) + 3); // убираем из рандома значения 1 и 2 что бы змея не появлялась за границами игрового поля
	let posY = Math.round(Math.random() * (10 - 1) + 1);
	return [posX, posY]; // функция выдает массив с двумя значениями
}

let coordinates = generateSnake(); // результат функции записываем в переменную
// голова змеи состоит из масиива с элементами
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];

// всем элементам массива добавить класс snakeBody, а первому элементу head
for ( let i = 0; i < snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');


// создаем мышь, пость она занимает рандомное место на поле не занятое змеёй
let mouse;

function createMouse() {
	function generateMouse() {
		let posX = Math.round(Math.random() * (10 - 3) + 3); // убираем из рандома значения 1 и 2 что бы змея не появлялась за границами игрового поля
		let posY = Math.round(Math.random() * (10 - 1) + 1);
		return [posX, posY]; // функция выдает массив с двумя значениями
	}
	
	let mouseCoordinates = generateMouse();
	mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
	
	// проверка что бы мышь не появилась на змее, цикл повторяется если у класса mouse есть класс snakeBody
	while(mouse.classList.contains('snakeBode')) { 
		let mouseCoordinates = generateMouse();
		mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');		
	}
	
	mouse.classList.add('mouse');
}
createMouse();

let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display: block;
`

let score = 0;
input.value = `Ваши очки: ${score}`;

// движение змеи. Движение делаем так: берем последний елемент змеиного массива, убераем у него стиль snakeBody и отцепим от массива. во-вторых уберем у головы класс head что бы голова исчезла, далее на первое место массива (т.е. на место головы) ставим ячейку с координатами +1 по оси Х
function move() {
	let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	snakeBody[0].classList.remove('head');
	snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
	snakeBody.pop();
	
	if (direction == 'right') {
		if ( snakeCoordinates[0] < 10) {
			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+ 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
		} else {
			snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
		}		
	}
	
	if (direction == 'left') {
		if ( snakeCoordinates[0] > 1) {
			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
		} else {
			snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
		}		
	}
	
	if (direction == 'up') {
		if ( snakeCoordinates[1] < 10) {
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
		} else {
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
		}		
	}
	
	if (direction == 'down') {
		if ( snakeCoordinates[1] > 1) {
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1]-1) + '"]'));
		} else {
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
		}		
	}
	
	// условие если мы съедаем мышь, т.е. координаты головы змеи и мыши совпадают
	if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
		mouse.classList.remove('mouse');
		let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
		let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
		createMouse();
		score++;
		input.value = `Ваши очки: ${score}`;
	}
	
	// условия окончания игры если голова уперлось в тело
	if(snakeBody[0].classList.contains('snakeBody')) {
		setTimeout(()=> {
			alert(`Игра окончена! Ваши очки: ${score}`);
		}, 200);		
		clearInterval(interval);
		snakeBody[0].style.background = 'red';
	}
	
	snakeBody[0].classList.add('head');
	for ( let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}
	
	steps = true;
}

let interval = setInterval(move, 300);

// работаем с обработчиком событий, что бы при нажатии клавишь змейка двигалась в нужном направлении
window.addEventListener('keydown', function(e) {
	if (steps == true) {
		if (e.keyCode == 37 && direction != 'right') { // если движение в данный момент не в право, то движение вправо сработает
			direction = 'left';
			steps = false;
		} else	if (e.keyCode == 38 && direction != 'down') {
			direction = 'up';
			steps = false;
		} else if (e.keyCode == 39 && direction != 'left') {
			direction = 'right';
			steps = false;
		} else if (e.keyCode == 40 && direction != 'up') {
			direction = 'down';
			steps = false;
		}				
	}

});











