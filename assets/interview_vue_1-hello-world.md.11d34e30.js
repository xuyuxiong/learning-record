import{_ as l,r as o,o as p,c as e,h as t,a as s,e as a,d as r}from"./app.ef61e8c5.js";const h=JSON.parse('{"title":"\u70ED\u8EAB","description":"","frontmatter":{"aside":true},"headers":[],"relativePath":"interview/vue/1-hello-world.md"}'),c={name:"interview/vue/1-hello-world.md"},D=s("h1",{id:"\u70ED\u8EAB",tabindex:"-1"},[a("\u70ED\u8EAB "),s("a",{class:"header-anchor",href:"#\u70ED\u8EAB","aria-hidden":"true"},"#")],-1),i=s("p",null,[a("\u5927\u6982\u5C31\u662F\u8BA9\u4F60\u719F\u6089\u4E00\u4E0BVue.js\u7684\u6E32\u67D3\uFF0C\u628A\u9875\u9762\u6E32\u67D3\u7684"),s("code",null,"Hello World"),a("\u6539\u6210"),s("code",null,"msg"),a("\u5C31\u53EF\u4EE5\u4E86\uFF0C\u8FD9\u91CC")],-1),y=r(`<p>\u9898\u76EE\u8981\u6C42\u548C\u4EE3\u7801</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> msg </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">msg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">&lt;!-- \u9875\u9762\u7684\u671F\u671B\u8F93\u51FA\u662FHello World --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">msg</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u89E3\u7B54</p><p><a href="https://stackblitz.com/edit/angular-nyboi3?file=App.vue" target="_blank" rel="noreferrer">\u89E3\u7B54\u5730\u5740</a></p><div class="language-diff"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre><code><span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref } from &quot;vue&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> const msg = ref(&quot;Hello World&quot;)</span></span>
<span class="line"><span style="color:#89DDFF;">+</span><span style="color:#C3E88D;"> const msg = ref(&quot;msg&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u89C6\u9891</p>`,6),F=s("iframe",{src:"//player.bilibili.com/player.html?aid=298064688&bvid=BV1UF411u7yk&cid=571658910&page=1",scrolling:"no",border:"0",frameborder:"no",framespacing:"0",allowfullscreen:"true"}," ",-1);function d(C,A,u,_,m,g){const n=o("BFrame");return p(),e("div",null,[D,i,t(n,{src:"https://stackblitz.com/edit/angular-rpaktv?embed=1&file=App.vue"}),y,F])}const v=l(c,[["render",d]]);export{h as __pageData,v as default};