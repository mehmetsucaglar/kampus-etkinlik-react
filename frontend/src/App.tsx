import { useState, useEffect } from "react";
import "./App.css"; // CSS'i çektiğimizden emin oluyoruz
import type { Category, CampusEvent } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Arama ve filtre state'leri
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa yönlendirme fonksiyonu
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Seçili etkinlik
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Side-effect: Tarayıcı sekme başlığını güncelleme
  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `Kampüs Etkinlikleri - ${selected.title}`;
    } else if (page === "add" || page === "update") {
      document.title = `Kampüs Etkinlikleri - Etkinlik ${page === "add" ? "Ekle" : "Güncelle"}`;
    } else if (page === "events") {
      document.title = "Kampüs Etkinlikleri - Tüm Etkinlikler";
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selected]);

  // Ana sayfadaki yaklaşan 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlikler sayfasındaki filtreli sonuç
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  // Benzersiz kategorileri çekme
  const categories = [...new Set(events.map(e => e.category))];

  // Tekrarlanan kart JSX fonksiyonu (.etkinlik-kart class'ı ile)
  function renderCard(event: CampusEvent) {
    return (
      <article className="etkinlik-kart" key={event.id}>
        <div>
          <h3>{event.title}</h3>
          <p>{event.category}</p>
          <p>Tarih: {event.date}, {event.time}</p>
          <p>Yer: {event.location}</p>
          <p>Kontenjan: {event.capacity} kişi</p>
          <p>{event.description}</p>
        </div>
        <button className="btn-primary" style={{ marginTop: "10px" }} onClick={() => go("detail", event.id)}>
          Detayları gör
        </button>
      </article>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Kampüs Etkinlikleri</h1>
        <p style={{ marginBottom: "1rem" }}>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        <nav>
          <ul>
            <li>
              <a href="#" className={page === "home" ? "active" : ""} onClick={(e) => { e.preventDefault(); go("home"); }}>
                Ana Sayfa
              </a>
            </li>
            <li>
              <a href="#" className={page === "events" ? "active" : ""} onClick={(e) => { e.preventDefault(); go("events"); }}>
                Etkinlikler
              </a>
            </li>
            <li>
              <a href="#" className={page === "add" ? "active" : ""} onClick={(e) => { e.preventDefault(); go("add"); }}>
                Ekle
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2 style={{ marginBottom: "1rem" }}>Yaklaşan 2 Etkinlik</h2>
            {/* CSS dosyandaki class'a uygun grid yapısı */}
            <div className="etkinlik-grid etkinlik-grid-2">
              {upcoming.map(renderCard)}
            </div>
            <button className="btn-primary" onClick={() => go("events")}>Tüm etkinlikleri gör</button>
          </section>
        )}

        {page === "events" && (
          <section>
            <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
              <div className="form-group" style={{ flex: 2, minWidth: "250px" }}>
                 <label htmlFor="arama">Etkinlik ara</label>
                 <input id="arama" type="search" placeholder="Örn. atölye, kariyer" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: "150px" }}>
                <label htmlFor="kategori">Kategori</label>
                <select id="kategori" value={category} onChange={(e) => setCategory(e.target.value as Category | "")}>
                   <option value="">Tümü</option>
                   {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <p style={{ marginBottom: "15px", fontWeight: "bold" }}>
              {filtered.length === 0 ? "Sonuç bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            
            {/* Etkinlikler sayfasındaki kartlar */}
            <div className="etkinlik-grid etkinlik-grid-2">
              {filtered.map(renderCard)}
            </div>
          </section>
        )}

        {page === "detail" && (
          <section>
            {!selected && (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p className="error-text" style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Etkinlik bulunamadı.</p>
                <button className="btn-primary" onClick={() => go("events")}>Listeye dön</button>
              </div>
            )}
            
            {selected && (
               <article className="detay-layout">
                  {selected.image && (
                     <figure>
                       <img className="detay-afis" src={selected.image} alt={selected.title} />
                     </figure>
                  )}
                  <div>
                    <h2 style={{ color: "var(--renk-ana)", marginBottom: "10px" }}>{selected.title}</h2>
                    <p style={{ color: "var(--renk-gri)", marginBottom: "20px" }}>{selected.date} • {selected.location}</p>
                    
                    <div style={{ padding: "15px", border: "1px solid var(--renk-kenarlik)", borderRadius: "var(--kose)", background: "#fff", marginBottom: "20px" }}>
                      <h3 style={{ borderBottom: "1px solid var(--renk-kenarlik)", paddingBottom: "5px", marginBottom: "10px" }}>Etkinlik Künyesi</h3>
                      <dl className="detay-kunye">
                        <dt>Tarih</dt>
                        <dd>{selected.date}, {selected.time}</dd>
                        <dt>Yer</dt>
                        <dd>{selected.location}</dd>
                        <dt>Kategori</dt>
                        <dd>{selected.category}</dd>
                        <dt>Kontenjan</dt>
                        <dd>{selected.capacity} kişi</dd>
                      </dl>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <h3 style={{ marginBottom: "10px" }}>Açıklama</h3>
                      <p>{selected.description}</p>
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button className="btn-primary" style={{ background: "var(--renk-gri)" }} onClick={() => go("events")}>← Listeye dön</button>
                      <button className="btn-primary" onClick={() => go("update", selected.id)}>Bu etkinliği güncelle</button>
                    </div>
                  </div>
               </article>
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
           <section>
             <h2 style={{ color: "var(--renk-ana)", marginBottom: "10px" }}>
               {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
             </h2>
             <p style={{ color: "var(--renk-gri)", marginBottom: "15px", fontStyle: "italic" }}>
               Bu sprintte form sadece görünüm; kayıt yapılmaz.
             </p>
             
             <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                   <label htmlFor="title">Etkinlik Adı</label>
                   <input id="title" type="text" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
                </div>
                <div className="form-group">
                   <label htmlFor="categoryForm">Kategori</label>
                   <select id="categoryForm">
                     <option value="">Seçiniz</option>
                     <option value="Seminer">Seminer</option>
                     <option value="Atölye">Atölye</option>
                     <option value="Söyleşi">Söyleşi</option>
                     <option value="Yarışma">Yarışma</option>
                   </select>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--bosluk-m)" }}>
                   <div className="form-group">
                     <label htmlFor="date">Tarih</label>
                     <input id="date" type="date" />
                   </div>
                   <div className="form-group">
                     <label htmlFor="time">Saat</label>
                     <input id="time" type="time" />
                   </div>
                </div>

                <div className="form-group">
                   <label htmlFor="location">Yer</label>
                   <input id="location" type="text" placeholder="Örn. A Blok Konferans Salonu" />
                </div>
                <div className="form-group">
                   <label htmlFor="capacity">Kontenjan</label>
                   <input id="capacity" type="number" min={1} />
                </div>
                <div className="form-group">
                   <label htmlFor="description">Açıklama</label>
                   <textarea id="description" rows={5}></textarea>
                </div>
                
                <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>Kaydet</button>
             </form>
           </section>
        )}
      </main>

      <footer style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid var(--renk-kenarlik)", textAlign: "center", color: "var(--renk-gri)" }}>
           <p>Ad Soyad - 2416501032</p>
      </footer>
    </div>
  );
}

export default App;