## 网络安全

### SQL 注入攻击(SQL Injection)

### 命令行注入 Command Execution

原理和 SQL 注入攻击类似

### File Upload Vulnerabilities

### 开放重定向 Open Redirects

### XSS 跨站脚本攻击 (Cross-site Scripting)

XSS 的攻击方式就是想办法“教唆”用户的浏览器去执行一些这个网页中原本不存在的前端代码。
XSS 有哪些注入的方法：

- 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
- 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 在标签的 href、src 等属性中，包含 javascript: 等可执行代码。
- 在 onload、onerror、onclick 等事件中，注入不受控制代码。
- 在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码（新版本浏览器已经可以防范）。
- 在 style 属性和标签中，包含类似 expression(...) 的 CSS 表达式代码（新版本浏览器已经可以防范）。

总之，如果开发者没有将用户输入的文本进行合适的过滤，就贸然插入到 HTML 中，这很容易造成注入漏洞。
攻击者可以利用漏洞，构造出恶意的代码指令，进而利用恶意代码危害数据安全。

`<img src="notValidUrl" onerror=alert(document.cookie)>`
`javascript:alert('XSS')`

根据攻击的来源，XSS 攻击可分为存储型、反射型和 DOM 型三种。

使用 Content Security Policy csp

### 跨站请求伪造 CSRF（Cross-site request forgery)

攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data#%E5%B8%B8%E8%A7%81%E7%9A%84%E5%AE%89%E5%85%A8%E9%97%AE%E9%A2%98

### 点击劫持 Click Jacking

也叫 UI 覆盖攻击，攻击者会利用一个或多个透明或不透明的层来诱骗用户支持点击按钮的操作，而实际的点击确实用户看不到的一个按钮，从而达到在用户不知情的情况下实施攻击。

可以设置`X-Frame-Options`进行防御或者设置`content-security-policy`

### broken-access-control 越权风险

比如用户 A id 是 11111，它有些请求就根据 id 去拿数据，如果这时候 A 知道 B 的 id 是 22222，他就可以通过合格 id 拿到 B 的数据。
https://cloud.tencent.com/developer/article/1367399

### 一些建议

使用 https，任何东西不要使用明文传输。

在登录或者忘记密码的地方，不要提示是邮箱不正确还是密码不正确。这样会大大减少黑客的破解难度。
如 twitter，登录时只提示邮箱和密码不匹配，并不会告诉你到底是哪一个不对。

尽量不要自建登录系统，可以多依托于一些第三方的登录，如微博、QQ 等。

使用 a 标签跳槽的时候加上 `rel="noopener noreferrer"`

详细介绍：https://www.hacksplaining.com/lessons

- [前端安全系列（一）：如何防止 XSS 攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)
- [前端安全系列（二）：如何防止 CSRF 攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)
