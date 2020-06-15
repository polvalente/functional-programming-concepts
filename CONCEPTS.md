# Conceitos Básicos

## Funções como _first-class citizens_

Podemos tratar funções como valores comuns, e criar _higher-order functions_,
funções que recebem outras funções como argumentos.

Exemplo:

```typescript
const operator = (fun, arg1, arg2) => fun(arg1, arg2);

const sum = (x, y) => x + y;
const multiply = (x, y) => x * y;

operator(sum, 1, 2); // 3
operator(multiply, 1, 2); // 2
```

## Funções puras

Temos funções no sentido estrito, que não apresentam efeitos colaterais.

```typescript
let i = 0;
// Exemplo de função não-pura:
const sum = (a, b) => {
  i = i + 1;
  return a + b;
};

sum(1, 2); // 3, i = 1
sum(1, 2); // 3, i = 2
```

## Imutabilidade

Não podemos mudar valores. Em termos de TypeScript, é como se todas as variáveis fossem consts e todos os atributos fossem read-only.

A seguir, vamos analisar dois exemplos de código para encontrar todos os números pares de um array.

Vamos tomar como dados:

```typescript
const l = [1, 2, 3, 4, 5, 6];
const isEven = (x) => x % 2 === 0;
```

```typescript
// Código em versão OOP

const getEven = (l) => {
  let result = []; // Precisamos usar `let` para poder modificar `result` dentro da função!
  // Isso não é indicado pois modifica estado, ainda por cima estado fora do escopo do bloco de loop.
  for (x of l) {
    if (isEven(x)) {
      result.push(x);
    }
  }
  return result;
};
```

```typescript
// Código em versão funcional 1.
// Precisamos usar `function` para poder ter recursão.
// Não é indicado em TS porque necessita que a implementação tenha Tail-Call Optimization para não haver estouro de pilha.
function getEven(l, result=[]){
    if(!l) {
        return result;
    }

    const head = l[0];
    const tail = l.slice(1);

    if(isEven(x)){
        return getEven(tail, result + [x]);
    }

    return getEven(tail, result).
}
```

```typescript
// Nestas implementações, não precisamos de recursão pois usamos métodos funcionais. Ambos são equivalentes.

// Código em versão funcional 2a
const getEven = (l) => l.filter(isEven);

// Código em versão funcional 2b
const reducer = (acc, x) => {
        isEven(x) {
            // Essa forma é mais usual e mais eficiente em memória,
            // mas não é puramente funcional pois modifica a referência
            acc.push(x);
            // A forma "correta" seria `acc + [x]`, mas isso duplica o uso de memória na pilha
        }
        return acc;
    }

const getEven = (l) => l.reduce(reducer, [])
```

### Comparação de uso de memória (porque devemos evitar "acc + [x]")

```bash
node --expose-gc
```

```javascript
process.memoryUsage()
{
  rss: 33746944,
  heapTotal: 4923392, // heapTotal na ordem de 4.9MB
  heapUsed: 2557576,
  external: 1326005
}

var a = new Array(1e7) // alocando 10M integers

process.memoryUsage()
{
  rss: 113741824,
  heapTotal: 84926464, // heaptotal na ordem de 84.9MB, que é relacionado a 8B * 10M itens
  heapUsed: 82715824,
  external: 1326073
}
var b = new Array(1e7); // alocando outro array
process.memoryUsage()
{
  rss: 195211264,
  heapTotal: 168075264, // 168.0M, dobramos o uso de memória ao criar "b"
  heapUsed: 162571560,
  external: 1326005
}

var c = a.concat(b) // Criando array que é "a" + "c"
// Se fosse prog funcional, poderia haver otimização em que a memória usada em "a" e "b" é compartilhada "sem medo".
// Não cresceria o uso de memória

process.memoryUsage()
{
  rss: 355221504,
  heapTotal: 328077312, // 328M, dobramos o uso porque c == a + b, e não pode haver compartilhamento de memória
  heapUsed: 322686960,
  external: 1326032
}


// limpando "a" da memória
a = null
gc()
process.memoryUsage()
{
  rss: 275443712,
  heapTotal: 244928512, // reduz a quantidade de memória utilizada, o que significa que era a única referência para aquela memória
  heapUsed: 242591080,
  external: 1326008
}

// limpando "b" da memória
b = null
gc()
process.memoryUsage()
{
  rss: 195584000,
  heapTotal: 164925440, // reduz a quantidade de memória apenas pelo tamanho de b, pelos mesmos motivos de a.
  heapUsed: 162629344,
  external: 1326005
}

c = null
gc()
process.memoryUsage()
{
  rss: 35581952,
  heapTotal: 8069120, // Ainda há lixo, mas quando rodamos o garbage-collector novamente, voltamos ao uso base de memória
  heapUsed: 2610096,
  external: 1326011
}

gc()
process.memoryUsage()
{
  rss: 35659776,
  heapTotal: 4923392,
  heapUsed: 2603048,
  external: 1326005
}
```

## Funções de Ordem Maior

Em vez de pensarmos em detalhes de código, pensamos nele como uma sequência de transformações de dados.
Com isso, temos duas funções de ordem maior básicas, das quais as outras funções podem decorrer:

### Map

Recebe uma lista, retorna uma lista com o mesmo número de elementos, transformada por uma função recebida.
Implementações otimizadas podem ser executadas em paralelo (ou até em outros computadores).

```typescript
// Implementação equivalente:
const map = (collection, fn) => {
  const result = collection;
  for (const [x, i] of collection.entries()) {
    result[i] = fn(x);
  }

  return result;
};
```

### Reduce

Recebe uma lista, retorna um valor qualquer (até mesmo uma lista), calculado através de uma função que depende do item e do resultado anterior.

```typescript
//  Implementação equivalente:
const reduce = (collection, fn, accumulator_in=undefined) => {
    let accumulator = accumulator_in || collection[0]
    for (const x of collection) {
        accumulator = fn(accumulator, x)
    }
    return accumulator.
};
```

### Outras funções que podem ser implementadas com Map ou Reduce

- Filter: recebe uma collection e função de predicado (que retorna boolean), e retorna apenas os elementos que obedece ao predicado
- Find: recebe uma collection e função de predicado e retorna o primeiro elemento que obedece ao predicado

## Conclusão

Podemos aplicar os conceitos de programação funcional até mesmo em linguagens estritamente orientadas a objetos.
Com isso, conseguimos código que muitas vezes é mais legível, mas que sempre é mais estável, por conta das propriedades de imutabilidade do código.
Entretanto, não é possível resolver todos os problemas com programação puramente funcional.
