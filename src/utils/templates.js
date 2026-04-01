// ─────────────────────────────────────────────────────────────────────────────
// 5 Gorgeous Prebuilt Wedding Invitation Website Templates
// Each is a complete self-contained HTML/CSS mini-website
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_ROYAL_HERITAGE = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Montserrat', sans-serif; background: #0a0000; color: #fff; }

  .rh-hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(180deg, #0a0000 0%, #2d0000 40%, #5c1010 100%);
    position: relative; text-align: center; overflow: hidden;
  }
  .rh-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url('https://picsum.photos/seed/royalheritage/1600/1000') center/cover;
    opacity: 0.15; filter: saturate(0.5);
  }
  .rh-hero::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 200px;
    background: linear-gradient(transparent, #0a0000);
  }
  .rh-ornament { width: 120px; margin: 0 auto 2rem; opacity: 0.6; }
  .rh-tag {
    letter-spacing: 0.4em; text-transform: uppercase; font-size: 0.65rem;
    color: #D4AF37; border: 1px solid rgba(212,175,55,0.3);
    display: inline-block; padding: 0.6rem 2rem; border-radius: 2px; margin-bottom: 1.5rem;
  }
  .rh-names {
    font-family: 'Playfair Display', serif; font-size: 5.5rem; line-height: 1.05;
    background: linear-gradient(135deg, #D4AF37, #FFE4A0, #D4AF37);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: 1rem;
  }
  .rh-amp { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 3rem; display: block; margin: 0.5rem 0; opacity: 0.7; -webkit-text-fill-color: #D4AF37; }
  .rh-date { letter-spacing: 0.3em; text-transform: uppercase; font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 1.5rem; }
  .rh-scroll { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); color: #D4AF37; font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.6; }

  .rh-section { max-width: 800px; margin: 0 auto; padding: 6rem 2rem; text-align: center; }
  .rh-divider { width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); margin: 0 auto 3rem; }
  .rh-heading { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #D4AF37; margin-bottom: 1rem; }
  .rh-text { color: rgba(255,255,255,0.6); font-size: 1rem; line-height: 1.9; max-width: 550px; margin: 0 auto; font-weight: 300; }

  .rh-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; max-width: 700px; margin-left: auto; margin-right: auto; }
  .rh-card {
    background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.15);
    border-radius: 16px; padding: 2.5rem 2rem; text-align: left;
    transition: border-color 0.3s, transform 0.3s;
  }
  .rh-card:hover { border-color: rgba(212,175,55,0.4); transform: translateY(-4px); }
  .rh-card h3 { font-family: 'Playfair Display', serif; color: #D4AF37; font-size: 1.3rem; margin-bottom: 0.75rem; }
  .rh-card p { color: rgba(255,255,255,0.5); font-size: 0.9rem; line-height: 1.6; }

  .rh-events { background: rgba(212,175,55,0.03); border-top: 1px solid rgba(212,175,55,0.1); border-bottom: 1px solid rgba(212,175,55,0.1); }
  .rh-timeline { display: flex; flex-direction: column; gap: 2rem; margin-top: 2.5rem; max-width: 500px; margin-left: auto; margin-right: auto; }
  .rh-event { display: flex; gap: 1.5rem; align-items: flex-start; text-align: left; }
  .rh-event-time { font-size: 0.75rem; color: #D4AF37; letter-spacing: 0.15em; min-width: 80px; padding-top: 0.25rem; text-transform: uppercase; }
  .rh-event-dot { width: 10px; height: 10px; border-radius: 50%; background: #D4AF37; margin-top: 0.35rem; flex-shrink: 0; }
  .rh-event-detail h4 { color: #fff; font-size: 1rem; margin-bottom: 0.25rem; }
  .rh-event-detail p { color: rgba(255,255,255,0.4); font-size: 0.85rem; }

  .rh-rsvp {
    background: linear-gradient(135deg, #2d0000, #5c1010); border-radius: 24px;
    padding: 4rem 2rem; margin: 2rem; max-width: 700px; margin-left: auto; margin-right: auto;
    border: 1px solid rgba(212,175,55,0.15); text-align: center;
  }
  .rh-btn {
    display: inline-block; background: linear-gradient(135deg, #D4AF37, #FFE4A0);
    color: #0a0000; padding: 1rem 3rem; border-radius: 999px; font-weight: 600;
    text-decoration: none; font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase;
    border: none; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;
  }
  .rh-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(212,175,55,0.3); }

  .rh-footer { text-align: center; padding: 3rem; color: rgba(255,255,255,0.2); font-size: 0.75rem; letter-spacing: 0.1em; }

  @media (max-width: 768px) {
    .rh-names { font-size: 3rem; }
    .rh-amp { font-size: 2rem; }
    .rh-section { padding: 3rem 1.5rem; }
    .rh-heading { font-size: 1.8rem; }
    .rh-cards { grid-template-columns: 1fr; }
    .rh-card { padding: 1.5rem; }
    .rh-rsvp { margin: 1rem; padding: 2.5rem 1.5rem; }
  }
</style>

<section class="rh-hero">
  <div style="position:relative;z-index:2;">
    <div class="rh-tag">You Are Cordially Invited</div>
    <h1 class="rh-names">
      Rahul
      <span class="rh-amp">&</span>
      Aisha
    </h1>
    <p class="rh-date">Saturday, December 24th, 2026 • Jaipur</p>
  </div>
  <span class="rh-scroll">Scroll to explore ↓</span>
</section>

<section class="rh-section">
  <div class="rh-divider"></div>
  <h2 class="rh-heading">Our Celebration</h2>
  <p class="rh-text">With the blessings of our families, we invite you to witness the beginning of our new journey together. Your presence will bring immense joy and blessings to our union.</p>
  <div class="rh-cards">
    <div class="rh-card"><h3>📅 When</h3><p>Saturday, December 24th, 2026<br/>Ceremony begins at 4:00 PM</p></div>
    <div class="rh-card"><h3>📍 Where</h3><p>The Grand Palace<br/>Civil Lines, Jaipur, Rajasthan 302006</p></div>
    <div class="rh-card"><h3>👗 Dress Code</h3><p>Traditional Indian attire preferred. Colors: Red, Gold, Maroon</p></div>
    <div class="rh-card"><h3>🎁 Registry</h3><p>Your love and blessings are the greatest gift of all.</p></div>
  </div>
</section>

<section class="rh-section rh-events">
  <div class="rh-divider"></div>
  <h2 class="rh-heading">Event Schedule</h2>
  <div class="rh-timeline">
    <div class="rh-event"><span class="rh-event-time">2:00 PM</span><div class="rh-event-dot"></div><div class="rh-event-detail"><h4>Baraat Arrival</h4><p>The groom's procession arrives at the venue</p></div></div>
    <div class="rh-event"><span class="rh-event-time">4:00 PM</span><div class="rh-event-dot"></div><div class="rh-event-detail"><h4>Wedding Ceremony</h4><p>The sacred wedding rituals and vows</p></div></div>
    <div class="rh-event"><span class="rh-event-time">7:00 PM</span><div class="rh-event-dot"></div><div class="rh-event-detail"><h4>Reception & Dinner</h4><p>Cocktails, dinner, and celebrations</p></div></div>
  </div>
</section>

<section class="rh-rsvp">
  <h2 class="rh-heading" style="margin-bottom:1rem;">Will You Join Us?</h2>
  <p class="rh-text" style="margin-bottom:2rem;">Kindly let us know by November 30th, 2026</p>
  <button class="rh-btn">RSVP Now</button>
</section>

<footer class="rh-footer">Crafted with ♥ by Desi Digital Prints</footer>
`;


export const TEMPLATE_EMERALD_PALACE = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Lato', sans-serif; background: #f5f0e8; color: #2d3b2d; }

  .ep-hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(170deg, #1a3c2a 0%, #2d5a3f 50%, #3d7a55 100%);
    position: relative; text-align: center; overflow: hidden;
  }
  .ep-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url('https://picsum.photos/seed/emeraldpalace/1600/1000') center/cover;
    opacity: 0.12;
  }
  .ep-leaf { position: absolute; font-size: 4rem; opacity: 0.08; }
  .ep-leaf-1 { top: 10%; left: 5%; transform: rotate(-30deg); }
  .ep-leaf-2 { top: 20%; right: 8%; transform: rotate(45deg); }
  .ep-leaf-3 { bottom: 15%; left: 10%; transform: rotate(15deg); }

  .ep-badge {
    background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2); display: inline-block;
    padding: 0.5rem 1.5rem; border-radius: 999px; font-size: 0.7rem;
    letter-spacing: 0.3em; text-transform: uppercase; color: #c5e6d0; margin-bottom: 2rem;
  }
  .ep-names {
    font-family: 'Cormorant Garamond', serif; font-size: 5rem; color: #fff;
    line-height: 1.1; margin-bottom: 0.5rem;
  }
  .ep-amp { color: #90d4a8; font-style: italic; font-size: 2.5rem; display: block; margin: 0.75rem 0; }
  .ep-date-box {
    margin-top: 2.5rem; border: 1px solid rgba(255,255,255,0.2);
    display: inline-flex; gap: 2rem; padding: 1rem 2.5rem; border-radius: 12px;
    background: rgba(255,255,255,0.05); backdrop-filter: blur(8px);
  }
  .ep-date-item { text-align: center; }
  .ep-date-item .num { font-size: 1.8rem; font-weight: 700; color: #fff; display: block; }
  .ep-date-item .label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; color: #90d4a8; }

  .ep-story {
    max-width: 900px; margin: 0 auto; padding: 6rem 2rem; text-align: center;
  }
  .ep-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem; align-items: center; }
  .ep-story-img {
    width: 100%; aspect-ratio: 3/4; object-fit: cover; border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 4px solid #fff;
  }
  .ep-story-text { text-align: left; }
  .ep-story-text h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: #2d5a3f; margin-bottom: 1rem; }
  .ep-story-text p { color: #5a6b5a; line-height: 1.9; font-weight: 300; }

  .ep-details {
    background: #2d5a3f; color: #fff; padding: 5rem 2rem;
  }
  .ep-details-inner { max-width: 800px; margin: 0 auto; text-align: center; }
  .ep-heading { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-bottom: 2rem; }
  .ep-detail-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem; }
  .ep-dcard {
    background: rgba(255,255,255,0.08); border-radius: 16px; padding: 2rem 1.5rem;
    border: 1px solid rgba(255,255,255,0.1); transition: transform 0.3s;
  }
  .ep-dcard:hover { transform: translateY(-4px); }
  .ep-dcard .icon { font-size: 2rem; margin-bottom: 1rem; }
  .ep-dcard h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin-bottom: 0.5rem; }
  .ep-dcard p { font-size: 0.85rem; color: rgba(255,255,255,0.6); line-height: 1.6; }

  .ep-rsvp { max-width: 600px; margin: 0 auto; padding: 5rem 2rem; text-align: center; }
  .ep-btn {
    display: inline-block; background: #2d5a3f; color: #fff; padding: 1rem 3rem;
    border-radius: 999px; font-weight: 600; border: none; cursor: pointer;
    font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase;
    transition: background 0.3s, transform 0.3s;
  }
  .ep-btn:hover { background: #3d7a55; transform: translateY(-2px); }
  .ep-footer { text-align: center; padding: 2rem; color: #a0b0a0; font-size: 0.75rem; background: #f5f0e8; }

  @media (max-width: 768px) {
    .ep-names { font-size: 3rem; }
    .ep-story-grid { grid-template-columns: 1fr; }
    .ep-detail-cards { grid-template-columns: 1fr; }
    .ep-heading { font-size: 1.8rem; }
    .ep-date-box { gap: 1rem; padding: 0.8rem 1.5rem; }
  }
</style>

<section class="ep-hero">
  <span class="ep-leaf ep-leaf-1">🌿</span>
  <span class="ep-leaf ep-leaf-2">🍃</span>
  <span class="ep-leaf ep-leaf-3">🌿</span>
  <div style="position:relative;z-index:2;">
    <div class="ep-badge">✦ Together With Their Families ✦</div>
    <h1 class="ep-names">Arjun <span class="ep-amp">&</span> Meera</h1>
    <p style="color:#c5e6d0;letter-spacing:0.2em;font-size:0.8rem;margin-top:1rem;">REQUEST THE PLEASURE OF YOUR COMPANY</p>
    <div class="ep-date-box">
      <div class="ep-date-item"><span class="num">24</span><span class="label">Day</span></div>
      <div class="ep-date-item"><span class="num">Dec</span><span class="label">Month</span></div>
      <div class="ep-date-item"><span class="num">2026</span><span class="label">Year</span></div>
    </div>
  </div>
</section>

<section class="ep-story">
  <h2 class="ep-heading" style="color:#2d5a3f;">Our Love Story</h2>
  <p style="color:#5a6b5a;max-width:500px;margin:0 auto 2rem;line-height:1.8;">From a chance meeting at a college fest to building a life together — our journey has been nothing short of magical.</p>
  <div class="ep-story-grid">
    <img src="https://picsum.photos/seed/couple1/500/650" class="ep-story-img" alt="Our Story" />
    <div class="ep-story-text">
      <h3>How We Met</h3>
      <p>It was during the annual college cultural fest. Arjun was performing on stage and Meera was in the audience. A shared laugh over spilled chai turned into hours of conversation, and the rest is history.</p>
      <br/>
      <h3>The Proposal</h3>
      <p>Under the stars at the City Palace in Udaipur, with the lake shimmering in the moonlight, Arjun got down on one knee. Through tears of joy, Meera said yes.</p>
    </div>
  </div>
</section>

<section class="ep-details">
  <div class="ep-details-inner">
    <h2 class="ep-heading">Wedding Details</h2>
    <div class="ep-detail-cards">
      <div class="ep-dcard"><div class="icon">🕌</div><h4>Ceremony</h4><p>4:00 PM onwards<br/>The Emerald Garden<br/>Udaipur, Rajasthan</p></div>
      <div class="ep-dcard"><div class="icon">🍽️</div><h4>Reception</h4><p>7:30 PM<br/>Lakeside Pavilion<br/>Cocktails & Dinner</p></div>
      <div class="ep-dcard"><div class="icon">💃</div><h4>Sangeet Night</h4><p>Dec 23, 8:00 PM<br/>Poolside Stage<br/>Music & Dance</p></div>
    </div>
  </div>
</section>

<section class="ep-rsvp">
  <h2 class="ep-heading" style="color:#2d5a3f;">Kindly Respond</h2>
  <p style="color:#5a6b5a;margin-bottom:2rem;line-height:1.8;">We would be truly honoured by your presence. Please let us know by November 30th, 2026.</p>
  <button class="ep-btn">Confirm Attendance</button>
</section>

<footer class="ep-footer">Handcrafted with ♥ by Desi Digital Prints</footer>
`;


export const TEMPLATE_GOLDEN_SUNRISE = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Poppins', sans-serif; background: #fffaf0; color: #4a3728; }

  .gs-hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #fff4e0 0%, #ffe0a0 30%, #ffb347 70%, #ff8c00 100%);
    position: relative; text-align: center; overflow: hidden;
  }
  .gs-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url('https://picsum.photos/seed/goldensunrise/1600/1000') center/cover;
    opacity: 0.1; mix-blend-mode: multiply;
  }
  .gs-sun {
    position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,200,0,0.4) 0%, transparent 70%);
    filter: blur(40px);
  }

  .gs-script { font-family: 'Great Vibes', cursive; font-size: 1.5rem; color: #8B4513; margin-bottom: 0.5rem; }
  .gs-names { font-size: 4.5rem; font-weight: 600; color: #4a2800; line-height: 1.15; }
  .gs-ampersand { font-family: 'Great Vibes', cursive; font-size: 4rem; color: #D4860A; display: block; margin: 0.25rem 0; }
  .gs-info { margin-top: 2rem; color: #8B5E3C; font-weight: 300; font-size: 0.9rem; letter-spacing: 0.15em; text-transform: uppercase; }

  .gs-countdown {
    display: flex; justify-content: center; gap: 1.5rem; margin-top: 2.5rem;
  }
  .gs-count-item {
    background: rgba(255,255,255,0.7); backdrop-filter: blur(10px);
    border-radius: 16px; padding: 1.2rem 1.5rem; min-width: 80px; text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }
  .gs-count-item .number { font-size: 2rem; font-weight: 600; color: #4a2800; display: block; }
  .gs-count-item .unit { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; color: #8B5E3C; }

  .gs-section { max-width: 800px; margin: 0 auto; padding: 5rem 2rem; text-align: center; }
  .gs-flower { font-size: 1.5rem; margin-bottom: 1rem; }
  .gs-heading { font-family: 'Great Vibes', cursive; font-size: 3rem; color: #D4860A; margin-bottom: 1rem; }
  .gs-text { color: #7a6050; line-height: 1.9; font-weight: 300; max-width: 550px; margin: 0 auto; }

  .gs-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem; }
  .gs-gallery img {
    width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08); border: 3px solid #fff;
    transition: transform 0.3s;
  }
  .gs-gallery img:hover { transform: scale(1.05); }

  .gs-venue {
    background: linear-gradient(135deg, #4a2800, #8B4513); color: #fff;
    border-radius: 24px; padding: 3rem 2rem; max-width: 700px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; text-align: left;
  }
  .gs-venue h3 { font-family: 'Great Vibes', cursive; font-size: 1.8rem; color: #FFD700; margin-bottom: 0.75rem; }
  .gs-venue p { color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.7; }

  .gs-rsvp-section { background: #fff8f0; border-top: 1px solid #f0e0c8; border-bottom: 1px solid #f0e0c8; }
  .gs-btn {
    display: inline-block; background: linear-gradient(135deg, #D4860A, #FFB347);
    color: #fff; padding: 1rem 3rem; border-radius: 999px; font-weight: 500;
    border: none; cursor: pointer; font-size: 0.9rem; letter-spacing: 0.1em;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .gs-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(212,134,10,0.3); }
  .gs-footer { text-align: center; padding: 3rem; color: #c0a888; font-size: 0.75rem; }

  @media (max-width: 768px) {
    .gs-names { font-size: 2.5rem; }
    .gs-ampersand { font-size: 2.5rem; }
    .gs-heading { font-size: 2rem; }
    .gs-gallery { grid-template-columns: 1fr; }
    .gs-venue { grid-template-columns: 1fr; }
    .gs-countdown { gap: 0.75rem; }
    .gs-count-item { min-width: 60px; padding: 0.8rem 1rem; }
  }
</style>

<section class="gs-hero">
  <div class="gs-sun"></div>
  <div style="position:relative;z-index:2;">
    <p class="gs-script">Together with their families</p>
    <h1 class="gs-names">Vikram <span class="gs-ampersand">&</span> Priya</h1>
    <p class="gs-info">Invite you to celebrate their wedding</p>
    <div class="gs-countdown">
      <div class="gs-count-item"><span class="number">24</span><span class="unit">Dec</span></div>
      <div class="gs-count-item"><span class="number">2026</span><span class="unit">Year</span></div>
      <div class="gs-count-item"><span class="number">4 PM</span><span class="unit">Time</span></div>
    </div>
  </div>
</section>

<section class="gs-section">
  <div class="gs-flower">🌸</div>
  <h2 class="gs-heading">Our Journey Together</h2>
  <p class="gs-text">What began as a friendship blossomed into love. Every moment we share is a blessing, and we can't wait to celebrate this new chapter with you.</p>
  <div class="gs-gallery">
    <img src="https://picsum.photos/seed/gs1/400/400" alt="Memory 1" />
    <img src="https://picsum.photos/seed/gs2/400/400" alt="Memory 2" />
    <img src="https://picsum.photos/seed/gs3/400/400" alt="Memory 3" />
  </div>
</section>

<section class="gs-section">
  <h2 class="gs-heading">Venue & Details</h2>
  <div class="gs-venue">
    <div><h3>Ceremony</h3><p>The Golden Garden Resort<br/>Pushkar Road, Ajmer<br/>Rajasthan 305001<br/><br/>Saturday, 4:00 PM</p></div>
    <div><h3>Reception</h3><p>Starlight Banquet Hall<br/>Within the resort premises<br/><br/>7:30 PM onwards<br/>Cocktails, Dinner & Dancing</p></div>
  </div>
</section>

<section class="gs-section gs-rsvp-section">
  <div class="gs-flower">💛</div>
  <h2 class="gs-heading">Will You Be There?</h2>
  <p class="gs-text" style="margin-bottom:2rem;">Your presence means the world to us. Please confirm by December 1st, 2026.</p>
  <button class="gs-btn">RSVP Now</button>
</section>

<footer class="gs-footer">Made with ♥ by Desi Digital Prints</footer>
`;


export const TEMPLATE_PINK_BLOSSOM = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Quicksand:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Quicksand', sans-serif; background: #fff5f5; color: #5a3e3e; }

  .pb-hero {
    min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: linear-gradient(180deg, #fff0f3 0%, #ffe4ec 50%, #ffd6e0 100%);
    position: relative; text-align: center; overflow: hidden;
  }
  .pb-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url('https://picsum.photos/seed/pinkblossom/1600/1000') center/cover;
    opacity: 0.08;
  }
  .pb-petals { position: absolute; font-size: 2rem; opacity: 0.15; }
  .pb-p1 { top: 8%; left: 12%; } .pb-p2 { top: 15%; right: 15%; }
  .pb-p3 { bottom: 20%; left: 8%; } .pb-p4 { bottom: 10%; right: 10%; }

  .pb-ring { width: 100px; height: 100px; border: 2px solid rgba(219,112,147,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; font-size: 2rem; }
  .pb-subtitle { font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c76b8a; margin-bottom: 1rem; }
  .pb-names { font-family: 'Libre Baskerville', serif; font-size: 4.5rem; color: #8B3A62; line-height: 1.15; }
  .pb-amp { color: #DB7093; font-style: italic; font-size: 3rem; display: block; margin: 0.5rem 0; }
  .pb-date { margin-top: 2rem; font-size: 0.9rem; color: #c76b8a; letter-spacing: 0.2em; }

  .pb-section { max-width: 800px; margin: 0 auto; padding: 5rem 2rem; text-align: center; }
  .pb-heading { font-family: 'Libre Baskerville', serif; font-size: 2.2rem; color: #8B3A62; margin-bottom: 1rem; }
  .pb-text { color: #8a6a6a; line-height: 1.9; font-weight: 300; max-width: 520px; margin: 0 auto; }
  .pb-divider { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 3rem auto; color: #DB7093; font-size: 0.8rem; }
  .pb-divider::before, .pb-divider::after { content: ''; width: 60px; height: 1px; background: #f0c0d0; }

  .pb-photos { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 2rem; }
  .pb-photos img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 20px; box-shadow: 0 10px 30px rgba(139,58,98,0.1); }

  .pb-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; text-align: left; }
  .pb-info-card {
    background: #fff; border-radius: 20px; padding: 2.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    border: 1px solid #fce4ec;
  }
  .pb-info-card h3 { font-family: 'Libre Baskerville', serif; color: #8B3A62; font-size: 1.2rem; margin-bottom: 0.75rem; }
  .pb-info-card p { color: #8a6a6a; font-size: 0.9rem; line-height: 1.7; }

  .pb-rsvp {
    background: linear-gradient(135deg, #8B3A62, #DB7093); border-radius: 24px;
    padding: 4rem 2rem; color: #fff; text-align: center;
    max-width: 600px; margin: 2rem auto;
  }
  .pb-btn {
    display: inline-block; background: #fff; color: #8B3A62; padding: 1rem 3rem;
    border-radius: 999px; font-weight: 600; border: none; cursor: pointer;
    font-size: 0.9rem; transition: transform 0.3s;
  }
  .pb-btn:hover { transform: scale(1.05); }
  .pb-footer { text-align: center; padding: 3rem; color: #d0a0b0; font-size: 0.75rem; }

  @media (max-width: 768px) {
    .pb-names { font-size: 2.5rem; }
    .pb-amp { font-size: 2rem; }
    .pb-heading { font-size: 1.6rem; }
    .pb-photos { grid-template-columns: 1fr; }
    .pb-info-grid { grid-template-columns: 1fr; }
    .pb-section { padding: 3rem 1.5rem; }
    .pb-rsvp { padding: 2.5rem 1.5rem; }
  }
</style>

<section class="pb-hero">
  <span class="pb-petals pb-p1">🌸</span><span class="pb-petals pb-p2">🌷</span>
  <span class="pb-petals pb-p3">🌺</span><span class="pb-petals pb-p4">🌸</span>
  <div style="position:relative;z-index:2;">
    <div class="pb-ring">💍</div>
    <p class="pb-subtitle">We're Getting Married!</p>
    <h1 class="pb-names">Karan <span class="pb-amp">&</span> Nisha</h1>
    <p class="pb-date">March 15, 2027 • Mumbai</p>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-heading">Two Souls, One Heart</h2>
  <p class="pb-text">From chai dates to forever — our love story is one we want to celebrate with everyone who matters. You are our people, and we can't imagine this day without you.</p>
  <div class="pb-divider">✿</div>
  <div class="pb-photos">
    <img src="https://picsum.photos/seed/pb1/500/625" alt="Photo 1" />
    <img src="https://picsum.photos/seed/pb2/500/625" alt="Photo 2" />
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-heading">Wedding Details</h2>
  <div class="pb-info-grid">
    <div class="pb-info-card"><h3>🏛️ Venue</h3><p>The Royal Orchid Hall<br/>Bandra West, Mumbai<br/>Maharashtra 400050</p></div>
    <div class="pb-info-card"><h3>⏰ Schedule</h3><p>Haldi: 10 AM, March 14<br/>Ceremony: 5 PM, March 15<br/>Reception: 8 PM, March 15</p></div>
    <div class="pb-info-card"><h3>👗 Attire</h3><p>Semi-formal / Traditional<br/>Pastel colors encouraged<br/>Comfortable footwear recommended</p></div>
    <div class="pb-info-card"><h3>🏨 Accommodation</h3><p>Rooms blocked at The Orchid<br/>Use code: KARANNISHA<br/>15% discount available</p></div>
  </div>
</section>

<section class="pb-section">
  <div class="pb-rsvp">
    <h2 style="font-family:'Libre Baskerville',serif;font-size:2rem;margin-bottom:1rem;">Save Your Seat</h2>
    <p style="opacity:0.8;margin-bottom:2rem;font-weight:300;">Please confirm your attendance by February 28, 2027</p>
    <button class="pb-btn">RSVP with Love</button>
  </div>
</section>

<footer class="pb-footer">Created with ♥ by Desi Digital Prints</footer>
`;


export const TEMPLATE_MIDNIGHT_LUXE = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #0a0a14; color: #e0e0e0; }

  .ml-hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(180deg, #0a0a14 0%, #12122a 50%, #1a1a3a 100%);
    position: relative; text-align: center; overflow: hidden;
  }
  .ml-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url('https://picsum.photos/seed/midnightluxe/1600/1000') center/cover;
    opacity: 0.08;
  }
  .ml-stars { position: absolute; inset: 0; background: radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.3), transparent), radial-gradient(2px 2px at 40% 70%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.2), transparent), radial-gradient(2px 2px at 10% 80%, rgba(255,255,255,0.15), transparent), radial-gradient(1px 1px at 70% 90%, rgba(255,255,255,0.3), transparent); }

  .ml-mono { font-family: 'Inter', sans-serif; font-size: 0.6rem; letter-spacing: 0.5em; text-transform: uppercase; color: #8888cc; margin-bottom: 2rem; }
  .ml-names {
    font-family: 'Bodoni Moda', serif; font-size: 6rem; line-height: 1;
    background: linear-gradient(135deg, #c0c0ff, #ffffff, #c0c0ff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .ml-amp { -webkit-text-fill-color: #6666aa; font-style: italic; font-size: 3rem; display: block; margin: 0.75rem 0; }
  .ml-line { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, #6666aa, transparent); margin: 2rem auto; }
  .ml-date { color: #8888cc; font-size: 0.8rem; letter-spacing: 0.25em; text-transform: uppercase; }

  .ml-section { max-width: 900px; margin: 0 auto; padding: 6rem 2rem; text-align: center; }
  .ml-heading { font-family: 'Bodoni Moda', serif; font-size: 2.5rem; color: #fff; margin-bottom: 1rem; }
  .ml-subtext { color: #7777aa; font-weight: 300; line-height: 1.9; max-width: 550px; margin: 0 auto; }

  .ml-features { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; margin-top: 3rem; background: rgba(100,100,170,0.1); border-radius: 20px; overflow: hidden; }
  .ml-feat {
    background: #0f0f20; padding: 3rem 2rem; text-align: center;
    transition: background 0.3s;
  }
  .ml-feat:hover { background: #15152d; }
  .ml-feat .icon { font-size: 1.5rem; margin-bottom: 1rem; opacity: 0.6; }
  .ml-feat h4 { font-family: 'Bodoni Moda', serif; color: #c0c0ff; font-size: 1.1rem; margin-bottom: 0.5rem; }
  .ml-feat p { color: #6666aa; font-size: 0.8rem; line-height: 1.6; }

  .ml-duo {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem;
  }
  .ml-duo img {
    width: 100%; aspect-ratio: 3/4; object-fit: cover; border-radius: 16px;
    border: 1px solid rgba(100,100,170,0.15); filter: grayscale(30%) contrast(1.1);
    transition: filter 0.5s;
  }
  .ml-duo img:hover { filter: grayscale(0%) contrast(1); }

  .ml-rsvp-box {
    border: 1px solid rgba(100,100,170,0.2); border-radius: 20px;
    padding: 4rem; margin-top: 3rem; background: rgba(100,100,170,0.03);
  }
  .ml-btn {
    display: inline-block; background: linear-gradient(135deg, #6666aa, #8888dd);
    color: #fff; padding: 1rem 3.5rem; border-radius: 8px; font-weight: 500;
    border: none; cursor: pointer; font-size: 0.85rem; letter-spacing: 0.15em;
    text-transform: uppercase; transition: transform 0.3s, box-shadow 0.3s;
  }
  .ml-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(102,102,170,0.3); }
  .ml-footer { text-align: center; padding: 3rem; color: rgba(255,255,255,0.15); font-size: 0.7rem; letter-spacing: 0.15em; }

  @media (max-width: 768px) {
    .ml-names { font-size: 3.5rem; }
    .ml-amp { font-size: 2rem; }
    .ml-heading { font-size: 1.8rem; }
    .ml-features { grid-template-columns: 1fr; }
    .ml-feat { padding: 2rem 1.5rem; }
    .ml-duo { grid-template-columns: 1fr; }
    .ml-section { padding: 3rem 1.5rem; }
    .ml-rsvp-box { padding: 2.5rem 1.5rem; }
  }
</style>

<section class="ml-hero">
  <div class="ml-stars"></div>
  <div style="position:relative;z-index:2;">
    <p class="ml-mono">An Evening Under the Stars</p>
    <h1 class="ml-names">Rohan <span class="ml-amp">&</span> Ananya</h1>
    <div class="ml-line"></div>
    <p class="ml-date">New Year's Eve • December 31, 2026</p>
  </div>
</section>

<section class="ml-section">
  <h2 class="ml-heading">The Occasion</h2>
  <p class="ml-subtext">As the year draws to a close and a new dawn begins, we invite you to witness the union of two souls under the midnight sky. An evening of elegance, love, and unforgettable memories.</p>
  <div class="ml-features">
    <div class="ml-feat"><div class="icon">✦</div><h4>Black Tie</h4><p>Formal evening attire<br/>Navy, Silver, Black</p></div>
    <div class="ml-feat"><div class="icon">🥂</div><h4>Midnight Toast</h4><p>Ring in the new year<br/>with champagne & vows</p></div>
    <div class="ml-feat"><div class="icon">🌃</div><h4>Rooftop Venue</h4><p>The Sky Lounge<br/>Connaught Place, Delhi</p></div>
  </div>
</section>

<section class="ml-section">
  <h2 class="ml-heading">Our Moments</h2>
  <div class="ml-duo">
    <img src="https://picsum.photos/seed/ml1/500/660" alt="Moment 1" />
    <img src="https://picsum.photos/seed/ml2/500/660" alt="Moment 2" />
  </div>
</section>

<section class="ml-section">
  <div class="ml-rsvp-box">
    <h2 class="ml-heading">Reserve Your Place</h2>
    <p class="ml-subtext" style="margin-bottom:2rem;">Seating is intimate and limited. Please respond by December 15th, 2026.</p>
    <button class="ml-btn">RSVP</button>
  </div>
</section>

<footer class="ml-footer">Designed by Desi Digital Prints</footer>
`;
