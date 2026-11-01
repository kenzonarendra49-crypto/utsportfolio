document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.menu-toggle');
  const links=document.querySelector('.nav-links');
  if(toggle&&links) toggle.addEventListener('click',()=>links.classList.toggle('open'));
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const form=document.getElementById('profileForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=Object.fromEntries(new FormData(form).entries());
      localStorage.setItem('portfolioProfile',JSON.stringify(data));
      window.location.href='profil-tampil.html';
    });
  }
  const output=document.getElementById('profileOutput');
  if(output){
    const data=JSON.parse(localStorage.getItem('portfolioProfile')||'null');
    if(data){
      output.innerHTML=`<h2>${escapeHTML(data.nama||'')}</h2><p><b>Email:</b> ${escapeHTML(data.email||'-')}</p><p><b>Program studi:</b> ${escapeHTML(data.prodi||'-')}</p><p><b>Minat:</b> ${escapeHTML(data.minat||'-')}</p><p><b>Tentang saya:</b><br>${escapeHTML(data.tentang||'-')}</p>`;
    }else output.innerHTML='<p>Belum ada data profil. Silakan isi formulir terlebih dahulu.</p><a class="btn" href="profil.html">Isi profil</a>';
  }
  const slides=[...document.querySelectorAll('.slide')];let current=0;
  function showSlide(n){if(!slides.length)return;slides.forEach((s,i)=>s.classList.toggle('active',i===n));}
  document.querySelectorAll('[data-slide]').forEach(btn=>btn.addEventListener('click',()=>{current=(current+Number(btn.dataset.slide)+slides.length)%slides.length;showSlide(current)}));
});
function escapeHTML(value){return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));}
