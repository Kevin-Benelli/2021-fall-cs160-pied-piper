(this["webpackJsonpstocked-client"]=this["webpackJsonpstocked-client"]||[]).push([[0],{342:function(e,t,n){},350:function(e,t,n){},370:function(e,t,n){},397:function(e,t,n){},398:function(e,t,n){},401:function(e,t,n){},402:function(e,t,n){},403:function(e,t,n){},411:function(e,t,n){},412:function(e,t,n){},599:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),s=n(28),o=n.n(s),r=(n(342),n(343),n(344),n(345),n(346),n(347),n(348),n(349),n(15)),i=(n(350),n(73)),l=n.n(i),j=n(48),h=n(21),u=n(607),d=n(89),b=n.p+"static/media/logo.7f424a7c.png",m=n(75),f=n.n(m),O=n(117),g=n(57),x=n(287),p=n(169),v=n(180);n(370);var w=n(1),S=function(e){var t=e.setLoggedInUsername,n=Object(c.useState)(""),a=Object(r.a)(n,2),s=a[0],o=a[1],i=Object(c.useState)(!1),j=Object(r.a)(i,2),h=j[0],d=j[1],b=Object(c.useState)(""),m=Object(r.a)(b,2),S=m[0],N=m[1],k=Object(c.useState)(null),C=Object(r.a)(k,2),y=C[0],D=C[1];function M(e,t){return T.apply(this,arguments)}function T(){return(T=Object(O.a)(f.a.mark((function e(n,c){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault();try{l.a.post("http://localhost:5001/post_".concat(c),{username:s,password:S}).then((function(e){e.data.error?D(e.data.message):(D(null),t(s))}))}catch(a){console.log("Yo something went wrong: %s",a)}case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P=Object(w.jsx)(x.a,{content:"".concat(h?"Hide":"Show"," Password"),placement:"right",children:Object(w.jsx)(u.a,{icon:h?"unlock":"lock",intent:g.a.WARNING,minimal:!0,onClick:function(){d(!h)}})}),I=Object(w.jsx)("div",{className:"login center",children:Object(w.jsxs)("form",{children:[Object(w.jsx)(u.f,{className:"username",placeholder:"Username",onChange:function(e){return o(e.target.value)},value:s}),Object(w.jsx)(u.f,{className:"password",placeholder:"Password",onChange:function(e){return N(e.target.value)},value:S,rightElement:P,type:h?"text":"password"}),Object(w.jsx)(u.a,{className:"login-submit",onClick:function(e){M(e,"login")},children:" Login "}),Object(w.jsx)(u.a,{className:"create-account-submit",onClick:function(e){M(e,"create_account")},children:" Create Account "}),Object(w.jsx)("div",{style:{color:v.Colors.RED1,marginTop:"5px"},children:y})]})});return Object(w.jsx)(p.a,{placement:"bottom",content:I,children:Object(w.jsx)(u.a,{intent:g.a.PRIMARY,icon:"log-in",text:"Login",tabIndex:0})})},N=(n(397),n(398),function(e){var t=e.loggedInUsername,n=e.setLoggedInUsername;var c=Object(w.jsx)("div",{className:"userdropdown center",children:Object(w.jsxs)(j.a,{basename:"/",children:[Object(w.jsxs)(j.b,{to:"/",children:[Object(w.jsx)(u.a,{children:"Home"}),Object(w.jsx)("br",{})]}),Object(w.jsxs)(j.b,{to:"/settings",children:[Object(w.jsx)(u.a,{children:"Settings"}),Object(w.jsx)("br",{})]}),Object(w.jsxs)(j.b,{to:"/chat",children:[Object(w.jsx)(u.a,{children:"Chat"}),Object(w.jsx)("br",{})]}),Object(w.jsx)(u.a,{className:"mystery",onClick:function(e){return window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"},children:" FREE BITCOIN CLICK HERE!! "}),Object(w.jsx)("br",{}),Object(w.jsx)(u.a,{className:"logout",onClick:function(e){n(null)},children:" Logout "}),Object(w.jsx)("br",{}),"To be continued"]})});return Object(w.jsx)(p.a,{placement:"bottom",content:c,children:Object(w.jsx)(u.a,{intent:g.a.PRIMARY,icon:"user",text:t,tabIndex:0})})}),k=(n(401),function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1];function s(e){var t="/2021-fall-cs160-pied-piper/#/ticker/".concat(n);console.log(t),window.open(t,"_self")}var o=Object(w.jsx)(u.a,{icon:"search",minimal:!0,onClick:s});return Object(w.jsx)("div",{className:"search-bar",children:Object(w.jsx)("form",{onSubmit:s,children:Object(w.jsx)(u.f,{className:"search-input",placeholder:"Search",leftElement:o,onChange:function(e){return a(e.target.value)}})})})}),C=function(e){var t=e.loggedInUsername,n=e.setLoggedInUsername;return Object(w.jsx)("div",{className:"center",children:Object(w.jsx)("div",{className:"header",children:Object(w.jsxs)(u.j,{className:"header-navbar",children:[Object(w.jsx)(u.k,{align:d.a.LEFT,children:Object(w.jsx)(j.b,{to:"/",children:Object(w.jsx)("img",{src:b,className:"header-logo",alt:"logo"})})}),Object(w.jsxs)(u.k,{align:d.a.RIGHT,children:[Object(w.jsx)(k,{}),t&&Object(w.jsx)(N,{loggedInUsername:t,setLoggedInUsername:n}),!t&&Object(w.jsx)(S,{setLoggedInUsername:n})]})]})})})},y=(n(402),n(284)),D=n(285),M=n(265),T=n(266),P=n(267),I=n(286),L=n(283),E=(n(403),n.p+"static/media/loading.60616635.gif"),R=n(608),F=n(288),U=["updateMousePos","draw"];var A=new Intl.DateTimeFormat("en",{timeStyle:"short",hour12:!1,dateStyle:"short"});var H=function(e){var t,n,a,s,o=Object(c.useState)(null),i=Object(r.a)(o,2),j=i[0],h=i[1],d=Object(c.useState)(null),b=Object(r.a)(d,2),m=b[0],f=b[1],O=Object(c.useState)(!1),g=Object(r.a)(O,2),x=g[0],v=g[1],S=Object(c.useState)("30"),N=Object(r.a)(S,2),k=N[0],C=N[1],y=e.ticker.toUpperCase(),D=new Date,M=(t=D,n=-1,a=0,s=0,new Date(t.getFullYear()+s,t.getMonth()+a,Math.min(t.getDate()+n,new Date(t.getFullYear()+s,t.getMonth()+a+1,0).getDate()))),T=Object(c.useState)(Math.floor(M.getTime()/1e3)),P=Object(r.a)(T,2),I=P[0],L=P[1],E=Object(c.useState)(Math.floor(D.getTime()/1e3)),U=Object(r.a)(E,2),H=U[0],Y=U[1];Object(c.useEffect)((function(){l.a.get("http://localhost:5001/chart_data",{params:{resolution:k,symbol:y,from:I,to:H}}).then((function(e){h(e.data.chartData),f(e.data.error),v(!0)}))}),[k,y,I,H]);var B={showArrowButtons:!0,useAmPm:!1};return Object(w.jsxs)("div",{className:"chartArea center",children:[Object(w.jsx)("div",{className:"chart",children:Object(w.jsx)(_,{chartData:j,error:m,loaded:x,width:"800px",height:"500px",symbol:y,resolution:k,from:I,to:H})}),x&&null===m&&Object(w.jsxs)("div",{className:"chartSettings",children:[Object(w.jsxs)(u.g,{children:["From:",Object(w.jsx)(p.a,{placement:"top",content:Object(w.jsx)(R.a,{className:"chart-from-datepicker",onChange:function(e){L(Math.floor(e.getTime()/1e3))},timePickerProps:B,timePrecision:F.b.SECOND}),children:Object(w.jsx)(u.a,{text:A.format(1e3*I)})})]}),Object(w.jsxs)(u.g,{children:["To:",Object(w.jsx)(p.a,{placement:"top",content:Object(w.jsx)(R.a,{className:"chart-from-datepicker",onChange:function(e){Y(Math.floor(e.getTime()/1e3))},timePickerProps:B,timePrecision:F.b.SECOND}),children:Object(w.jsx)(u.a,{text:A.format(1e3*H)})})]}),Object(w.jsxs)(u.g,{children:["Resolution: ",Object(w.jsxs)("div",{className:"bp3-html-select chart-resolution",children:[Object(w.jsxs)("select",{className:"chart-resolution-select",onChange:function(e){return C(e.target.value)},children:[Object(w.jsx)("option",{value:"1",children:"1"}),Object(w.jsx)("option",{value:"5",children:"5"}),Object(w.jsx)("option",{value:"15",children:"15"}),Object(w.jsx)("option",{value:"30",selected:!0,children:"30"}),Object(w.jsx)("option",{value:"60",children:"60"}),Object(w.jsx)("option",{value:"D",children:"D"}),Object(w.jsx)("option",{value:"W",children:"W"}),Object(w.jsx)("option",{value:"M",children:"M"})]}),Object(w.jsx)("span",{className:"bp3-icon bp3-icon-double-caret-vertical"})]})]})]})]})},_=function(e){Object(I.a)(n,e);var t=Object(L.a)(n);function n(e){var c;return Object(T.a)(this,n),(c=t.call(this,e)).draw=function(e,t){var n="#ffffff",a=n,s=e.canvas.width,o=e.canvas.height,r=s-60,i=o-40;e.clearRect(0,0,s,o),e.fillStyle="#222222",e.fillRect(0,0,s,o);var l=s-60;e.fillStyle="#2b2b43",e.fillRect(l,0,2,o),e.fillStyle="#ffffff";e.font="15px Georgia";var j,h,u=c.getDisplayedPrices(),d=0;e.textAlign="center";for(var b=0;b<u.length;b++){var m=u[b],f=l+30,O=i/u.length*b+15+5;0===b?j=O:b===u.length-1&&(h=O),Math.abs(O-d)>=25&&(e.fillText(m.toFixed(2),f,O),d=O)}for(var g=c.props.chartData.candles,x=g.c.length,p=(r-40)/x,v=Math.max(p/20,1),w=0,S=[],N=0;N<x;N++){var k=g.o[N],C=g.c[N],y=g.h[N],D=g.l[N],T=g.t[N],P=(g.v[N],c.getHeightOfPrice(k,j,h)),I=c.getHeightOfPrice(C,j,h),L=c.getHeightOfPrice(y,j,h),E=c.getHeightOfPrice(D,j,h),R=void 0;R=k<C?"#26a69a":k>C?"#ee5350":"#808080",e.fillStyle=R;var F=N*p+5,U=p-5,H=F+U/2-v/2;e.fillRect(F,Math.min(P,I),U,Math.abs(P-I)),e.fillRect(H,L,v,E-L),S.push({timestamp:T,close:C,closeHeight:I,open:k,openHeight:P,high:y,highHeight:L,low:D,lowHeight:E,xRange:[F,F+U],middlePos:H});var _=new Date(1e3*T);if(["1","5","15","30","60"].includes(c.props.resolution)){if(_.getMinutes()%5===0&&Math.abs(H-w)>=50){e.fillStyle=a;var Y=void 0;Y=0===_.getDate()?_.toLocaleDateString(void 0,{month:"short"}):_.toTimeString().slice(0,5),e.fillText(Y,H,o-20),w=H}}else if(Math.abs(H-w)>=50){e.fillStyle=a;var B=void 0;0===_.getDate()?B=_.toLocaleDateString(void 0,{month:"short"}):["D","W"].includes(c.props.resolution)?B=_.toLocaleDateString("en-US",{day:"numeric",month:"numeric"}):"M"===c.props.resolution&&(B=_.toLocaleDateString("en-US",{month:"short",year:"2-digit"})),e.fillText(B,H,o-20),w=H}}var J=c.state,W=J.mouseX,X=J.mouseY;if(W&&X){e.setLineDash([8,6]),e.strokeStyle="#758696",e.beginPath(),e.moveTo(W,X),e.lineTo(0,X),e.stroke(),e.beginPath(),e.moveTo(W,X),e.lineTo(r,X),e.stroke(),e.beginPath(),e.moveTo(W,X),e.lineTo(W,0),e.stroke(),e.beginPath(),e.moveTo(W,X),e.lineTo(W,o),e.stroke(),e.setLineDash([]);var G,K=Number.MAX_SAFE_INTEGER,Q=null,q=Object(M.a)(S);try{for(q.s();!(G=q.n()).done;){var z=G.value,V=Math.abs(W-z.middlePos);V<K&&(K=V,Q=z)}}catch(ie){q.e(ie)}finally{q.f()}if(Q){var Z=Q,$=Z.timestamp,ee=Z.open,te=Z.close,ne=Z.low,ce=Z.high,ae=new Date(1e3*$);e.fillStyle="green",e.textAlign="left",e.fillText("Time: "+A.format(ae)+", Open: "+ee.toFixed(2)+", Close: "+te.toFixed(2)+", Low: "+ne.toFixed(2)+", High: "+ce.toFixed(2),5,40)}}e.fillStyle="#ffffff",e.textAlign="left";var se=new Date(1e3*c.props.from),oe=new Date(1e3*c.props.to),re=c.props.symbol+" from "+A.format(se)+" to "+A.format(oe)+", Resolution: "+c.props.resolution;e.fillText(re,5,20)},c.getHeightOfPrice=function(e,t,n){var a,s,o=c.props.chartData.computed,r=o.max,i=o.min;return(s=[n,t])[0]+(e-(a=[i,r])[0])*(s[1]-s[0])/(a[1]-a[0])},c.getDisplayedPrices=function(){for(var e=c.props.chartData.computed,t=e.max,n=e.min,a=[],s=Math.ceil(t);s>n;s-=1)a.push(s);return a.push(Math.floor(n)),a},c.updateMousePos=function(e,t){c.setState({mouseX:e,mouseY:t})},c.state={zoomLevel:1,mouseX:null,mouseY:null},c}return Object(P.a)(n,[{key:"render",value:function(){var e=this.props,t=e.width,n=e.height,c=e.loaded,s=e.error;return Object(w.jsx)("div",{className:"center",children:Object(w.jsxs)("div",{className:"chart",style:{width:t,height:n},children:[c&&null===s&&Object(w.jsx)(Y,{draw:this.draw,width:t,height:n,style:{width:t,height:n},updateMousePos:this.updateMousePos}),c&&null!==s&&Object(w.jsxs)(a.a.Fragment,{children:[" ",Object(w.jsx)("div",{children:"Error 404: ticker not found"}),Object(w.jsxs)("div",{children:["More info: ",s]})]}),!c&&Object(w.jsx)("img",{src:E,alt:"Loading..."})]})})}}]),n}(a.a.Component),Y=function(e){var t=e.updateMousePos,n=e.draw,a=Object(D.a)(e,U),s=Object(c.useRef)(null);return Object(c.useEffect)((function(){var e=s.current;e.addEventListener("mousemove",(function(n){var c=e.getBoundingClientRect(),a=Math.round(n.clientX-c.left),s=Math.round(n.clientY-c.top);t(a,s)})),e.addEventListener("mouseleave",(function(e){t(null,null)}));var c,a=e.getContext("2d"),o=0;return function e(){o++,n(a,o),c=window.requestAnimationFrame(e)}(),function(){window.cancelAnimationFrame(c)}}),[n]),Object(w.jsx)("canvas",Object(y.a)({ref:s},a))},B=function(){var e=Object(h.e)().ticker;return Object(w.jsx)(H,{ticker:e})},J=(n(411),function(){return Object(w.jsx)("div",{className:"center",children:Object(w.jsx)("div",{children:Object(w.jsx)("h1",{className:"settings-body",children:"Welcome to the settings page."})})})}),W=(n(412),n(269)),X=n(170),G=n(282),K=function(e){var t=e.socket,n=e.username,a=e.chatroom,s=Object(c.useState)(""),o=Object(r.a)(s,2),i=o[0],l=o[1],j=Object(c.useState)([]),h=Object(r.a)(j,2),u=h[0],d=h[1],b=function(){var e=Object(O.a)(f.a.mark((function e(){var c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===i){e.next=5;break}return c={chatroom:a,author:n,message:i,time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()+":"+new Date(Date.now()).getSeconds()},e.next=4,t.emit("send_message",c);case 4:d((function(e){return[].concat(Object(X.a)(e),[c])}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){t.on("receive_message",(function(e){console.log(e),d((function(t){return[].concat(Object(X.a)(t),[e])}))}))}),[t]),Object(w.jsx)("div",{children:Object(w.jsxs)("div",{className:"chat-room-window",children:[Object(w.jsx)("div",{className:"chat-room-header-title",children:Object(w.jsxs)("p",{children:[" Live Chat Room for ",a.toUpperCase()," "]})}),Object(w.jsx)("div",{className:"chat-room-body",children:Object(w.jsx)(G.a,{className:"message-container",children:u.map((function(e){return Object(w.jsx)("div",{className:"message",id:n===e.author?"user-self":"user-other",children:Object(w.jsxs)("div",{children:[Object(w.jsx)("div",{className:"message-content",children:Object(w.jsx)("p",{children:e.message})}),Object(w.jsx)("div",{className:"message-meta",children:Object(w.jsxs)("p",{id:"sender_and_time",children:[e.author," Sent: ",e.time]})})]})})}))})}),Object(w.jsxs)("div",{className:"chat-room-footer",children:[Object(w.jsx)("input",{className:"chat-room-footer-message-field",type:"text",placeholder:"Lets Talk Stocks...",onChange:function(e){l(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&b()}}),Object(w.jsx)("button",{onClick:b,children:"\u25ba"})]})]})})},Q=Object(W.io)("http://localhost:5001"),q=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)(""),o=Object(r.a)(s,2),i=o[0],l=o[1],j=Object(c.useState)(!1),h=Object(r.a)(j,2),u=h[0],d=h[1];return Object(w.jsx)("div",{className:"center",children:u?Object(w.jsx)(K,{socket:Q,username:n,chatroom:i}):Object(w.jsxs)("div",{className:"joinChatRoom",children:[Object(w.jsx)("h3",{children:" Join Stocked Chat Room Now! "}),Object(w.jsx)("input",{className:"joinChatInputField",type:"text",placeholder:"Enter Name",onChange:function(e){a(e.target.value.toUpperCase())}}),Object(w.jsx)("input",{className:"joinChatInputField",type:"text",placeholder:"Enter Ticker",onChange:function(e){l(e.target.value.toUpperCase())}}),Object(w.jsx)("button",{className:"joinChatRoomButton",onClick:function(){""!==n&&""!==i&&(Q.emit("join_chat_room",i),d(!0))},children:" Join Chat Room "})]})})};var z=function(){var e=Object(c.useState)(""),t=Object(r.a)(e,2),n=t[0],s=t[1];Object(c.useEffect)((function(){l.a.get("http://localhost:5001/home").then((function(e){s(e.data)}))}),[]);var o=function(e,t){var n=a.a.useState((function(){var n=window.localStorage.getItem(t);return null!==n?JSON.parse(n):e})),c=Object(r.a)(n,2),s=c[0],o=c[1];return a.a.useEffect((function(){window.localStorage.setItem(t,JSON.stringify(s))}),[t,s]),[s,o]}(null,"username"),i=Object(r.a)(o,2),u=i[0],d=i[1];return Object(w.jsx)("div",{className:"center",children:Object(w.jsx)("div",{className:"App",children:Object(w.jsxs)(j.a,{basename:"/2021-fall-cs160-pied-piper",children:[Object(w.jsx)(C,{loggedInUsername:u,setLoggedInUsername:d}),u&&Object(w.jsx)("div",{children:"This div shows when a user is logged in."}),!u&&Object(w.jsx)("div",{children:"This div shows when there's no logged in user."}),Object(w.jsx)(h.a,{path:"/",children:n}),Object(w.jsx)(h.a,{path:"/ticker/:ticker",children:Object(w.jsx)(B,{})}),Object(w.jsx)(h.a,{path:"/settings",children:Object(w.jsx)(J,{})}),Object(w.jsx)(h.a,{path:"/chat",children:Object(w.jsx)(q,{})})]})})})},V=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,609)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),s(e),o(e)}))};o.a.render(Object(w.jsx)(a.a.StrictMode,{children:Object(w.jsx)(z,{})}),document.getElementById("root")),V()}},[[599,1,2]]]);
//# sourceMappingURL=main.c89de613.chunk.js.map