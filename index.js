import{a as f,S as p,i as n}from"./assets/vendor-BgmC94F3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const m="https://pixabay.com/api/",y="53020322-8236fb03113a5119ee0fdb502";async function g(s){const o={key:y,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await f.get(m,{params:o})).data}const u=document.querySelector(".gallery"),d=document.querySelector(".loader");let h=new p(".gallery a",{captionsData:"alt",captionDelay:250});function b(s){const o=s.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${e.likes}</p>
            <p><b>Views:</b> ${e.views}</p>
            <p><b>Comments:</b> ${e.comments}</p>
            <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </li>
      `).join("");u.insertAdjacentHTML("beforeend",o),h.refresh()}function L(){u.innerHTML=""}function w(){d.classList.remove("is-hidden")}function l(){d.classList.add("is-hidden")}const c=document.querySelector(".form");document.querySelector(".gallery");c.addEventListener("submit",async s=>{s.preventDefault();const o=s.target.elements["search-text"].value.trim();if(!o){n.warning({title:"Warning",message:"Please enter a search term.",position:"topRight"});return}L(),w();try{const e=await g(o);if(l(),e.hits.length===0){n.error({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(e.hits)}catch(e){l(),n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)}finally{c.reset()}});
//# sourceMappingURL=index.js.map
