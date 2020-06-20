# Ts

### Partial<T>

```ts
interface Todo {
  title: string
  description: string
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate }
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter'
}

const todo2 = updateTodo(todo1, {
  description: 'throw out trash'
})
```

### DeepReadonly

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

const a = { foo: { bar: 22 } }
const b = a as DeepReadonly<typeof a>
b.foo.bar = 33 // Hey, stop!
```

### Record

```ts
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' }
}
```

可以结合`Partial`

```ts
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

const x: Partial<Record<Page, PageInfo>> = {
  about: { title: 'about' },
  contact: { title: 'contact' }
}
```

### Pick

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

### Omit

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Omit<Todo, 'description'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

`type Omit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>`

更严格的 Omit，相关 issue https://github.com/microsoft/TypeScript/issues/30825

### Required

```ts
interface Props {
  a?: number
  b?: string
}

const obj: Props = { a: 5 } // OK

const obj2: Required<Props> = { a: 5 } // Error: property 'b' missing
```

### is

```ts
function isString(test: any): test is string {
  return typeof test === 'string'
}

function example(foo: any) {
  if (isString(foo)) {
    console.log(`it is a string${foo}`)
    console.log(foo.length) // string function
    console.log(foo.toExponential(2))
  }
}
example('hello world')
```

### interface vs type

interface 与 type 的区别是什么？可以参考以下 stackoverflow 的问题

https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types

### 使用 const enum 维护常量表

相比使用字面量对象维护常量，const enum 可以提供更安全的类型检查

```ts
// 使用 object 维护常量
const TODO_STATUS {
  TODO: 'TODO',
  DONE: 'DONE',
  DOING: 'DOING'
}
```

```ts
// 使用 const enum 维护常量
const enum TODO_STATUS {
  TODO = 'TODO',
  DONE = 'DONE',
  DOING = 'DOING'
}

function todos(status: TODO_STATUS): Todo[]

todos(TODO_STATUS.TODO)
```
