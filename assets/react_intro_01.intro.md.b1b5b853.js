import{_ as e,o as a,c as l,d as s}from"./app.a4a811e5.js";const C=JSON.parse('{"title":"React\u5165\u95E8\u5B66\u4E60","description":"","frontmatter":{},"headers":[{"level":2,"title":"React\u662F\u4EC0\u4E48","slug":"react\u662F\u4EC0\u4E48","link":"#react\u662F\u4EC0\u4E48","children":[]},{"level":2,"title":"\u7B2C\u4E00\u4E2AReact\u5E94\u7528","slug":"\u7B2C\u4E00\u4E2Areact\u5E94\u7528","link":"#\u7B2C\u4E00\u4E2Areact\u5E94\u7528","children":[]},{"level":2,"title":"\u73AF\u5883","slug":"\u73AF\u5883","link":"#\u73AF\u5883","children":[]},{"level":2,"title":"React\u7684\u57FA\u672C\u4EE3\u7801","slug":"react\u7684\u57FA\u672C\u4EE3\u7801","link":"#react\u7684\u57FA\u672C\u4EE3\u7801","children":[]},{"level":2,"title":"class\u7EC4\u4EF6\u548Cfunction\u7EC4\u4EF6","slug":"class\u7EC4\u4EF6\u548Cfunction\u7EC4\u4EF6","link":"#class\u7EC4\u4EF6\u548Cfunction\u7EC4\u4EF6","children":[]},{"level":2,"title":"JSX\u662F\u4EC0\u4E48","slug":"jsx\u662F\u4EC0\u4E48","link":"#jsx\u662F\u4EC0\u4E48","children":[]},{"level":2,"title":"\u5904\u7406\u7528\u6237\u4EA4\u4E92 && \u4E8B\u4EF6\u5904\u7406","slug":"\u5904\u7406\u7528\u6237\u4EA4\u4E92-\u4E8B\u4EF6\u5904\u7406","link":"#\u5904\u7406\u7528\u6237\u4EA4\u4E92-\u4E8B\u4EF6\u5904\u7406","children":[]},{"level":2,"title":"useEffect\u526F\u4F5C\u7528","slug":"useeffect\u526F\u4F5C\u7528","link":"#useeffect\u526F\u4F5C\u7528","children":[]},{"level":2,"title":"\u5176\u4ED6API","slug":"\u5176\u4ED6api","link":"#\u5176\u4ED6api","children":[]},{"level":2,"title":"\u4E0B\u4E00\u6B65","slug":"\u4E0B\u4E00\u6B65","link":"#\u4E0B\u4E00\u6B65","children":[]}],"relativePath":"react/intro/01.intro.md"}'),n={name:"react/intro/01.intro.md"},i=s(`<h1 id="react\u5165\u95E8\u5B66\u4E60" tabindex="-1">React\u5165\u95E8\u5B66\u4E60 <a class="header-anchor" href="#react\u5165\u95E8\u5B66\u4E60" aria-hidden="true">#</a></h1><p>\u82B1\u679C\u5C71suby</p><hr><h2 id="react\u662F\u4EC0\u4E48" tabindex="-1">React\u662F\u4EC0\u4E48 <a class="header-anchor" href="#react\u662F\u4EC0\u4E48" aria-hidden="true">#</a></h2><p><a href="https://reactjs.org/" target="_blank" rel="noreferrer">https://reactjs.org/</a></p><p><a href="https://beta.reactjs.org/" target="_blank" rel="noreferrer">https://beta.reactjs.org/</a></p><p>\u5168\u7403\u4F7F\u7528\u7387\u90FD\u5F88\u9AD8\u7684\u70ED\u95E8\u524D\u7AEF\u6846\u67B6\uFF0C\u8FDB\u9636\u5FC5\u5907</p><p>\u89C6\u56FE\u5C42\uFF0C\u9AD8\u6548\u7684\u6E32\u67D3\u7F51\u9875 &amp; \u66F4\u65B0\uFF0C\u826F\u597D\u7684\u5F00\u53D1\u4F53\u9A8C</p><p>\u7EC4\u4EF6\u5316 &amp; \u865A\u62DFDom &amp; \u8DE8\u7AEF &amp; ConCurrent ...</p><p><code>UI = f(state)</code></p><hr><p>\u963F\u91CC\uFF0C\u5B57\u8282\uFF0C\u817E\u8BAF\u7B49\u5927\u5382\u5FC5\u5907</p><ol><li>\u751F\u6001\u9F50\u5168</li><li>\u6210\u529F\u6848\u4F8B</li><li>\u8DE8\u7AEF\uFF08Native)</li></ol><p>\u6838\u5FC3\uFF1A\u7EC4\u4EF6\u5316 + \u5DE5\u5177\u51FD\u6570\uFF08Hooks)</p><hr><h2 id="\u7B2C\u4E00\u4E2Areact\u5E94\u7528" tabindex="-1">\u7B2C\u4E00\u4E2AReact\u5E94\u7528 <a class="header-anchor" href="#\u7B2C\u4E00\u4E2Areact\u5E94\u7528" aria-hidden="true">#</a></h2><h4 id="\u5B66\u524D\u77E5\u8BC6\uFF08\u81EA\u68C0\uFF09" tabindex="-1">\u5B66\u524D\u77E5\u8BC6\uFF08\u81EA\u68C0\uFF09 <a class="header-anchor" href="#\u5B66\u524D\u77E5\u8BC6\uFF08\u81EA\u68C0\uFF09" aria-hidden="true">#</a></h4><ol><li>Javascript <ol><li>\u6A21\u5757\u5316</li><li>\u7BAD\u5934\u51FD\u6570</li><li>\u89E3\u6784\u8D4B\u503C</li><li>\u5E38\u89C1\u6570\u7EC4\u548C\u5BF9\u8C61\u64CD\u4F5C ( map\uFF0C filter...)</li><li>async + await &amp;&amp; Promise</li><li>...</li></ol></li><li>HTML \u548C CSS</li><li>Nodejs + VSCode + Chrome\u5F00\u53D1</li></ol><hr><h2 id="\u73AF\u5883" tabindex="-1">\u73AF\u5883 <a class="header-anchor" href="#\u73AF\u5883" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u276F node -v</span></span>
<span class="line"><span style="color:#A6ACCD;">v16.17.1</span></span>
<span class="line"><span style="color:#A6ACCD;">\u276F npm -v</span></span>
<span class="line"><span style="color:#A6ACCD;">8.15.0</span></span>
<span class="line"><span style="color:#A6ACCD;">\u276F pnpm -v</span></span>
<span class="line"><span style="color:#A6ACCD;">7.13.4</span></span>
<span class="line"></span></code></pre></div><p>\u5B98\u65B9\u7684cra\uFF0C\u6211\u66F4\u559C\u6B22\u7528vite \uFF08\u5165\u95E8\u533A\u522B\u4E0D\u5927\uFF09</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">npm create vite@latest</span></span>
<span class="line"><span style="color:#676E95;"># or</span></span>
<span class="line"><span style="color:#A6ACCD;">pnpm create vite</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="react\u7684\u57FA\u672C\u4EE3\u7801" tabindex="-1">React\u7684\u57FA\u672C\u4EE3\u7801 <a class="header-anchor" href="#react\u7684\u57FA\u672C\u4EE3\u7801" aria-hidden="true">#</a></h2><ol><li>React\u7EC4\u4EF6</li><li>React\u6E32\u67D3\u7EC4\u4EF6</li><li>JSX</li></ol><hr><h2 id="class\u7EC4\u4EF6\u548Cfunction\u7EC4\u4EF6" tabindex="-1">class\u7EC4\u4EF6\u548Cfunction\u7EC4\u4EF6 <a class="header-anchor" href="#class\u7EC4\u4EF6\u548Cfunction\u7EC4\u4EF6" aria-hidden="true">#</a></h2><p>React\u7EC4\u4EF6\u7684\u4E24\u79CD\u5199\u6CD5</p><ol><li>\u7C7B\u5199\u6CD5</li><li>\u51FD\u6570\u5199\u6CD5\uFF08\u4E3B\u6D41\uFF0C\u91CD\u70B9\u5B66\u4E60\uFF09</li></ol><p>\u7EC4\u4EF6\u7684\u8FDB\u9636</p><ol><li>\u7EC4\u4EF6 &amp; \u6A21\u5757</li><li>\u7EC4\u4EF6\u5D4C\u5957</li><li>Props &amp; State</li><li>\u79EF\u6728\u5F0F\u5F00\u53D1</li></ol><hr><p><img src="https://vuejs.org/assets/components.7fbb3771.png" alt=""></p><hr><h2 id="jsx\u662F\u4EC0\u4E48" tabindex="-1">JSX\u662F\u4EC0\u4E48 <a class="header-anchor" href="#jsx\u662F\u4EC0\u4E48" aria-hidden="true">#</a></h2><p>\u957F\u5F97\u50CFHTML\uFF0C\u672C\u8D28\u662FJS</p><ol><li>\u57FA\u672C\u8BED\u6CD5</li><li>{}</li><li>css</li><li>\u5FAA\u73AF\u6E32\u67D3</li><li>\u6761\u4EF6\u6E32\u67D3</li></ol><hr><h2 id="\u5904\u7406\u7528\u6237\u4EA4\u4E92-\u4E8B\u4EF6\u5904\u7406" tabindex="-1">\u5904\u7406\u7528\u6237\u4EA4\u4E92 &amp;&amp; \u4E8B\u4EF6\u5904\u7406 <a class="header-anchor" href="#\u5904\u7406\u7528\u6237\u4EA4\u4E92-\u4E8B\u4EF6\u5904\u7406" aria-hidden="true">#</a></h2><ol><li>\u7528\u6237\u8F93\u5165</li><li>\u4E8B\u4EF6\u7ED1\u5B9A</li><li>Hooks\u5C1D\u9C9C</li><li>\u590D\u6742\u5BF9\u8C61\u548C\u6570\u7EC4\u7684\u66F4\u65B0</li></ol><hr><h2 id="useeffect\u526F\u4F5C\u7528" tabindex="-1">useEffect\u526F\u4F5C\u7528 <a class="header-anchor" href="#useeffect\u526F\u4F5C\u7528" aria-hidden="true">#</a></h2><p>\u526F\u4F5C\u7528\uFF1A<code>UI = f(state, effect)</code></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#82AAFF;">useEffect</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">\u526F\u4F5C\u7528\u53D8\u4E86\u4E4B\u540E</span><span style="color:#F07178;">\uFF0C</span><span style="color:#A6ACCD;">\u6267\u884C\u7684\u4EE3\u7801</span></span>
<span class="line"><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;">[deps])</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>\u672C\u5730\u5B58\u50A8\u5B9E\u73B0</p><hr><h2 id="\u5176\u4ED6api" tabindex="-1">\u5176\u4ED6API <a class="header-anchor" href="#\u5176\u4ED6api" aria-hidden="true">#</a></h2><p>\u503C\uFF1A<code>useState</code>,useContext,useReducer, useRef ...</p><p>\u526F\u4F5C\u7528\uFF1A<code>useEffect</code>,useLayoutEffect ...</p><p>\u6027\u80FD\u4F18\u5316 <code>useMemo</code>, <code>useCallback</code> ...</p><p>\u4F18\u5148\u7EA7\uFF1AuseTransition, useDeferredValue ....</p><hr><h2 id="\u4E0B\u4E00\u6B65" tabindex="-1">\u4E0B\u4E00\u6B65 <a class="header-anchor" href="#\u4E0B\u4E00\u6B65" aria-hidden="true">#</a></h2><p>React\u751F\u6001</p><ol><li>\u5DE5\u7A0B\u5316\u5DE5\u5177Vite &amp; Webpack</li><li>\u8DEF\u7531</li><li>\u6570\u636E\u6D41</li><li>CSS</li><li>\u7EC4\u4EF6\u5E93</li><li>\u7F51\u7EDC\u8BF7\u6C42</li><li>React\u8FDB\u9636API (\u4F18\u5316)</li><li>\u7EC4\u4EF6\u5316\u8FDB\u9636</li><li>\u5C01\u88C5\u81EA\u5DF1\u7684Hooks ...</li></ol>`,56),t=[i];function r(c,p,o,d,h,u){return a(),l("div",null,t)}const A=e(n,[["render",r]]);export{C as __pageData,A as default};