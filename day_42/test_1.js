
/**
 * 使用Object.create()创造实例 原型指向模板实例
 *
 * 实例.construction 获取构造方法
 *
 * Person.prototype.farewell = function() {
  alert(this.name.first + ' has left the building. Bye for now!');
}

 构造器的原型 ---Persion

 继承 使用call方法
 function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
}

 Teacher.prototype = Object.create(Person.prototype); ？？？
 Teacher.prototype.constructor = Teacher;

 原型链 向上查找 实例 原型


 extend(B,A);  // B继承于A
 var b = new B(11);
 B.prototype.add = function(){
    return this.x + "" + this.x;
}
 console.log(b.add()); // 1111

 B.prototype.add = function(){
    //return this.x + "" + this.x;
    return B.sup.add.call(this);
}
 **/