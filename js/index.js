// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const filterButtonClear = document.querySelector('.filterclear__btn');
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');

minWeight.value = 0;
maxWeight.value = 0;

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "🍇 Виноград", "color": "фиолетовый", "weight": 13},
  {"kind": "🍏 Яблоко", "color": "зеленый", "weight": 35},
  {"kind": "🍓 Клубника", "color": "красный", "weight": 17},
  {"kind": "🍋 Лимон", "color": "желтый", "weight": 28},
  {"kind": "🍑 Персик", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = null;

 // TODO: формируем новый элемент <li> при помощи document.createElement,
 // и добавляем в конец списка fruitsList при помощи document.appendChild

  for (let i = 0; i < fruits.length; i++) {  
    let divIndex = document.createElement('div');
    divIndex.className = 'fruit_info';
    divIndex.textContent = 'index # ' + i;

    let divKind = document.createElement('div');
    divKind.className = 'fruit_info';
    divKind.textContent = 'kind: ' + fruits[i].kind;

    let divColor = document.createElement('div');
    divColor.className = 'fruit_info';
    divColor.textContent = 'color: ' + fruits[i].color;

    let divWeight = document.createElement('div');
    divWeight.className = 'fruit_info';
    divWeight.textContent = 'weight (кг): ' + fruits[i].weight;

    let divMain = document.createElement('div');
    divMain.className = 'fruit_info';
    divMain.appendChild(divIndex);
    divMain.appendChild(divKind);
    divMain.appendChild(divColor);
    divMain.appendChild(divWeight);

    let li_block = document.createElement('li');
    switch(fruits[i].color) {
      case 'фиолетовый': li_block.className = 'fruit_item fruit_violet'; 
      break
      case 'зеленый': li_block.className = 'fruit_item fruit_green';
      break
      case 'красный': li_block.className = 'fruit_item fruit_red';
      break
      case 'желтый': li_block.className = 'fruit_item fruit_yellow';
      break
      case 'светло-коричневый': li_block.className = 'fruit_item fruit_lightbrown';
      break
    }
    li_block.innerHTML = divMain.innerHTML;
    fruitsList.appendChild(li_block);
  }
};

// первая отрисовка карточек
archiveArr = fruits.slice();
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  controlArr = fruits.slice();

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    numRandom = Math.floor(Math.random()*fruits.length);
    result.push(fruits[numRandom]);
    fruits.splice(numRandom, 1);
  }

  fruits = result;

  if (JSON.stringify(fruits)===JSON.stringify(controlArr)) {
    alert ('Порядок элементов списка не изменился, перемешайте еще раз.')
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let result=[];
  
    // TODO: допишите функцию
    if (parseInt(minWeight.value)==0 && parseInt(maxWeight.value)==0) {
      alert ('Вы не ввели параметры для фильтрации.');
      return fruits;
    }
    if (parseInt(minWeight.value)<0 || parseInt(maxWeight.value)<0) {
      alert ('Вес фруктов не может быть отрицательным, проверьте параметры фильтрации.');
      return fruits;
    }
    if (parseInt(minWeight.value) > parseInt(maxWeight.value)) {
      alert ('Проверьте параметры фильтрации.');
      return fruits;
    }

    for (let i=0; i < fruits.length; i++) {
      if ((fruits[i].weight >= parseInt(minWeight.value)) && (fruits[i].weight <= parseInt(maxWeight.value))) {
        result.push(fruits[i]);
      }
    }
    fruits = result;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

const filterFruitsClear = () => {
  fruits = [];
  fruits = archiveArr.slice();
  minWeight.value = 0;
  maxWeight.value = 0;
}

filterButtonClear.addEventListener('click', () => {
  filterFruitsClear();
  display();
  sortTimeLabel.textContent = '-';
})

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

let priority = ['красный', 'желтый', 'зеленый', 'фиолетовый', 'светло-коричневый'];
let start, end;
// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

const comparationColor = (fruits1, k) => {
  return (fruits1.color === priority[k]) ? true:false;
};

function ColorToNum(arr) {
  for (c = 0; c < arr.length; c++) {
    switch(arr[c].color) {
      case 'красный': arr[c].color = 0; break
      case 'желтый': arr[c].color = 1; break
      case 'зеленый': arr[c].color = 2; break
      case 'фиолетовый': arr[c].color = 3; break
      case 'светло-коричневый': arr[c].color = 4; break
    }
  }
};

function NumToColor(arr) {
  for (c = 0; c < arr.length; c++) {
    switch(arr[c].color) {
      case 0 : arr[c].color = 'красный'; break
      case 1 : arr[c].color = 'желтый'; break
      case 2 : arr[c].color = 'зеленый'; break
      case 3 : arr[c].color = 'фиолетовый'; break 
      case 4 : arr[c].color = 'светло-коричневый'; break   
    }
  }
};

function swap(items, firstIndex, secondIndex){
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
};

function partition(items, left, right) {
  let pivot = items[Math.floor((right + left) / 2)].color,
      i = left,
      j = right;
  while (i <= j) {
      while (items[i].color < pivot) {
          i++;
      }
      while (items[j].color > pivot) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
};

function bubbleSort(arr, comparationColor) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    for (let k = 0; k < priority.length; k++) {
      for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-1-i; j++) {
          if (comparationColor (arr[j], k)) {
            let temp = arr[j+1];
            arr[j+1] = arr[j];
            arr[j] = temp;
          }
        }
      }
    }
};

function quickSort(items, left, right) {
// TODO: допишите функцию быстрой сортировки
  let index;
  if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
      if (left < index - 1) {
          quickSort(items, left, index - 1);
      }
      if (index < right) {
          quickSort(items, index, right);
      }
  }
};


// выполняет сортировку и производит замер времени
/*function startSort(sort, arr, comparationColor) {
      const start = new Date().getTime();
      sort(arr, comparationColor);
      const end = new Date().getTime();
      sortTime = `${end - start} ms`;
    },*/


sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = (sortKind === 'bubbleSort') ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});


function sort(typeSort) {
  switch (typeSort) {
    case 'bubbleSort' : 
      bubbleSort(fruits, comparationColor);
    break;
    case 'quickSort' :
      ColorToNum(fruits);
      quickSort(fruits, 0, (fruits.length - 1));
      NumToColor(fruits);
    break;
  }
};

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  // TODO: вывести в sortTimeLabel значение sortTime
  start = new Date().getTime(); 
  sort(sortKind);  
  end = new Date().getTime();
  sortTime = `${end - start} ms`;
  sortTimeLabel.textContent = sortTime;
  display(); 
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '' || parseInt(weightInput.value)<0) {
    alert ('Проверьте параметры нового фрукта. Все поля должны быть заполнены');
  }
  else  {
    fruits.push ({kind:kindInput.value, color:colorInput.value, weight:parseInt(weightInput.value)});
  }
  kindInput.value = null;
  colorInput.value = null;
  weightInput.value = null;
  archiveArr = fruits.slice();
  display();
});
