## npx

npm 从 5.2 版开始，增加了 npx 命令。它有不少用处，但很多人其实又不知道它是个什么，该如何正确的使用它。

Node 自带 npm 模块。所以你只要安装了 node，你就可以直接使用它了，不需要什么额外的操作。

### 方便调用

npx 第一个好处就是方便的调用了项目内部安装的模块。比如我项目内安装了测试工具 Mocha。

```shell
npm install -D mocha
```

般来说，调用 Mocha ，只能在项目脚本和 package.json 的 scripts 字段里面， 如果想在命令行下调用，必须像下面这样。

```shell
# 项目的根目录下执行
node-modules/.bin/mocha
```

npx 就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了。

```bash
npx mocha
```

它的原理也很简单。就死运行的时候会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在。

### 避免全局安装

第二个好处就是可以避免全局安装模块。比如，你要用 react 的脚手架`create-react-app`它是需要全局安装的，但你其实也只有在初始化的时候需要用到它，大部分时间它是使用不到的。
但用了 npx 之后，就不需要全局安装它了。你可以使用 npx 直接运行它。

```shell
npx create-react-app my-react-app
```

上面代码运行时，npx 将`create-react-app`下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载 `create-react-app`。

### 指定版本

npx 还有一个好处，就是你可以指定你要运行模块的版本。比如你本地环境是 node10 的，但你想用 node11 的环境执行一段脚本。(当然你也可以 nvm 本地管理多个 node 版本)

```shell
npx -p node@11.9.0 node -v
```
