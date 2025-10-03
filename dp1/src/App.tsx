import React, { useState } from 'react';
import { Calculator, List, Plus, Trash2, ArrowRight, Eye } from 'lucide-react';

type ListElement = number | string;
type LinkedList = null | { head: ListElement; tail: LinkedList };

const Select_Head = (list: LinkedList): ListElement | null => {
  return list === null ? null : list.head;
};

const Select_Tail = (list: LinkedList): LinkedList => {
  return list === null ? null : list.tail;
};

const Cons = (head: ListElement, tail: LinkedList): LinkedList => {
  return { head, tail };
};

const countNonNumeric = (list: LinkedList): number => {
  if (list === null) {
    return 0;
  }

  const head = Select_Head(list);
  const tail = Select_Tail(list);
  const isNonNumeric = typeof head === 'string' ? 1 : 0;

  return isNonNumeric + countNonNumeric(tail);
};

const factorial = (n: number): number => {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

const computeFactorialOfNonNumeric = (list: LinkedList): number => {
  const count = countNonNumeric(list);
  return factorial(count);
};

const listToArray = (list: LinkedList): ListElement[] => {
  if (list === null) {
    return [];
  }
  return [Select_Head(list)!, ...listToArray(Select_Tail(list))];
};

const appendToList = (list: LinkedList, element: ListElement): LinkedList => {
  if (list === null) {
    return Cons(element, null);
  }
  return Cons(Select_Head(list)!, appendToList(Select_Tail(list), element));
};


const visualizeList = (list: LinkedList): string => {
  if (list === null) {
    return '';
  }

  const elements: string[] = [];
  let current = list;

  while (current !== null) {
    const head = Select_Head(current);
    const headStr = typeof head === 'string' ? `"${head}"` : String(head);
    elements.push(headStr);
    current = Select_Tail(current);
  }

  return `(${elements.join(' ')})`;
};

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<LinkedList>(null);
  const [result, setResult] = useState<number | null>(null);
  const [showVisualization, setShowVisualization] = useState(true);
  const [selectedHead, setSelectedHead] = useState<ListElement | null>(null);
  const [selectedTail, setSelectedTail] = useState<LinkedList>(null);

  const addElement = () => {
    if (inputValue.trim() === '') return;

    const element: ListElement = isNaN(Number(inputValue))
      ? inputValue.trim()
      : Number(inputValue);

    setList(appendToList(list, element));
    setInputValue('');
    setResult(null);
    setSelectedHead(null);
    setSelectedTail(null);
  };

  const calculate = () => {
    if (list === null) {
      alert('Список порожній!');
      return;
    }
    const factorialResult = computeFactorialOfNonNumeric(list);
    setResult(factorialResult);
  };

  const clearList = () => {
    setList(null);
    setResult(null);
    setSelectedHead(null);
    setSelectedTail(null);
  };

  const getHead = () => {
    if (list === null) {
      alert('Список порожній!');
      return;
    }
    setSelectedHead(Select_Head(list));
    setSelectedTail(null);
  };

  const getTail = () => {
    if (list === null) {
      alert('Список порожній!');
      return;
    }
    setSelectedTail(Select_Tail(list));
    setSelectedHead(null);
  };

  const listArray = listToArray(list);
  const nonNumericCount = countNonNumeric(list);
  const listVisualization = visualizeList(list);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <List className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Робота зі списками
            </h1>
          </div>

          <p className="text-gray-600 mb-6">
            Варіант 12: Обчислення факторіалу від кількості нечислових елементів списку
          </p>

          {/* Введення елементів */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Додати елемент до списку
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addElement()}
                placeholder="Введіть число або текст"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <button
                onClick={addElement}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Додати
              </button>
            </div>
          </div>

          {/* Візуалізація списку */}
          {list !== null && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  Візуалізація списку
                </h2>
                <button
                  onClick={() => setShowVisualization(!showVisualization)}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  {showVisualization ? 'Приховати' : 'Показати'}
                </button>
              </div>

              {showVisualization && (
                <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                  <div className="whitespace-pre-wrap break-all">
                    {listVisualization}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Операції з головою та хвостом */}
          {list !== null && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Селектори
              </h2>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={getHead}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Select_Head
                </button>
                <button
                  onClick={getTail}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Select_Tail
                </button>
              </div>

              {selectedHead !== null && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-1">Голова списку:</p>
                  <p className="text-lg font-bold text-gray-800">
                    {typeof selectedHead === 'string' ? `"${selectedHead}"` : selectedHead}
                    <span className="text-sm ml-2 text-gray-500">
                      ({typeof selectedHead === 'number' ? 'число' : 'текст'})
                    </span>
                  </p>
                </div>
              )}

              {selectedTail !== null && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-2">Хвіст списку:</p>
                  <div className="bg-gray-900 text-green-400 rounded p-3 font-mono text-sm overflow-x-auto">
                    {visualizeList(selectedTail)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Відображення списку */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Елементи списку
            </h2>
            {listArray.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                Список порожній. Додайте елементи.
              </div>
            ) : (
              <div className="space-y-2">
                {listArray.map((element, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-gray-500">
                        [{index}]
                      </span>
                      <span className="font-medium text-gray-800">
                        {element}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${typeof element === 'number'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                          }`}
                      >
                        {typeof element === 'number' ? 'Число' : 'Текст'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Інформація та обчислення */}
          {listArray.length > 0 && (
            <div className="bg-indigo-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Всього елементів</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {listArray.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Нечислових елементів</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {nonNumericCount}
                  </p>
                </div>
              </div>

              {result !== null && (
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Результат</p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {nonNumericCount}! = {result}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={calculate}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Calculator className="w-5 h-5" />
                  Обчислити факторіал
                </button>
                <button
                  onClick={clearList}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Очистити
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;