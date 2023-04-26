# TypeScript
[](https://juejin.cn/post/6844903796997357582)
[](https://mariusschulz.com/blog/conditional-types-in-typescript)
[](https://mariusschulz.com/)
## React中使用TypeScript
[](https://blog.csdn.net/xgangzai/article/details/121186999)
## 什么是TypeScript
TS是一个强类型的JavaScript超集，支持面向对象编程的概念，如类、接口、继承、泛型。
## 为什么要使用TS，TS的优势是什么
增加了静态类型，可以在编译脚本的时候检测错误，使得代码质量更好，更健壮。优势：
1. 解决大型项目的代码复杂性
2. 可以在编译期间发现并纠正错误
3. 支持强类型、接口、模块、类型
## ts中const和readonly的区别
const可以防止变量的值被修改
readonly可以防止变量的属性被修改
## 枚举和常量枚举的区别
常量枚举只能使用常量枚举表达式并且不同于常规的枚举，他们在编译阶段会被删除。常量枚举成员在使用的地方会被内联起来，之所以这么做是因为常量枚举不允许包含计算成员
## interface和type的区别
相同点：都可以描述对象或者函数；都允许拓展
不同点：
1. 类型别名可以为任何类型引入名称
2. 类型别名不支持继承
3. 类型别名不会创建一个类型的名字
4. 类型别名无法被实现implements 而接口可以被派生类实现
5. 类型别名重名会抛出错误，接口重名是会产生合并
## TS中any的作用
为编程界吨还不清楚的变量一个类型，这些值可能来自于动态的内容，比如来自用户输入或第三方代码库这种情况下，我们不希望类型检查器对这些值进行检查而是直接让他们通过编译阶段的检查
## any、never、unkown、null、undefined、void
any：动态的变量类型
never：永不存在的值的类型
unkown：任何类型的值都可以赋值给unknown类型，但是unknown只能赋值给unknown本身和any类型
null和undefined：默认情况是所有类型的子类型。
void：没有任何类型
## interface可以给Funciton/Array/Class做声明吗
```ts
interface Say {
  (name: string): void;
}
let say: Say = (name: string): void => {}

interface NumberArray {
  [index: number]: number
}
let fibonacci: NumberArray = [1, 2, 3, 4]

interface Person {
  name: string;
  sayHi(name: string): string;
}
```
## TS中的this和js中的this有什么区别
noImplicitThis: true的情况下，必须去声明this的类型，才能在函数或者对象中使用this
ts中箭头函数的this和es6中箭头中的this是一致的
## 获取枚举类型的key
```ts
enum Str {
  A, B, C
}
type strUnion = keyof typeof str;
```
## TS中?. ?? ! !. _ ** 符号的意义
?.可选链遇到null和undefiend可以立即停止表达式的运行
?? 空值合并运算符 当左侧操作数为null或undefined时，其返回右侧的操作数，否则返回左侧的操作数
!非空断言运算符 从值域中排出null和undefined
!.在变量名后添加 可以断言排除undefined和null
_数字分隔符 分隔符不会改变数字字面量的值，使人更容易读懂数字
** 求幂
## declare, declare global是什么
declare用来定义全局变量、全局函数、全局命名空间
declare global为全局对象window增加新属性
## keyof和typeof关键字的作用
keyof索引类型查询操作符 获取索引类型的属性名，构成联合类型
typeof获取一个变量的类型
## Exclude Omit Merge Intersection Overwrite的作用
Exclude<T, U>从T中排出可以分配给U的元素
Omit<T, K>忽略T中的某些属性
Merge<o1, o2>将两个对象的属性合并
Compute<A & B>将交叉类型合并
Intersection<T, U>取T的属性，此属性同样存在于U
Overwrite<T, U>用U的属性覆盖T的相同属性
## 类型兼容的理解？聊聊TypeScript类型兼容，协变、逆变、双向协变以及不变性
https://www.jianshu.com/p/1e786ce4786c
协变 (Covariant)：协变表示Comp<T>类型兼容和T的一致。
逆变 (Contravariant)：逆变表示Comp<T>类型兼容和T相反。
双向协变 (Covariant)：双向协变表示Comp<T>类型双向兼容。
不变 (Bivariant)：不变表示Comp<T>双向都不兼容。
## 实现类型
```ts
// Record<K, V>
const key = 'a' | 'b' | 'c'
const a = Record<Key, string> = {
  a: 'a',
  b: 'b',
  c: 'c'
}
type Record<K extends number | string | symbol, V> {
  [Key in K]: V
}

// Exclude<T, K>
type Foo = 'a' | 'b' | 'c'
type A = Exclude<Foo, 'a'> // 'b' | 'c'

type Exclude<T, K> = T extends K ? never : T;

// Extract<T, U>
type Key = 'a' | 'b' | 'c'
type A = Extract<Key, 'a'> // 'a'

type Extract<T, U> = T extends U ? T : never

// Omit<T, K>
type Keys = {
  a: string;
  b: number;
  c: boolean;
}
type A = Omit<Keys, 'a' | 'b'> // {c: boolean}

type Omit<T, K extends number | string | symbol> = {
  [Key in Exclude<keyof T, K]: T[Key]
}

// NonNullable<T>
type Foo = 'a' | 'b' | null | undefined
type A = NonNullable<Foo> // 'a' | 'b'
type NonNullable<T> = T extends null | undefined ? never : T

// Partial<T> 将属性变为可选属性

// Required<T> 将属性全部变为必须属性
```
## TypeScript中const和readonly的区别？枚举和常量枚举的区别？接口和类型别名的区别

## TypeScript中interface可以给Function/Array/Class做声明吗
可以，interface 能够描述 JavaScript 对象的任何形式，包括函数。
interface 也可以被 class 类 implements，这里相当于声明了一个 interface 包含了各种属性，需要 class 去实现，注意给类本身声明类型，其实就是给构造器进行类型声明，不能添加其他属性。
## 可以使用String、Number、Boolean、Symbol、Object等给类型做声明吗

## 使用Unions时有哪些注意事项
联合类型表示取值可以为多种类型中的一种，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法（交集）
## 如何设计Class声明
TypeScript 类型声明非常灵活，这也意味着一千个莎士比亚就能写出一千个哈姆雷特。在团队协作中，为了更好的可维护性， 我们应该尽可能地践行以下3条原则：
泛型优于联合类型
第一，类型定义使 getSmallPet变得局限。从代码逻辑看，它的作用是返回一个不下蛋的动物，返回的类型指向的是Fish或Bird。但我如果只想在一群鸟中挑出一个不下蛋的鸟呢？通过调用这个方法，我只能得到一个 可能是Fish、或者是Bird的神奇生物。

第二，代码重复、难以扩展。比如，我想再增加一个乌龟，我必须找到所有类似 Fish | Bird 的地方，然后把它修改为 Fish | Bird | Turtle

第三，类型签名无法提供逻辑相关性。我们再审视一下类型签名，完全无法看出这里为什么是 Fish | Bird 而不是其他动物，它们两个到底和逻辑有什么关系才能够被放在这里

善用typeof推导优于自定义类型
善用内置工具函数优于重复声明
## 如何联合枚举类型的key
用 mapped type，用完之后不能加额外的属性，用类型并运算解决。
## 预定义的条件类型有哪些
Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
ReturnType<T> -- 获取函数返回值类型。
InstanceType<T> -- 获取构造函数类型的实例类型
## 简单介绍一下模块加载机制
Typescrit的模块机制与es6的模块基本类似，也提供了转换为amd，es6，umd，commonjs，system的转换。typescript的按需加载，也叫动态加载，编译器会检测是否每个模块都会在生成的JavaScript中用到。 如果一个模块标识符只在类型注解部分使用，并且完全没有在表达式中使用时，就不会生成require这个模块的代码。 省略掉没有用到的引用对性能提升是很有益的，并同时提供了选择性加载模块的能力。这种模式的核心是import id = require("...")语句可以让我们访问模块导出的类型。 模块加载器会被动态调用（通过require）。
模块加载的最佳实践

1、尽可能地在顶层导出
用户应该更容易地使用你模块导出的内容。 嵌套层次过多会变得难以处理，因此仔细考虑一下如何组织你的代码。
2、模块里避免使用命名空间
模块中使用命名空间是不必要的，在模块中导出的东西肯定不能重名，而导入时使用者肯定会为其命名或者直接使用，也不存在重名，使用命名空间是多余的。
3、如果仅导出单个 class 或 function，使用 export default。如刚才所说，default是比较好的实践。
4、如果要导出多个对象，把它们放在顶层里导出
5、导入时明确地列出导入的名字
6、导入大量模块时使用命名空间
7、使用重新导出进行扩展 你可能经常需要去扩展一个模块的功能。 JS里常用的一个模式是JQuery那样去扩展原对象。 如我们之前提到的，模块不会像全局命名空间对象那样去合并。 推荐的方案是不要去改变原来的对象，而是导出一个新的实体来提供新的功能。
## 对象展开会有什么副作用吗
展开操作符正与解构相反。 它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。对象的展开比数组的展开要复杂的多。 像数组展开一样，它是从左至右进行处理，但结果仍为对象。 这就意味着出现在展开对象后面的属性会覆盖前面的属性。对象展开还有其它一些意想不到的限制。 首先，它仅包含对象 自身的可枚举属性。 大体上是说当你展开一个对象实例时，你会丢失其方法
## interface、type、enum声明有作用域的功能吗
有，叫类作用域，类变量 也可以称为 字段。类变量 声明在一个类里头，但在类的方法外面，可以通过类的实例化对象来访问。静态变量 静态的类变量，静态的变量可以通过类名直接访问
## 同名的interface和class可以合并吗
同名interface接口会自动合并，interface同名的class也会自动聚合。 但type不能自动聚合，因为type声明不能重名。
## 如何使TypeScript项目引入并识别编译为JavaScript的npm包

## tsconfig.json中有哪些配置信息

## 如何设置模块导入的路径别名

## 如何生成库包的声明文件
声明文件有两种用法：
被通过import导入，使用其中暴露的类型定义和变量声明。
和相关模块关联，为模块进行类型声明。
## 使用TypeScript语法将没有层级的扁平数据转换成树形结构的数据

## 实现ReturnType

## 实现DeepReadOnly

## 基于已有类型生成新类型：剔除类型中的width属性