# JAVASCRIPT

&emsp; &emsp; javascript 中的解构赋值理解：这种动态类型的语言，不需要在编译阶段指定类型。极大的提高了声明变量和赋值变量的灵活性。而解构是把这种特性发挥到了极致，数组就是只需要按顺序取，就能得到值。对象可以用变量名为属性名来取值，也可以用用属性名来赋给变量如 let { foo: baz } = { foo: 'aaa', bar: 'bbb' };函数返回多个值的时候很有用，如 return {foo:1,bra:2};他妈的发现js中{}单独括起来就是表示一个对象，而[]就是表示一个数组。
...可以把数组中的每个元素取出来（spread），或者把几个元素组成一个数组(rest)。
JavaScript 语言的对象继承是通过原型链实现的。
除了undefined,null,false,0,NaN,“”‘’为false,其余都为true。
