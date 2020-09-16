var spiralize = function (size) {
    //создаем матрицу с любым содержимым (например цифрой 8), главное не 0 и не 1
    const spiral = [];
    for (let i = 0; i < size; i++) {
        spiral.push([]);
        for (let j = 0; j < size; j++)
            spiral[i].push(8);
    }
  
    //функция, вычисляющая количество итераций в зависимости от размера спирали
    let countIterations = (spiral_size) => {
        if(spiral_size === 1) return 1;
        if(spiral_size === 2) return 3;
        if(spiral_size === 3) return 7;
        if(spiral_size === 4) return 11;
        return (spiral_size - 1) * 4 + (countIterations(spiral_size - 4))
    };
    let iterations = countIterations(size);
    let current = [0, 0]; //текущий указатель для 1
    let currentZero = [1, 0];//текущий указатель для 0
    let direction = 1; // направление - по горизонтали или по вертикали
    let increment = [1, 1]; //1й элемент: 1 = идем по горизонтали вправо, -1 = влево; 2й элемент: 1 = идем по вертикали вниз, -1 = вверх;
    let ended = false;
    let count = 0;

    while (count < iterations  ) {
      count++;
      //ставим 1 и 0
      spiral[current[0]][current[1]] = 1;
      spiral[currentZero[0]][currentZero[1]] = 0;
      //если след. элемент равен 0 или его не существует (уперлись в границу матрицы)
      if ((!spiral[current[0]][current[1] + increment[direction]] || spiral[current[0]][current[1] + increment[direction]] === 0) && direction === 1 ||
          (!spiral[current[0] + increment[direction]] || spiral[current[0] + increment[direction]][current[1]] === 0) && direction === 0
      ) {
		  //тогда меняем направление движения
          increment[direction] = -increment[direction];
          direction = (direction === 1) ? 0 : 1;
          current[direction] += increment[direction];
          currentZero[direction === 1 ? 0 : 1] += increment[direction === 1 ? 0 : 1];
      } else {
		  //переходим на следующий шаг
          current[direction] += increment[direction];
          currentZero[direction] += increment[direction];
      }
    }

    return spiral;
};