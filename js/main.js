const products={
 serum:{name:"Glow Serum",price:690},cream:{name:"Daily Cream",price:540},
 oil:{name:"Silky Body Oil",price:620},set:{name:"Self-care Set",price:1190}
};
const cart={};
const count=document.getElementById("cart-count");
const overlay=document.getElementById("cart-overlay");
const items=document.getElementById("cart-items");
const total=document.getElementById("cart-total");
const toast=document.getElementById("toast");
let toastTimer;
function money(n){return n.toLocaleString("uk-UA")+" грн"}
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2100)}
function renderCart(){
 const entries=Object.entries(cart).filter(([,qty])=>qty>0);
 const qty=entries.reduce((sum,[,n])=>sum+n,0);
 const sum=entries.reduce((s,[id,n])=>s+products[id].price*n,0);
 count.textContent=qty;total.textContent=money(sum);
 items.innerHTML=entries.length?entries.map(([id,n])=>`<div class="cart-row"><div><strong>${products[id].name}</strong><br>${money(products[id].price)} × ${n}</div><div><strong>${money(products[id].price*n)}</strong><br><button data-remove="${id}">Прибрати</button></div></div>`).join(""):'<p class="empty-cart">Поки тут порожньо. Час знайти свій glow ✨</p>';
 const body=entries.map(([id,n])=>`${products[id].name} — ${n} шт. × ${money(products[id].price)}`).join("%0D%0A");
 document.getElementById("checkout").href=`mailto:hello@glowbeauty.example?subject=Замовлення%20Glow%20Beauty&body=${encodeURIComponent(body+"%0D%0AРазом: "+money(sum))}`;
}
document.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>{const id=btn.dataset.add;cart[id]=(cart[id]||0)+1;renderCart();notify("Додано до кошика ✨")}));
items.addEventListener("click",e=>{const id=e.target.dataset.remove;if(id){delete cart[id];renderCart()}});
document.getElementById("cart-open").addEventListener("click",()=>{overlay.classList.add("open");overlay.setAttribute("aria-hidden","false")});
function closeCart(){overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true")}
document.getElementById("cart-close").addEventListener("click",closeCart);
overlay.addEventListener("click",e=>{if(e.target===overlay)closeCart()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");document.querySelectorAll(".product-card").forEach(card=>{card.hidden=btn.dataset.filter!=="all"&&card.dataset.category!==btn.dataset.filter})}));
const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));
renderCart();
