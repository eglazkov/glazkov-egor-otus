function sum(){
  this.collector = 0;

  var innerFunc = function(){
    if(arguments.length > 0){
      this.collector = this.collector + arguments[0];
      return innerFunc
    }else{
      return this.collector;
    }
  }

  return innerFunc.apply(null, arguments);
}
