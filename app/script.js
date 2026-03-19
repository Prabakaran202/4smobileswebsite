<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>4S Mobile</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg:#07080f;--surface:#0e101c;--card:#111420;--card-hover:#161926;
            --border:rgba(37,211,102,0.12);--border-hover:rgba(37,211,102,0.45);
            --accent:#25d366;--accent-dim:#1aad52;--glow:rgba(37,211,102,0.18);
            --price:#5effa8;--text:#eef0f8;--muted:#6b7098;
            --out:#ff5572;--pill:rgba(255,255,255,0.04);
        }
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        body{
            background:var(--bg);color:var(--text);
            font-family:'DM Sans',sans-serif;min-height:100vh;
            background-image:radial-gradient(rgba(37,211,102,0.06) 1px,transparent 1px);
            background-size:28px 28px;
        }

        /* NAV */
        nav{
            position:sticky;top:0;z-index:200;
            background:rgba(7,8,15,0.82);backdrop-filter:blur(18px);
            border-bottom:1px solid var(--border);
            padding:16px 28px 14px;display:flex;flex-direction:column;
            align-items:center;gap:14px;
        }
        nav::after{
            content:'';position:absolute;bottom:-1px;left:15%;right:15%;
            height:1px;background:linear-gradient(90deg,transparent,var(--accent),transparent);
            opacity:0.5;
        }
        .brand-logo{display:flex;align-items:center;gap:10px}
        .logo-icon{
            width:36px;height:36px;
            background:linear-gradient(135deg,var(--accent),var(--accent-dim));
            border-radius:10px;display:flex;align-items:center;justify-content:center;
            font-size:1.1rem;box-shadow:0 0 16px var(--glow);
        }
        nav h1{font-family:'Syne',sans-serif;font-size:1.55rem;font-weight:800;letter-spacing:1.5px}
        nav h1 em{font-style:normal;color:var(--accent)}
        .search-wrap{position:relative;width:100%;max-width:500px}
        .search-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:0.85rem;pointer-events:none}
        nav input{
            width:100%;padding:11px 14px 11px 38px;background:var(--pill);
            border:1px solid var(--border);border-radius:12px;
            color:var(--text);font-family:'DM Sans',sans-serif;font-size:0.88rem;outline:none;
            transition:border 0.25s,box-shadow 0.25s;
        }
        nav input::placeholder{color:var(--muted)}
        nav input:focus{background:rgba(37,211,102,0.04);border-color:var(--accent);box-shadow:0 0 0 4px rgba(37,211,102,0.1)}
        nav ul{list-style:none;display:flex;flex-wrap:wrap;justify-content:center;gap:7px}
        nav ul li{
            cursor:pointer;padding:5px 18px;border-radius:30px;
            border:1px solid var(--border);background:var(--pill);
            font-size:0.8rem;font-weight:500;color:var(--muted);
            transition:all 0.22s;user-select:none;
        }
        nav ul li:hover{border-color:rgba(37,211,102,0.4);color:var(--accent);background:rgba(37,211,102,0.06)}
        nav ul li.active{background:var(--accent);border-color:var(--accent);color:#000;font-weight:700;box-shadow:0 2px 14px rgba(37,211,102,0.35)}

        /* HERO STRIP */
        .hero-strip{
            max-width:1100px;margin:28px auto 0;padding:0 20px;
            display:flex;align-items:center;justify-content:space-between;
        }
        .hero-strip h2{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700}
        .hero-strip span{
            font-size:0.78rem;color:var(--muted);background:var(--pill);
            border:1px solid var(--border);padding:4px 12px;border-radius:20px;
        }

        /* GRID */
        .container{
            display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
            gap:16px;padding:16px 20px 48px;max-width:1100px;margin:0 auto;
        }

        /* CARD */
        .card{
            background:var(--card);border:1px solid var(--border);
            border-radius:18px;padding:16px 14px 14px;
            display:flex;flex-direction:column;gap:10px;
            position:relative;overflow:hidden;
            transition:transform 0.25s cubic-bezier(.22,.68,0,1.2),box-shadow 0.25s,border-color 0.25s,background 0.25s;
            animation:fadeUp 0.4s ease both;
        }
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .card::before{
            content:'';position:absolute;top:0;left:10%;right:10%;height:1px;
            background:linear-gradient(90deg,transparent,var(--accent),transparent);
            opacity:0;transition:opacity 0.3s;
        }
        .card::after{
            content:'';position:absolute;top:-40px;left:50%;transform:translateX(-50%);
            width:120px;height:120px;
            background:radial-gradient(circle,var(--glow),transparent 70%);
            opacity:0;transition:opacity 0.35s;pointer-events:none;
        }
        .card:hover{transform:translateY(-6px) scale(1.01);background:var(--card-hover);border-color:var(--border-hover);box-shadow:0 12px 32px rgba(37,211,102,0.12)}
        .card:hover::before,.card:hover::after{opacity:1}

        .brand-tag{
            position:absolute;top:12px;right:12px;
            font-size:0.64rem;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;
            color:var(--accent);background:rgba(37,211,102,0.08);
            border:1px solid rgba(37,211,102,0.2);padding:2px 8px;border-radius:20px;
        }

        .img-wrap{
            background:linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01));
            border-radius:12px;border:1px solid rgba(255,255,255,0.05);
            overflow:hidden;display:flex;align-items:center;justify-content:center;height:130px;
        }
        .card img{width:100%;height:100%;object-fit:contain;padding:10px;transition:transform 0.35s}
        .card:hover img{transform:scale(1.06)}

        .card h3{font-size:0.86rem;font-weight:600;line-height:1.3}

        /* VARIANT PILLS */
        .variant-pills{display:flex;flex-wrap:wrap;gap:5px}
        .vpill{
            padding:4px 9px;border-radius:8px;font-size:0.7rem;font-weight:600;
            cursor:pointer;border:1px solid rgba(37,211,102,0.2);
            background:rgba(37,211,102,0.05);color:var(--muted);
            font-family:'DM Sans',monospace;transition:all 0.15s;user-select:none;
        }
        .vpill:hover{border-color:rgba(37,211,102,0.4);color:var(--accent)}
        .vpill.selected{background:rgba(37,211,102,0.15);border-color:var(--accent);color:var(--accent)}
        .vpill.out-pill{
            border-color:rgba(255,85,114,0.2);background:rgba(255,85,114,0.05);
            color:#ff557260;cursor:not-allowed;text-decoration:line-through;
        }

        /* PRICE */
        .price-row{display:flex;align-items:baseline;gap:6px}
        .price{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;color:var(--price)}
        .price-note{font-size:0.7rem;color:var(--muted)}

        /* BADGE */
        .badge{
            display:inline-flex;align-items:center;gap:5px;
            font-size:0.7rem;font-weight:600;padding:4px 10px;border-radius:20px;width:fit-content;
        }
        .badge-dot{width:6px;height:6px;border-radius:50%}
        .badge.available{background:rgba(37,211,102,0.08);color:var(--accent);border:1px solid rgba(37,211,102,0.25)}
        .badge.available .badge-dot{background:var(--accent);box-shadow:0 0 6px var(--accent);animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}
        .badge.out{background:rgba(255,85,114,0.08);color:var(--out);border:1px solid rgba(255,85,114,0.25)}
        .badge.out .badge-dot{background:var(--out)}

        /* WA BUTTON */
        .wa-btn{
            display:flex;align-items:center;justify-content:center;gap:7px;
            margin-top:2px;padding:10px 12px;border-radius:11px;border:none;
            font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:700;
            cursor:pointer;text-decoration:none;transition:all 0.22s;
        }
        .wa-btn.order{background:linear-gradient(135deg,#25d366,#1aad52);color:#000;box-shadow:0 2px 12px rgba(37,211,102,0.25)}
        .wa-btn.order:hover{box-shadow:0 4px 22px rgba(37,211,102,0.5);transform:scale(1.03)}
        .wa-btn.disabled{background:rgba(255,255,255,0.04);color:var(--muted);border:1px solid rgba(255,255,255,0.06);cursor:not-allowed;pointer-events:none}

        /* EMPTY */
        .empty{grid-column:1/-1;text-align:center;padding:70px 20px;color:var(--muted)}
        .empty .ei{font-size:3rem;display:block;margin-bottom:12px}

        @media(max-width:480px){
            nav{padding:14px 16px 12px}
            .container{grid-template-columns:repeat(2,1fr);gap:12px;padding:12px 14px 36px}
        }
    </style>
</head>
<body>

<nav>
    <div class="brand-logo">
        <div class="logo-icon">📱</div>
        <h1>4S <em>Mobile</em></h1>
    </div>
    <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" id="search" placeholder="Search for a phone...">
    </div>
    <ul id="brandFilter">
        <li class="active" onclick="filterBrand('all',this)">All</li>
        <li onclick="filterBrand('vivo',this)">Vivo</li>
        <li onclick="filterBrand('oppo',this)">Oppo</li>
        <li onclick="filterBrand('samsung',this)">Samsung</li>
        <li onclick="filterBrand('redmi',this)">Redmi</li>
        <li onclick="filterBrand('realme',this)">Realme</li>
    </ul>
</nav>

<div class="hero-strip">
    <h2>Available Phones</h2>
    <span id="countBadge">0 phones</span>
</div>

<div class="container" id="productContainer"></div>

<script>
const whatsappNumber = "+919940714583";

/* ── Load from localStorage (admin panel saves here) ── */
const FALLBACK = [
    { id:1, brand:"vivo", name:"Vivo Y31", img:"https://via.placeholder.com/150?text=Vivo+Y31",
      variants:[
        {ram:4,storage:128,price:12999,stock:true},
        {ram:6,storage:128,price:14999,stock:true},
        {ram:8,storage:128,price:16999,stock:false}
      ]},
    { id:2, brand:"redmi", name:"Redmi Note 12", img:"https://via.placeholder.com/150?text=Redmi+Note+12",
      variants:[
        {ram:4,storage:64,price:13999,stock:true},
        {ram:8,storage:128,price:15999,stock:true},
        {ram:8,storage:256,price:17999,stock:true}
      ]},
    { id:3, brand:"samsung", name:"Samsung A14", img:"https://via.placeholder.com/150?text=Samsung+A14",
      variants:[
        {ram:4,storage:64,price:11999,stock:true},
        {ram:6,storage:128,price:13999,stock:false}
      ]},
    { id:4, brand:"oppo", name:"Oppo A17", img:"https://via.placeholder.com/150?text=Oppo+A17",
      variants:[
        {ram:4,storage:64,price:10999,stock:true},
        {ram:6,storage:128,price:12999,stock:true}
      ]},
];

function getProducts(){
    const saved = localStorage.getItem("4smobiles_products");
    return saved ? JSON.parse(saved) : FALLBACK;
}

const container = document.getElementById("productContainer");
const countBadge = document.getElementById("countBadge");
let currentBrand = "all";

/* Selected variant per product */
const selectedVariant = {};

function selectVariant(productId, variantIndex){
    selectedVariant[productId] = variantIndex;
    renderCard(productId);
}

function renderCard(productId){
    const products = getProducts();
    const p = products.find(x => x.id === productId);
    if(!p) return;

    const vIdx = selectedVariant[productId] ?? 0;
    const v = p.variants[vIdx];
    const fmt = "₹" + v.price.toLocaleString("en-IN");
    const msg = `Hello, I want to buy ${p.name} (${v.ram}GB RAM / ${v.storage}GB) for ${fmt}`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

    const card = document.getElementById("card_" + productId);
    if(!card) return;

    // update price
    card.querySelector(".price").textContent = fmt;

    // update badge
    const badge = card.querySelector(".badge");
    badge.className = "badge " + (v.stock ? "available" : "out");
    badge.innerHTML = `<span class="badge-dot"></span>${v.stock ? "In Stock" : "Out of Stock"}`;

    // update wa btn
    const btn = card.querySelector(".wa-btn");
    if(v.stock){
        btn.className = "wa-btn order";
        btn.href = waUrl;
        btn.innerHTML = `<span>📲</span> Order on WhatsApp`;
        btn.style.pointerEvents = "";
    } else {
        btn.className = "wa-btn disabled";
        btn.href = "#";
        btn.innerHTML = `Not Available`;
        btn.style.pointerEvents = "none";
    }

    // update variant pill highlights
    const pills = card.querySelectorAll(".vpill");
    pills.forEach((pill, i) => {
        const variant = p.variants[i];
        pill.classList.remove("selected");
        if(!variant.stock) pill.classList.add("out-pill");
        else pill.classList.remove("out-pill");
        if(i === vIdx) pill.classList.add("selected");
    });
}

function displayProducts(filter="all", search=""){
    const products = getProducts();
    const filtered = products
        .filter(p => filter==="all" || p.brand===filter)
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    countBadge.textContent = `${filtered.length} phone${filtered.length!==1?'s':''}`;

    if(!filtered.length){
        container.innerHTML = `<div class="empty"><span class="ei">📭</span><p>No phones found</p></div>`;
        return;
    }

    let html = "";
    filtered.forEach((p, i) => {
        // default selected = first in-stock variant
        const defaultIdx = p.variants.findIndex(v => v.stock);
        if(selectedVariant[p.id] === undefined){
            selectedVariant[p.id] = defaultIdx >= 0 ? defaultIdx : 0;
        }
        const vIdx = selectedVariant[p.id];
        const v = p.variants[vIdx];
        const fmt = "₹" + v.price.toLocaleString("en-IN");
        const msg = `Hello, I want to buy ${p.name} (${v.ram}GB RAM / ${v.storage}GB) for ${fmt}`;
        const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

        const pillsHtml = p.variants.map((vv, vi) => `
            <div class="vpill ${vi===vIdx?'selected':''} ${!vv.stock?'out-pill':''}"
                 onclick="${!vv.stock?'':'selectVariant('+p.id+','+vi+')'}"
                 title="${!vv.stock?'Out of Stock':''}">
                ${vv.ram}/${vv.storage}GB
            </div>
        `).join('');

        html += `
        <div class="card" id="card_${p.id}" style="animation-delay:${i*0.06}s">
            <span class="brand-tag">${p.brand}</span>
            <div class="img-wrap">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <h3>${p.name}</h3>
            <div class="variant-pills">${pillsHtml}</div>
            <div class="price-row">
                <p class="price">${fmt}</p>
                <span class="price-note">incl. taxes</span>
            </div>
            <span class="badge ${v.stock?'available':'out'}">
                <span class="badge-dot"></span>
                ${v.stock ? 'In Stock' : 'Out of Stock'}
            </span>
            <a href="${v.stock?waUrl:'#'}" target="_blank"
               class="wa-btn ${v.stock?'order':'disabled'}"
               style="${!v.stock?'pointer-events:none':''}">
                <span>${v.stock?'📲':''}</span>
                ${v.stock?'Order on WhatsApp':'Not Available'}
            </a>
        </div>`;
    });

    container.innerHTML = html;
}

function filterBrand(brand, el){
    currentBrand = brand;
    document.querySelectorAll("#brandFilter li").forEach(li => li.classList.remove("active"));
    el.classList.add("active");
    displayProducts(currentBrand, document.getElementById("search").value);
}

document.getElementById("search").addEventListener("input", e => {
    displayProducts(currentBrand, e.target.value);
});

displayProducts();
</script>
</body>
</html>
