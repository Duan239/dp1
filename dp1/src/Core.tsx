type ListElement = number | string;
type LinkedList = null | { head: ListElement; tail: LinkedList };

// Селектор: взяти голову списку
const Select_Head = (list: LinkedList): ListElement | null => {
    return list === null ? null : list.head;
};

// Селектор: взяти хвіст списку
const Select_Tail = (list: LinkedList): LinkedList => {
    return list === null ? null : list.tail;
};

// Конструктор: побудувати список
const Cons = (head: ListElement, tail: LinkedList): LinkedList => {
    return { head, tail };
};

// Рекурсивна функція для підрахунку нечислових елементів
const countNonNumeric = (list: LinkedList): number => {
    if (list === null) {
        return 0;
    }

    const head = Select_Head(list);
    const tail = Select_Tail(list);
    const isNonNumeric = typeof head === 'string' ? 1 : 0;

    return isNonNumeric + countNonNumeric(tail);
};

// Рекурсивна функція для обчислення факторіалу
const factorial = (n: number): number => {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
};

// Основна функція обчислення факторіалу від кількості нечислових елементів
const computeFactorialOfNonNumeric = (list: LinkedList): number => {
    const count = countNonNumeric(list);
    return factorial(count);
};



// Рекурсивна функція для перетворення списку у масив
const listToArray = (list: LinkedList): ListElement[] => {
    if (list === null) {
        return [];
    }
    return [Select_Head(list)!, ...listToArray(Select_Tail(list))];
};

