// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

const {
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('./DS.js');

// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
    return function (a, b) {
        var b = exp
        return Math.pow(a, b);
    }
}

// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = { // direccion = ""
//     N: 'pared',
//     S: { // direccion = "S"
//         N: 'pared',
//         S: 'pared',
//         E: { // direccion = "SE"
//             N: 'destino', // direccion = "SEN"
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: { // direccion = "SO"
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

function direcciones(laberinto) {
if (!laberinto) return '';
for (let clave in laberinto) {
    if (laberinto[clave] === 'destino') return clave;

    if (typeof laberinto[clave] === 'object') {
        let enbuscadeldestino = direcciones (laberinto[clave])
        if (enbuscadeldestino.length > 0) {
            return clave + enbuscadeldestino;
        }
    }
 }
 return ''
 
 
 ;  //funcion un poco mas compleja pero igual funciona (?).

 /* if (!laberinto) return '';
    for (var [clave, valor] of Object.entries(laberinto)) {  //nuevo feature, array con su indice (?)
        
        if (valor === 'destino') return clave; 
    
        if (typeof valor === 'object') {
            let enbuscadeldestino = direcciones(valor);   
            if (enbuscadeldestino.length > 0) {
                return clave + enbuscadeldestino;
            }
        }
    }
    
     return '';
    
 */
}


// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
    arr1 = arr1.flat(Infinity)
    arr2 = arr2.flat(Infinity)   // APLANO LOS 2 ARRAY

    if (arr1.length >= arr2.length) {
        for (let i = 0; i < arr1.length; i++) {  // Elijo cual array es mas largo y comparo con el otro.
            if (arr2.includes(arr1[i])) {
                continue;
            } else {
                return false;
            }

        }
        return true;
    } else {
        for (let i = 0; i < arr2.length; i++) {
            if (arr1.includes(arr2[i])) {
                continue;
            } else {
                return false;
            }

        }
        return true;
    }

};




// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
    this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function () {
    let print = 'head'
    let pointer = this.head
    while (pointer) {
        print += ' --> ' + pointer.value
        pointer = pointer.next;
    }
    print += ' --> null'
    return print
}


// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'

OrderedLinkedList.prototype.add = function (val) {
var node = new Node(val);
var current = this.head;  // esta variable es para agregar el nodo al final;

if (!this.head) {
    this.head = node;
    return node;
 }

while(current.next) {
 current = current.next;
}
current.next = node; 




var check = true;
var sentinel = this.head
while (check) {                  // BUBBLESORT PARA LINKEDLIST --> TARDE 2 DIAS EN HACERLO.
    check = false;
    while (sentinel.next && sentinel.next.next) {     //  [ 5,    1,    4]
        let first = sentinel.next;                   //    S -->
        let second = sentinel.next.next;
        if (first.value < second.value) { 
            sentinel.next = second; 
            first.next = second.next;
            second.next = first;
            check = true;
        }
        sentinel = sentinel.next
    }
}


}



// EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function () {
if(!this.head) {
    return null;
}
var value = this.head.value;
this.head = this.head.next;
return value;
}


// EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function () {
if (!this.head) return null ;

if (!this.head.next) {
    var save = this.head.value;  //GPM
    this.head = null;
    return save;
}

var current = this.head;

while (current.next.next) {   // [ 5, null, null, null]
    current = current.next    //   C      --> no existe current.next.next (=== null)
}

var save = current.next.value;  // GPM
current.next = null;
return save;


}



// ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2) {
 var arr = cbs1.concat(cbs2);
 var result = []

arr.sort((a, b) => {
    return a.time - b.time;
});                         

arr.forEach(function (fun)  {

    for (let clave in fun) {
        if (typeof fun[clave] === 'function') {
            result.push(fun[clave]());
        }
    }
})

return result;s

}




// ----- BST -----

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function() {
    let arr=[];
    
    let callback = function(value){
        arr.push(value);
    ;}
    
    this.breadthFirstForEach(callback);
    
    arr.sort(function compareNumbers (a, b){    
        return a - b;
    })

    return arr;
}



// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(n) {
if (n == 2 || n == 3)
       return true;
   if (n <= 1 || n % 2 == 0 || n % 3 == 0)
       return false;  
 for (let i = 5; i * i <= n ; i+=6)
     if (n % i == 0 || n % (i + 2) == 0)
       return false;
   return true;
}




// EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(arr) {   // quicksort lo vemos en la clase Algoritmos II.
    const list = arr
if (list.length < 2) {
    return list
}  else {
   
const pivote = list[0]
const menores = list.filter(function(value) { value < pivote})
const mayores = list.filter(function(value) { value > pivote})

 arr.push(quickSort(menores));
 arr.push(pivote);
 arr.push(quickSort(mayores));
}
return arr;
}





 
// QuickSort ya lo conocen solo que este 
// ordena de mayor a menor
// para esto hay que unir como right+mid+left o cambiar el 
// signo menor en la comparacion con el pivot




// ----- EXTRA CREDIT -----

// EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(num) {
    var rev = 0
    while (Math.floor(num) > 0) {
        rev = Math.floor(rev) * 10 + Math.floor(num) % 10;
        num = Math.floor(num) / 10;
    }
    return rev;
}

// la grandiosa resolucion de Wilson!!!
// declaran una variable donde 
// almacenar el numero invertido
// y van multiplicando por 10 la 
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la 
// porcion no revertida
// y luego le quitan a la porcion 
// no revertida el ultimo numero

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
}