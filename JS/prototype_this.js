//https://velog.io/@kyujonglee/Javascript-class-%EC%84%A4%ED%83%95%EB%AC%B8%EB%B2%95
// Built-in 객체를 프로토타입으로 어떻게 상속할 것인가?
function Parent() {
    console.log(new.target);
  }
  function Child() {
    // 왜 this 가 Parent가 되었나? this.constructor가 Parent의 생성자인 것은 이해가 가지만..
    // 아마도 this란 해당 객체의 prototype을 가리키는듯
    console.log("this", this);
    console.log("this.const", this.constructor);
    this.constructor.call(this);
    console.log("this again", this);
    // Object.create로 prototype을 연결했기 때문에 빈 객체를 만들었음.
    // 따라서 프로토타입 체인을 통해 this.constructor는 Parent
    console.log(new.target === Child);
  }
  console.log("Parent proto", Parent.prototype.constructor);
  console.log("Object", Object.create(Parent.prototype));
  Child.prototype = Object.create(Parent.prototype);
  new Child();
  console.log("Child const", Child.prototype);
  
  // 객체의 prototype은 constructor와 __proto__ chain을 가진다