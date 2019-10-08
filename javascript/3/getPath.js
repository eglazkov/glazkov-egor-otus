function getPath (elem){
  this.queryStr = '';
  this.getChildIndex = (parent, child) => { //индекс дочернего элемента
    return Array.prototype.indexOf.call(Array.prototype.filter.call(parent.children, (item) => {
      return item.tagName === child.tagName ? item : null; //фильтрация элементов одного тега
    }), child)
  };

  function upToParent (child){ //вверх по дереву

    let childIndex = this.getChildIndex(child.parentNode, child);
    this.queryStr = child.tagName +
      (childIndex > 0 ? (':nth-child(' + (childIndex*1 + 1) + ') > ') : (this.queryStr !== '' ? ' > ' : '')) +
      this.queryStr;

    if(child.tagName !== "HTML"){ //до родительского элемента <html>
      const parent = child.parentNode;
      return upToParent(parent);
    }

  }

  upToParent(elem); //формирование this.queryStr

  return this.queryStr.toLowerCase();
}


/*
  //Проверка функции через элемент $0

  document.querySelector(getPath($0)) === $0; //true
*/