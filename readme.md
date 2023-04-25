## Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## Документація по API/tasks

Схема:

```
    title: {
      type: String,
      required: (true, 'Set title of task.'),
    },
    start: {
      type: String,
      required: (true, 'Set start time of task.'),
    },
    end: String,
    priority: {
      type: String,
      enum: EMUN_PRIORITY,
      default: EMUN_PRIORITY[0],
    },
    createDay: Number,
    createMonth: Number,
    createYear: Number,
    owner: {
      type: Types.ObjectId,
      ref: 'user',
    }
```

### Ендпоінти для роботи з завданнями:

#### 1. ендпоінт для отримання колекції завданнь на місяць POST /tasks

    Дані з Frontend:

    body: {
        title: стрінга від 2х до 256 символів, обов`язкове
        start: стрінга бажано в форматі часу HH:mm, обов`язкове
        end: стрінга бажано в форматі часу HH:mm, НЕ обов`язкове
        priority: одне з трьох стрінгових значень ['Low', 'Medium', 'High'], за замовченням 'Low',
    не обов`язкове
        date: дата (НЕ стрінга), на це є перевірка, якщо не передано, тоді присвоюється поточна дата
    new Day(), не обов`язкове
    }

    Повертає весь обєкт.
    УВАГА: ключ ID - _id !!!

#### 2. ендпоінт для створення завдання GET /tasks

    Дані з Frontend:

    body: {
        createMonth: ціле число Number, УВАГА: місяці починаються з 0 - Січень = 0 !!!
        createYear: ціле число Number, YYYY
    }

    Повертає усі завдання за зазначений місяць. За 1 день запиту немає.
    УВАГА: ключ ID - _id !!!

#### 3. ендпоінт для редагування завдання PATCH /tasks/{id}

    Дані з Frontend:

    Хоча б одне з полів!

    body: {
        title: стрінга від 2х до 256 символів
        start: стрінга бажано в форматі часу HH:mm
        end: стрінга бажано в форматі часу HH:mm
        priority: одне з трьох стрінгових значень ['Low', 'Medium', 'High'], за замовченням 'Low',
    }

    Повертає обєкт зі змінами.

    УВАГА: ключ ID - _id !!!

#### 4. ендпоінт для видалення завдання DELETE /tasks/{id}"

        Повертає статус 200 та повідомлення, что завдання видаллено.
