# 代码重构
## 提炼函数
在 JavaScript 开发中，我们大部分时间都在与函数打交道，所以我们希望这些函数有着良好的命名，函数体内包含的逻辑清晰明了。如果一个函数过长，不得不加上若干注释才能让这个函数显得易读一些，那这些函数就很有必要进行重构。
如果在函数中有一段代码可以被独立出来，那我们最好把这些代码放进另外一个独立的函数中。这是一种很常见的优化工作，这样做的好处主要有以下几点。
- 避免出现超大函数。
- 独立出来的函数有助于代码复用。
- 独立出来的函数更容易被覆写。
- 独立出来的函数如果拥有一个良好的命名，它本身就起到了注释的作用。
比如在一个负责取得用户信息的函数里面，我们还需要打印跟用户信息有关的 log，那么打印 log 的语句就可以被封装在一个独立的函数里：
```js
var getUserInfo = function(){
ajax( 'http:// xxx.com/userInfo', function( data ){ console.log( 'userId: ' + data.userId ); console.log( 'userName: ' + data.userName ); console.log( 'nickName: ' + data.nickName );
});
};
改成：
var getUserInfo = function(){
ajax( 'http:// xxx.com/userInfo', function( data ){ printDetails( data );
});
};

var printDetails = function( data ){ console.log( 'userId: ' + data.userId ); console.log( 'userName: ' + data.userName ); console.log( 'nickName: ' + data.nickName );
};
```

## 合并重复的条件片段
如果一个函数体内有一些条件分支语句，而这些条件分支语句内部散布了一些重复的代码， 那么就有必要进行合并去重工作。假如我们有一个分页函数 paging，该函数接收一个参数currPage，currPage 表示即将跳转的页码。在跳转之前，为防止 currPage 传入过小或者过大的数字，我们要手动对它的值进行修正，详见如下伪代码：
```js
var paging = function( currPage ){ if ( currPage <= 0 ){
currPage = 0;
jump( currPage );	// 跳 转
}else if ( currPage >= totalPage ){ currPage = totalPage;
jump( currPage );	// 跳 转
}else{
jump( currPage );	// 跳 转
}
};
```
可以看到，负责跳转的代码 jump( currPage )在每个条件分支内都出现了，所以完全可以把这句代码独立出来：
```js
var paging = function( currPage ){ if ( currPage <= 0 ){
currPage = 0;
}else if ( currPage >= totalPage ){ currPage = totalPage;
}
jump( currPage );	// 把 jump 函数独立出来
};
```