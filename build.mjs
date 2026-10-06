#!/usr/bin/env node
/** Static site generator for Hibachi King — hibachikingusa.com */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://www.hibachikingusa.com";
const BRAND = "Hibachi King";
const PHONE_DISP = "(929) 992-9932";
const PHONE_TEL = "+19299929932";
const EMAIL = "Hibachikingus@gmail.com";
const INSTAGRAM = "https://www.instagram.com/king.hibachi";
const OWNER = "29227301";
const LOGO = "/media/logo-mark.webp";
const FAVICON = "/media/favicon.png";
const HERO = "/media/gallery/party-1.webp";
const TODAY = "2026-10-05";

const GALLERY = [
  ["party-1.webp", "Backyard hibachi table set for a Hibachi King party"],
  ["party-2.webp", "Hibachi King chef cooking at a private home party"],
  ["party-3.webp", "Guests seated for at-home hibachi catering"],
  ["party-4.webp", "Hibachi grill setup in a backyard"],
  ["party-5.webp", "Private hibachi dinner with fried rice and proteins"],
  ["party-6.webp", "Nighttime backyard hibachi celebration"],
];

const CITIES = [
  {
    id: "austin",
    name: "Austin",
    state: "Texas",
    abbr: "TX",
    slug: "austin-hibachi-at-home",
    booking: "austin-tx",
    appointmentType: null,
    image: "/media/gallery/party-1.webp",
    geo: { region: "US-TX", place: "Austin, Texas", lat: "30.2672", lng: "-97.7431" },
    areas: ["Downtown Austin", "South Congress", "The Domain", "Round Rock", "Cedar Park", "Westlake", "Lakeway", "Bee Cave"],
    lead: "Outdoor hibachi in Austin backyards, with a private chef, grill, and live teppanyaki show.",
    body: [
      "Outdoor hibachi in Austin is one of Hibachi King's home markets. We cook at houses, patios, and rental gatherings from South Congress and Downtown to The Domain, Round Rock, Cedar Park, Westlake, and Lakeway. You provide tables, chairs, plates, and utensils. The chef brings the hibachi grill, fresh food, and the show.",
      "Each guest gets a side salad, hibachi vegetables, fried rice, and two proteins — chicken, steak, shrimp, salmon, or tofu — with upgrades for scallops, filet mignon, and lobster tail. It is a fit for birthdays, graduations, bachelor and bachelorette weekends, and casual Friday parties when you want a steakhouse night without a restaurant reservation.",
    ],
  },
  {
    id: "dallas",
    name: "Dallas",
    state: "Texas",
    abbr: "TX",
    slug: "dallas-hibachi-at-home",
    booking: "dallas-tx",
    appointmentType: null,
    image: "/media/gallery/party-2.webp",
    geo: { region: "US-TX", place: "Dallas, Texas", lat: "32.7767", lng: "-96.7970" },
    areas: ["Uptown", "Highland Park", "Preston Hollow", "Plano", "Frisco", "Richardson", "Las Colinas", "Allen"],
    lead: "Outdoor hibachi for Dallas, Plano, Frisco, and nearby backyard parties.",
    body: [
      "Outdoor hibachi in Dallas means the chef and grill come to you. Hibachi King cooks for Uptown lofts with a terrace, Highland Park and Preston Hollow backyards, and larger parties in Plano, Frisco, Richardson, Allen, and Las Colinas. The host sets the table. We handle the food and the fire.",
      "Parties of 30 or more adults need two chefs so every seat is served while the show stays tight. Pricing starts at $50 per adult and $25 per child 12 and under, with a $500 minimum. Gratuity is not included, and the final price can vary by the exact address.",
    ],
  },
  {
    id: "fort-worth",
    name: "Fort Worth",
    state: "Texas",
    abbr: "TX",
    slug: "fort-worth-hibachi-at-home",
    booking: "fort-worth-tx",
    appointmentType: null,
    image: "/media/gallery/party-3.webp",
    geo: { region: "US-TX", place: "Fort Worth, Texas", lat: "32.7555", lng: "-97.3308" },
    areas: ["Cultural District", "TCU", "Southlake", "Keller", "Alliance", "Westover Hills"],
    lead: "Outdoor hibachi in Fort Worth, at the house, on a patio, or for a private party.",
    body: [
      "Outdoor hibachi in Fort Worth uses the same Hibachi King setup as Dallas and Austin: a licensed, insured chef, a mobile hibachi grill, and a full plate of salad, vegetables, fried rice, and two proteins. We cook outdoors — backyard, balcony, terrace, or under an awning — even when guests eat inside.",
      "Families around the Cultural District, TCU, Southlake, Keller, Alliance, and Westover Hills use the party for birthdays and weekend dinners. Tell us the address when you book so we can confirm timing and whether a travel adjustment applies.",
    ],
  },
  {
    id: "houston",
    name: "Houston",
    state: "Texas",
    abbr: "TX",
    slug: "houston-hibachi-at-home",
    booking: "houston-tx",
    appointmentType: null,
    image: "/media/gallery/party-4.webp",
    geo: { region: "US-TX", place: "Houston, Texas", lat: "29.7604", lng: "-95.3698" },
    areas: ["River Oaks", "The Heights", "Memorial", "Montrose", "Katy", "Sugar Land", "The Woodlands"],
    lead: "Outdoor hibachi in Houston, from the Heights to Katy, Sugar Land, and The Woodlands.",
    body: [
      "Outdoor hibachi in Houston is private catering at the house. The chef cooks on-site in River Oaks, The Heights, Memorial, and Montrose, and travels for parties in Katy, Sugar Land, and The Woodlands when the date is open. You skip the restaurant wait and keep the guest list private.",
      "The meal is built per person: two proteins, salad, hibachi vegetables, and fried rice. Add noodles, gyoza, edamame, or a third protein if the table wants more. Vegetarian guests can take tofu at the same per-person price, with extra vegetables, salad, and rice.",
    ],
  },
  {
    id: "new-york",
    name: "New York",
    state: "New York",
    abbr: "NY",
    slug: "new-york-hibachi-at-home",
    booking: "new-york",
    appointmentType: "50273299",
    image: "/media/gallery/party-5.webp",
    geo: { region: "US-NY", place: "New York", lat: "40.7128", lng: "-74.0060" },
    areas: ["Private homes", "Backyards", "Terraces", "Patios"],
    lead: "Outdoor hibachi for New York homes, backyards, and terraces.",
    body: [
      "Outdoor hibachi in New York is a chef at the home, not a restaurant table. The chef arrives with the grill and ingredients, sets up outside, and performs the teppanyaki show while guests eat at tables you provide. Indoor dining is fine — the cooking stays outdoors, on a balcony, terrace, or under cover.",
      "Book the New York calendar for your date. After you reserve, watch for the confirmation email. Our team contacts you about six days before the party. Call or text (929) 992-9932 if the headcount or protein list changes.",
    ],
  },
  {
    id: "new-jersey",
    name: "New Jersey",
    state: "New Jersey",
    abbr: "NJ",
    slug: "new-jersey-hibachi-at-home",
    booking: "new-jersey",
    appointmentType: "50273318",
    image: "/media/gallery/party-6.webp",
    geo: { region: "US-NJ", place: "New Jersey", lat: "40.7357", lng: "-74.1724" },
    areas: ["North Jersey", "Central Jersey", "Backyard parties"],
    lead: "Outdoor hibachi in New Jersey, with a private chef and grill in the backyard.",
    body: [
      "Outdoor hibachi in New Jersey is a backyard party, not a restaurant reservation. Hibachi King sends a chef with a grill, salad, vegetables, fried rice, and two protein choices per guest. You set out tables, chairs, plates, and utensils.",
      "We cover North Jersey and Central Jersey parties and confirm the town from your address before the event. The base rate is $50 per person, $25 for children 12 and under, and a $500 minimum. Suggested gratuity is 20% and is not included in the menu price.",
    ],
  },
  {
    id: "pennsylvania",
    name: "Pennsylvania",
    state: "Pennsylvania",
    abbr: "PA",
    slug: "pennsylvania-hibachi-at-home",
    booking: "pennsylvania",
    appointmentType: null,
    image: "/media/gallery/party-1.webp",
    geo: { region: "US-PA", place: "Pennsylvania", lat: "39.9526", lng: "-75.1652" },
    areas: ["Philadelphia", "Nearby Pennsylvania suburbs"],
    lead: "Outdoor hibachi in Pennsylvania, including Philadelphia-area parties at home.",
    body: [
      "Outdoor hibachi in Pennsylvania brings the grill to the house, with many parties around Philadelphia and nearby suburbs. Availability and any location adjustment depend on the street address, so book the date and include where the party will be.",
      "Guests choose two proteins. Chicken, steak, shrimp, salmon, and tofu are in the base price. Scallops and filet mignon are +$5, and lobster tail is +$15. Noodles are +$4. The chef does not cook with nuts or sesame, and gluten-free soy and teriyaki are available if you tell us ahead of time.",
    ],
  },
  {
    id: "miami",
    name: "Miami",
    state: "Florida",
    abbr: "FL",
    slug: "miami-hibachi-at-home",
    booking: "miami-fl",
    appointmentType: "53138468",
    image: "/media/gallery/party-2.webp",
    geo: { region: "US-FL", place: "Miami, Florida", lat: "25.7617", lng: "-80.1918" },
    areas: ["Brickell", "Coral Gables", "Miami Beach", "Doral", "Aventura", "Kendall"],
    lead: "Outdoor hibachi in Miami for backyard, patio, and vacation-rental parties.",
    body: [
      "Outdoor hibachi in Miami comes to the house. Hibachi King cooks in Brickell, Coral Gables, Miami Beach, Doral, Aventura, Kendall, and nearby neighborhoods when the date is open. The show works on a patio or by the pool as long as the chef has a safe outdoor spot for the grill.",
      "Use the Miami booking calendar to hold the date. Each person gets salad, hibachi vegetables, fried rice, and two proteins. Parties of 30 or more adults are scheduled with two chefs. Payment is cash on the day of the event — no deposit.",
    ],
  },
  {
    id: "orlando",
    name: "Orlando",
    state: "Florida",
    abbr: "FL",
    slug: "orlando-hibachi-at-home",
    booking: "orlando-fl",
    appointmentType: null,
    image: "/media/gallery/party-3.webp",
    geo: { region: "US-FL", place: "Orlando, Florida", lat: "28.5383", lng: "-81.3792" },
    areas: ["Dr. Phillips", "Winter Park", "Lake Nona", "Kissimmee", "Vacation rentals"],
    lead: "Outdoor hibachi in Orlando for home parties and vacation-rental dinners.",
    body: [
      "Outdoor hibachi in Orlando is for the house or a vacation rental instead of a crowded restaurant. Hibachi King cooks for groups who want the chef on site. We cook for family reunions, birthday weekends, and trip celebrations around Dr. Phillips, Winter Park, Lake Nona, and Kissimmee.",
      "The chef brings the grill and the food. You provide the tables and place settings. Tell us about allergies when you book. The menu has no nuts or sesame, tofu is available for vegetarian and vegan guests at the same rate, and gluten-free sauces can be packed for the party.",
    ],
  },
  {
    id: "phoenix",
    name: "Phoenix",
    state: "Arizona",
    abbr: "AZ",
    slug: "phoenix-hibachi-at-home",
    booking: "phoenix-az",
    appointmentType: null,
    image: "/media/gallery/party-4.webp",
    geo: { region: "US-AZ", place: "Phoenix, Arizona", lat: "33.4484", lng: "-112.0740" },
    areas: ["Arcadia", "Biltmore", "Tempe", "Chandler", "Gilbert", "East Valley patios"],
    lead: "Outdoor hibachi in Phoenix, with a private chef on the patio at your home.",
    body: [
      "Outdoor hibachi in Phoenix is built for patios. Hibachi King sets the grill outside at houses in Arcadia, the Biltmore area, Tempe, Chandler, Gilbert, and other East Valley spots we can confirm from your address. Guests stay in the yard for the flames, the knife work, and a plated hibachi dinner.",
      "The base menu is $50 per adult and $25 per child 12 and under, with a $500 minimum for every party. Gratuity is separate — 20% is the suggestion — and the price can change with location. Text (929) 992-9932 if you want a headcount checked before you book.",
    ],
  },
];

const STATES = [
  { slug: "texas", name: "Texas", abbr: "TX", ids: ["austin", "dallas", "fort-worth", "houston"], blurb: "Outdoor hibachi in Texas, with regular dates in Austin, Dallas, Fort Worth, and Houston. Pick your city for neighborhoods, pricing, and the booking calendar." },
  { slug: "florida", name: "Florida", abbr: "FL", ids: ["miami", "orlando"], blurb: "Outdoor hibachi in Florida is available in Miami and Orlando, including backyard parties and vacation rentals." },
  { slug: "new-york", name: "New York", abbr: "NY", ids: ["new-york"], blurb: "Outdoor hibachi in New York for a home, backyard, or terrace. The chef cooks outside and brings the grill, food, and show." },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ", ids: ["new-jersey"], blurb: "Outdoor hibachi in New Jersey for North Jersey and Central Jersey backyard parties. We confirm the town from your event address." },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", ids: ["pennsylvania"], blurb: "Outdoor hibachi in Pennsylvania, including Philadelphia-area parties at home. Availability is confirmed from the party address." },
  { slug: "arizona", name: "Arizona", abbr: "AZ", ids: ["phoenix"], blurb: "Outdoor hibachi in Arizona is centered on Phoenix patios and nearby East Valley parties." },
];

const FAQS = [
  ["How much does Hibachi King cost?", "The base price is $50 per person and $25 per child 12 and under, with a $500 minimum for every party. Each guest gets a salad, hibachi vegetables, fried rice, and two proteins. Gratuity is not included. Suggested gratuity is 20%. Price may vary by location."],
  ["What do guests eat?", "Two proteins per person: chicken, steak, shrimp, salmon, or tofu. Scallops and filet mignon are +$5. Lobster tail is +$15. The plate includes salad, fried rice, and vegetables. Noodles are +$4. Side proteins are extra, and appetizers are edamame ($5) and gyoza ($10)."],
  ["Do you set up tables and chairs?", "No. We bring the chef, the hibachi grill, the food, and the show. You provide tables, chairs, plates, and utensils."],
  ["What is outdoor hibachi?", "Outdoor hibachi is a private chef cooking on a hibachi grill at your home. The grill stays outside, in the backyard, on a balcony or terrace, or under an awning. Guests can eat outside or inside. Hibachi King brings the grill, the food, and the show. You provide tables, chairs, plates, and utensils."],
  ["Do you cook inside?", "The chef cooks outdoors: backyard, balcony, terrace, or under an awning. Guests can eat inside while the grill stays outside. We are licensed and insured."],
  ["When does the chef arrive?", "The chef arrives at the reservation time. Setup usually takes only a few minutes."],
  ["How do I book?", "Book on this website. After you reserve, check email for the confirmation. Customer support contacts you about six days before the party. Questions: call or text (929) 992-9932."],
  ["How do I pay?", "Cash only. There is no deposit. The full payment is due the day of the event."],
  ["What if we have 30 or more adults?", "Parties of 30 or more adult guests require two chefs."],
  ["Do you cook with nuts or sesame?", "No. The food does not contain nuts or sesame. Tell us about any other allergy when you book."],
  ["Is there a gluten-free option?", "Yes. The chef can bring gluten-free soy sauce and gluten-free teriyaki. Mention it when you book."],
  ["Can you cook for vegetarian guests?", "Yes. Tofu replaces meat at the same per-person price, with extra vegetables, salad, and fried rice as needed."],
];

const cityById = Object.fromEntries(CITIES.map((c) => [c.id, c]));

function scheduleUrl(type) {
  const base = `https://app.squarespacescheduling.com/schedule.php?owner=${OWNER}`;
  return type ? `${base}&appointmentType=${type}` : base;
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const IG = `<a class="social-link social-link-nav" href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>`;

const NAV = [
  ["Locations", "/service-area/"],
  ["Menu", "/menu/"],
  ["Estimate", "/estimation/"],
  ["Book", "/book-online/"],
  ["FAQ", "/faq/"],
  ["Gallery", "/gallery/"],
  ["Contact", "/contact/"],
];

function nav(activePath) {
  const links = NAV.map(([label, href]) => {
    const on = activePath === href ? ' aria-current="page"' : "";
    return `<li><a href="${href}"${on}>${label}</a></li>`;
  }).join("");
  return `<header class="site-header">
  <div class="header-inner">
    <a href="/" class="brand" aria-label="Hibachi King home"><img src="${LOGO}" alt="" width="48" height="58"><span class="brand-name">Hibachi King<small>At your table</small></span></a>
    <ul class="nav-links">${links}</ul>
    <a class="header-phone" href="tel:${PHONE_TEL}">${PHONE_DISP}</a>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span></button>
  </div>
</header>`;
}

function footer() {
  const cityLinks = CITIES.map((c) => `<li><a href="/${c.slug}/">${esc(c.name)}</a></li>`).join("");
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <h2>Hibachi King</h2>
      <p>A private chef, a grill, and dinner in the yard. Austin and Dallas first, then nine more cities.</p>
      <a href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">Instagram</a>
    </div>
    <div><h2>Visit</h2><ul>
      <li><a href="/menu/">Menu</a></li>
      <li><a href="/estimation/">Estimate</a></li>
      <li><a href="/service-area/">Cities</a></li>
      <li><a href="/gallery/">Photos</a></li>
      <li><a href="/about/">About</a></li>
      <li><a href="/faq/">FAQ</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul></div>
    <div><h2>Cities</h2><ul>${cityLinks}</ul></div>
    <div><h2>Book</h2><ul>
      <li><a href="tel:${PHONE_TEL}">${PHONE_DISP}</a></li>
      <li><a href="sms:${PHONE_TEL}">Text the kitchen</a></li>
      <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
      <li><a href="/book-online/">Reserve a date</a></li>
    </ul></div>
  </div>
  <div class="wrap legal">© ${new Date().getFullYear()} Hibachi King</div>
</footer>`;
}

function businessNode() {
  return {
    "@type": "FoodEstablishment",
    "@id": `${SITE}/#business`,
    name: BRAND,
    url: `${SITE}/`,
    telephone: "+1-929-992-9932",
    email: EMAIL,
    image: `${SITE}${LOGO}`,
    priceRange: "$$",
    servesCuisine: ["Hibachi", "Japanese", "Teppanyaki"],
    description: "Outdoor hibachi catering. A private chef brings the grill and cooks at your home.",
    paymentAccepted: "Cash",
    currenciesAccepted: "USD",
    areaServed: CITIES.map((c) => ({ "@type": "City", name: `${c.name}, ${c.abbr}` })),
    sameAs: [INSTAGRAM],
    hasMenu: `${SITE}/menu/`,
  };
}

function head({ title, description, path, image = HERO, extraLd = [], robots = "index, follow", geo, preload = false }) {
  const url = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  const graph = [businessNode(), { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description }, ...extraLd];
  const geoTags = geo
    ? `<meta name="geo.region" content="${esc(geo.region)}">
  <meta name="geo.placename" content="${esc(geo.place)}">
  <meta name="geo.position" content="${geo.lat};${geo.lng}">
  <meta name="ICBM" content="${geo.lat}, ${geo.lng}">`
    : "";
  const preloadTag = preload ? `<link rel="preload" as="image" href="${HERO}" fetchpriority="high">` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${robots}">
  <meta name="author" content="${BRAND}">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="${FAVICON}" type="image/png">
  <link rel="apple-touch-icon" href="${FAVICON}">
  <meta name="theme-color" content="#fffbf5">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}${image}">
  <meta property="og:site_name" content="${BRAND}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE}${image}">
  ${geoTags}
  ${preloadTag}
  <link rel="stylesheet" href="/fonts.css">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">${jsonLd({ "@context": "https://schema.org", "@graph": graph })}</script>
</head>`;
}

function crumbs(items) {
  const html = items.map((item, i) => {
    if (i === items.length - 1) return `<span>${esc(item.name)}</span>`;
    return `<a href="${item.path}">${esc(item.name)}</a><span>›</span>`;
  }).join("");
  const ld = {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE}/` : `${SITE}${item.path}`,
    })),
  };
  return { html: `<nav class="crumb" aria-label="Breadcrumb">${html}</nav>`, ld };
}

function shell({ title, description, path, main, image, extraLd, robots, geo, preload = false }) {
  return `${head({ title, description, path, image, extraLd, robots, geo, preload })}
<body>
<div class="scroll-line" aria-hidden="true"></div>
${nav(path)}
${main}
${footer()}
<div class="lightbox" id="lightbox"><button class="lightbox-close" aria-label="Close">×</button><img alt=""></div>
<script src="/script.js"></script>
</body>
</html>`;
}

function placeIndex(list) {
  return `<ul class="place-index">${list.map((c) => `<li><a href="/${c.slug}/"><span class="name">${esc(c.name)}</span><span class="meta">${esc(c.abbr)} · ${esc(c.lead)}</span><span class="go">Read</span></a></li>`).join("")}</ul>`;
}

function stateCards() {
  return `<div class="state-grid">${STATES.map((s) => {
    const cities = s.ids.map((id) => cityById[id]);
    const names = cities.map((c) => `<a href="/${c.slug}/">${esc(c.name)}</a>`).join('<span aria-hidden="true"> · </span>');
    return `<article class="state-card">
      <p class="eyebrow">${esc(s.abbr)}</p>
      <h2>${esc(s.name)}</h2>
      <p class="state-cities">${names}</p>
      <a class="btn" href="/${s.slug}/">Book in ${esc(s.name)}</a>
    </article>`;
  }).join("")}</div>
  <p class="note">Don't see your city? Call <a href="tel:${PHONE_TEL}">${PHONE_DISP}</a> or <a href="/contact/">send the address</a>.</p>`;
}

function cityCards(cities) {
  return `<div class="state-grid">${cities.map((c) => `<article class="state-card">
      <h2><a href="/${c.slug}/">${esc(c.name)}</a></h2>
      <p class="state-cities">${c.areas.slice(0, 6).map((a) => esc(a)).join(" · ")}</p>
      <a class="btn" href="/booking/${c.booking}/">Book ${esc(c.name)}</a>
    </article>`).join("")}</div>`;
}

function faqList(items) {
  return `<div class="faq">${items.map(([q, a]) => `<div class="faq-item">
        <button type="button" class="faq-q" aria-expanded="false"><span>${esc(q)}</span><span>+</span></button>
        <div class="faq-a"><p>${esc(a)}</p></div>
      </div>`).join("")}</div>`;
}

function faqLd(items) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function pageIntro(crumbHtml, kicker, titleHtml, desc) {
  return `<header class="page-intro"><div class="wrap">
    ${crumbHtml}
    <p class="eyebrow">${kicker}</p>
    <h1>${titleHtml}</h1>
    <p class="lede">${desc}</p>
  </div></header>`;
}

function pricingBoard() {
  return `<div class="board">
    <div class="board-intro"><p class="eyebrow">The check</p><h2>$50 a person</h2><p>$25 for children 12 and under. $500 minimum. Gratuity is separate, and 20% is the suggestion. The price can change with the address.</p></div>
    <dl class="board-list">
      <div class="board-row"><dt>Two proteins, salad, rice, vegetables</dt><dd>Included</dd></div>
      <div class="board-row"><dt>Scallops or filet mignon</dt><dd>+$5</dd></div>
      <div class="board-row"><dt>Lobster tail</dt><dd>+$15</dd></div>
      <div class="board-row"><dt>Noodles</dt><dd>+$4</dd></div>
      <div class="board-row"><dt>30 or more adults</dt><dd>Two chefs</dd></div>
    </dl>
  </div>`;
}

const POSTS = [
  {
    slug: "outdoor-hibachi-catering",
    kicker: "Catering",
    h1: "Outdoor hibachi catering",
    title: "Outdoor Hibachi Catering | What the Chef Brings | Hibachi King",
    description: "Outdoor hibachi catering brings a private chef, grill, food, and show to your home. $50 per person, $25 for kids, $500 minimum.",
    dek: "A private chef, a grill, and dinner in the yard. Here is what the visit includes.",
    blocks: [
      { p: ["Outdoor hibachi catering is a chef cooking at your house, not a table at a steakhouse. Hibachi King carries the grill, the ingredients, and the teppanyaki show. You keep the guest list and set the table."] },
      { h2: "What the chef brings", p: ["The visit includes a mobile hibachi grill, salad, hibachi vegetables, fried rice, and two proteins per guest. Chicken, steak, shrimp, salmon, and tofu are in the base price. Scallops and filet mignon are +$5. Lobster tail is +$15. Noodles are +$4."] },
      { h2: "Where it can be cooked", p: ["The grill stays outside: backyard, balcony, terrace, or under an awning. Guests can eat outside with the show or sit inside while the chef cooks out. The team is licensed and insured."] },
      { h2: "Where Hibachi King cooks", p: ["Outdoor hibachi catering is booked in Austin, Dallas, Fort Worth, Houston, New York, New Jersey, Pennsylvania, Miami, Orlando, and Phoenix. Pick the city page for neighborhoods, then hold the date on that city's calendar."] },
    ],
  },
  {
    slug: "outdoor-hibachi-party",
    kicker: "Parties",
    h1: "Planning an outdoor hibachi party",
    title: "Outdoor Hibachi Party Planning | Guest Count & Setup | Hibachi King",
    description: "How to plan an outdoor hibachi party: guest count, two chefs at 30 adults, tables the host provides, and what to tell the kitchen.",
    dek: "Headcount, the outdoor spot for the grill, and what the host still sets up.",
    blocks: [
      { p: ["An outdoor hibachi party works when the grill has a safe spot and the host already has tables. Hibachi King does not bring chairs, plates, or utensils. Those stay with the house."] },
      { h2: "How many guests", p: ["Price the party at $50 per adult and $25 per child 12 and under, with a $500 minimum. At 30 adults or more, schedule two chefs so the show and the plates stay on time."] },
      { h2: "What to send before the date", p: ["The address, the headcount, protein choices, and any allergy. The food has no nuts or sesame. Gluten-free soy and teriyaki can be packed if you say so when you book. Tofu is the vegetarian and vegan plate, at the same per-person price."] },
      { h2: "The day of", p: ["The chef arrives at the reservation time. Setup usually takes a few minutes. Payment is cash that day. There is no deposit. Gratuity is not included; 20% is the suggestion."] },
    ],
  },
  {
    slug: "outdoor-hibachi-birthday",
    kicker: "Birthdays",
    h1: "An outdoor hibachi birthday",
    title: "Outdoor Hibachi Birthday Party | Hibachi King",
    description: "An outdoor hibachi birthday puts the chef and the grill in the yard. Same menu for every guest, $50 per person, $500 minimum.",
    dek: "A birthday in the yard, with the flames and the full plate, without a restaurant wait.",
    blocks: [
      { p: ["An outdoor hibachi birthday is the same service as any other party: one chef, one grill, and the same plate for every guest. The difference is the reason people are in the yard."] },
      { h2: "What guests eat", p: ["Each person picks two proteins from chicken, steak, shrimp, salmon, and tofu. The plate also has salad, hibachi vegetables, and fried rice. Add gyoza ($10) or edamame ($5) if you want something before the grill starts."] },
      { h2: "Kids", p: ["Children 12 and under are $25 and eat the same menu. The $500 minimum still applies to the party, so a small kids' table does not replace it."] },
      { h2: "Keep the list private", p: ["You choose who comes. The chef cooks outside and leaves the seating plan to you. Book the city, then send the birthday headcount if it changes. Support usually checks in about six days before the party."] },
    ],
  },
  {
    slug: "outdoor-hibachi-cost",
    kicker: "Pricing",
    h1: "What outdoor hibachi costs",
    title: "Outdoor Hibachi Cost | $50 per Person | Hibachi King",
    description: "Outdoor hibachi cost: $50 per person, $25 for kids 12 and under, $500 minimum. Gratuity is extra. Cash on the day.",
    dek: "The base price, the upgrades, and what is not on the check.",
    blocks: [
      { p: ["The outdoor hibachi cost starts at $50 per person and $25 per child 12 and under. Every party has a $500 minimum, even when the headcount is small."] },
      { h2: "Included", p: ["Two proteins, salad, fried rice, hibachi vegetables, the grill, and the live show. The chef brings those. Tables, chairs, plates, and utensils are not included."] },
      { h2: "Extras", p: ["Scallops +$5, filet mignon +$5, lobster tail +$15. A side of fried rice or noodles is +$4. An extra protein is +$10, a filet side is +$15, and a lobster side is +$20. Edamame is $5 and gyoza is $10."] },
      { h2: "Not included", p: ["Gratuity is not included. The suggestion is 20%. The price can change with the address. Payment is cash on the day of the party, with no deposit. Use the estimate page for a headcount, then book the city to hold the date."] },
    ],
  },
  {
    slug: "outdoor-hibachi-vs-restaurant",
    kicker: "At home",
    h1: "Outdoor hibachi instead of a restaurant",
    title: "Outdoor Hibachi vs a Restaurant | Hibachi King",
    description: "Outdoor hibachi at home skips the restaurant wait. The chef cooks outside at your house and you keep the guest list.",
    dek: "Same kind of show, at the address you already have.",
    blocks: [
      { p: ["A restaurant hibachi table is a shared room and a fixed seating time. Outdoor hibachi moves that cooking to your yard, patio, or terrace, and the only guests are the ones you invited."] },
      { h2: "What stays the same", p: ["The plate is still salad, vegetables, fried rice, and two proteins, with a chef cooking in front of the group. Upgrades such as filet and lobster are available if you want them."] },
      { h2: "What changes", p: ["You provide the furniture and the place settings. The chef does not take over the dining room: the grill stays outdoors. People can eat inside while the cooking stays outside, which helps in rain under an awning or on a small New York terrace."] },
      { h2: "When it is the better fit", p: ["Birthdays, graduations, and weekends where the group is already at one house. If you want a private room downtown, this is a different product. If you want the chef at the address on the invitation, book outdoor hibachi in your city."] },
    ],
  },
  {
    slug: "outdoor-hibachi-setup",
    kicker: "Setup",
    h1: "Outdoor hibachi setup at the house",
    title: "Outdoor Hibachi Setup | Grill, Terrace, Awning | Hibachi King",
    description: "Outdoor hibachi setup: the chef cooks on a backyard, balcony, terrace, or under an awning. The host sets tables, chairs, plates, and utensils.",
    dek: "Where the grill can go, and what you still need to put out.",
    blocks: [
      { p: ["Outdoor hibachi setup is short. The chef arrives at the reservation time with the grill and the food. Most of the wait is the few minutes it takes to place the grill, not a restaurant turn."] },
      { h2: "A safe spot for the grill", p: ["Backyard, balcony, terrace, or under an awning all work when the chef can cook outside. The grill does not come indoors. Tell us about low cover, tight gates, or a terrace with limited floor space when you book."] },
      { h2: "The host's side", p: ["Tables, chairs, plates, and utensils stay with you. If guests will eat inside, set that table too. The show can stay at the grill while plates move in."] },
      { h2: "Allergies and the menu", p: ["Say so before the day. There are no nuts or sesame in the food. Gluten-free soy and teriyaki are available. Tofu stands in for meat at the same price, with extra vegetables, salad, and fried rice as needed."] },
    ],
  },
];

function blogCards(list) {
  return `<div class="blog-list">${list.map((post) => `<article class="blog-card">
      <p class="eyebrow">${esc(post.kicker)}</p>
      <h2><a href="/blog/${post.slug}/">${esc(post.h1)}</a></h2>
      <p>${esc(post.dek)}</p>
    </article>`).join("")}</div>`;
}

function blogIndex() {
  const title = "Outdoor Hibachi Blog | Hibachi King";
  const description = "Notes on outdoor hibachi catering, party planning, birthdays, cost, and setup at home.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }]);
  const main = `${pageIntro(crumb.html, "Blog", "Outdoor hibachi notes", "Catering, parties, birthdays, cost, and how the grill is set up.")}
<section class="band"><div class="wrap">${blogCards(POSTS)}</div></section>`;
  return shell({ title, description, path: "/blog/", extraLd: [crumb.ld], main });
}

function blogPost(post) {
  const pathName = `/blog/${post.slug}/`;
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: post.h1, path: pathName }]);
  const body = post.blocks.map((block) => `${block.h2 ? `<h2>${esc(block.h2)}</h2>` : ""}${block.p.map((p) => `<p>${esc(p)}</p>`).join("")}`).join("");
  const more = POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);
  const main = `${pageIntro(crumb.html, post.kicker, esc(post.h1), esc(post.dek))}
<section class="band" style="padding-top:1rem"><div class="wrap article-layout">
  <article class="prose">
    ${body}
    <p>See the <a href="/menu/">outdoor hibachi menu</a>, the <a href="/service-area/">cities</a>, or <a href="/book-online/">book a date</a>.</p>
  </article>
  <aside class="book-panel">
    <p class="eyebrow">Book</p>
    <div class="amount">$50</div>
    <p>Per person. Kids 12 and under are $25. Every outdoor hibachi party has a $500 minimum.</p>
    <a class="btn" href="/book-online/">Reserve a date</a>
    <a class="btn btn-line" href="/estimation/">Estimate the party</a>
  </aside>
</div></section>
<section class="band"><div class="wrap">
  <div class="band-head"><h2>More notes</h2><a href="/blog/">All posts</a></div>
  ${blogCards(more)}
</div></section>`;
  return shell({
    title: post.title,
    description: post.description,
    path: pathName,
    extraLd: [crumb.ld, {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: TODAY,
      dateModified: TODAY,
      author: { "@type": "Organization", name: BRAND, url: `${SITE}/` },
      publisher: { "@id": `${SITE}/#business` },
      image: `${SITE}${HERO}`,
      mainEntityOfPage: `${SITE}${pathName}`,
    }],
    main,
  });
}

function homePage() {
  const title = "Outdoor Hibachi at Home | Private Chef | Hibachi King";
  const description = "Outdoor hibachi at your home. Hibachi King brings a private chef and grill to backyards in Austin, Dallas, Houston, New York, New Jersey, Miami, Orlando, Phoenix, and more. $50 per person, $25 for kids, $500 minimum.";
  const homeFaqs = FAQS.slice(0, 7);
  const main = `<section class="stage">
  <div class="wrap stage-grid">
    <div class="stage-inner">
      <p class="eyebrow">Outdoor hibachi · private chef</p>
      <h1>Outdoor hibachi, <em>your backyard</em></h1>
      <p class="lede">Hibachi King cooks at the house. The chef carries the grill, the food, and the show. You set the table. Austin and Dallas are home, with parties in Fort Worth, Houston, New York, New Jersey, Pennsylvania, Miami, Orlando, and Phoenix.</p>
      <div class="actions">
        <a class="btn" href="/book-online/">Reserve a date</a>
        <a class="btn btn-line" href="/menu/">Read the menu</a>
      </div>
      <ul class="facts">
        <li><b>10</b><span>Cities</span></li>
        <li><b>$50</b><span>Per person</span></li>
        <li><b>$25</b><span>Age 12 and under</span></li>
        <li><b>$500</b><span>Party minimum</span></li>
      </ul>
    </div>
    <figure class="stage-figure">
      <img class="stage-photo" src="${HERO}" alt="A Hibachi King table set in a backyard at night" width="1702" height="1276" fetchpriority="high">
    </figure>
  </div>
</section>
<section class="band" id="evening"><div class="wrap">
  <div class="band-head"><h2>How the evening goes</h2><p>Four steps. You are not cooking.</p></div>
  <div class="evening">
    <ol class="timeline">
      <li><span class="num">01</span><h3>Hold the date</h3><p>Pick the city and reserve. A confirmation email follows.</p></li>
      <li><span class="num">02</span><h3>The grill arrives</h3><p>The chef is there at the reservation time. Setup takes a few minutes.</p></li>
      <li><span class="num">03</span><h3>You set the table</h3><p>Tables, chairs, plates, and utensils stay with the host.</p></li>
      <li><span class="num">04</span><h3>Dinner and a show</h3><p>Two proteins, salad, vegetables, and fried rice. Thirty adults or more means two chefs.</p></li>
    </ol>
    <figure class="side-photo"><img src="/media/gallery/party-3.webp" alt="Guests at a Hibachi King backyard table" width="1200" height="900" loading="lazy"></figure>
  </div>
</div></section>
<section class="reel" aria-label="Party photos">
  <a href="/gallery/"><img src="/media/gallery/party-2.webp" alt="Chef cooking hibachi at a private home" width="1200" height="800" loading="lazy"><span>The grill</span></a>
  <a href="/gallery/"><img src="/media/gallery/party-4.webp" alt="Hibachi grill set up in a backyard" width="1200" height="800" loading="lazy"><span>The yard</span></a>
  <a href="/gallery/"><img src="/media/gallery/party-5.webp" alt="Plated hibachi dinner" width="1200" height="800" loading="lazy"><span>The plate</span></a>
</section>
<section class="band band-plain" id="menu-pricing">
  <div class="wrap">
    <div class="band-head band-head-center">
      <div>
        <p class="eyebrow">Pricing</p>
        <h2>Menu &amp; <em>pricing</em></h2>
      </div>
      <p>Same plate for every guest. Two proteins, salad, fried rice, and vegetables.</p>
    </div>
    <p class="pricing-intro"><strong>$50 per person</strong> · <strong>$25 per child 12 and under</strong> · <strong>$500 minimum</strong>. Gratuity is not included. Cash only. Price may vary by location.</p>
    <div class="price-cards">
      <article class="price-card featured">
        <div class="price-emoji" aria-hidden="true">👨‍👩‍👧‍👦</div>
        <h3>Adults</h3>
        <div class="price-amount">$50</div>
        <div class="price-per">per person</div>
        <ul class="price-includes">
          <li>2 proteins per person</li>
          <li>Salad, fried rice, and vegetables</li>
          <li>Live hibachi show</li>
          <li>The chef brings the grill</li>
        </ul>
      </article>
      <article class="price-card">
        <div class="price-emoji" aria-hidden="true">🧒</div>
        <h3>Kids</h3>
        <div class="price-amount">$25</div>
        <div class="price-per">age 12 and under</div>
        <ul class="price-includes">
          <li>Same menu as adults</li>
          <li>Two proteins included</li>
          <li>Full hibachi show</li>
        </ul>
      </article>
      <article class="price-card">
        <div class="price-emoji" aria-hidden="true">🎉</div>
        <h3>Party minimum</h3>
        <div class="price-amount">$500</div>
        <div class="price-per">every party</div>
        <ul class="price-includes">
          <li>Applies to every booking</li>
          <li>Backyard and home parties</li>
          <li>30 or more adults means two chefs</li>
          <li>Upgrades and sides are extra</li>
        </ul>
      </article>
    </div>
    <p class="pricing-note">Gratuity is not included. Suggested gratuity is 20%. Cash on the day. No deposit. Price may vary by location.</p>
  </div>
</section>
<section class="band band-alt">
  <div class="wrap">
    <div class="band-head band-head-center">
      <div>
        <p class="eyebrow">The menu</p>
        <h2>Proteins, <em>add-ons</em> &amp; more</h2>
      </div>
      <p>Pick two proteins. Add a side or an appetizer if you want more.</p>
    </div>
    <div class="menu-grid">
      <article class="menu-section-card">
        <h3>🥩 Protein choices</h3>
        <p class="menu-section-sub">2 per person</p>
        <p class="menu-prose">Chicken · Steak · Shrimp · Salmon · Tofu</p>
        <p class="menu-prose"><strong>Upgrades:</strong> Scallops +$5 · Filet mignon +$5 · Lobster tail +$15</p>
        <p class="menu-section-sub">Includes</p>
        <p class="menu-prose">Salad, fried rice, and vegetables</p>
        <p class="menu-note">Noodles +$4. Thirty or more adults require two chefs.</p>
      </article>
      <article class="menu-section-card">
        <h3>🍚 Side orders</h3>
        <div class="menu-item"><span>Fried rice</span><span class="menu-item-price">+$4</span></div>
        <div class="menu-item"><span>Noodles</span><span class="menu-item-price">+$4</span></div>
        <div class="menu-item"><span>Chicken, steak, shrimp, scallop, salmon, or tofu</span><span class="menu-item-price">+$10</span></div>
        <div class="menu-item"><span>Filet mignon</span><span class="menu-item-price">+$15</span></div>
        <div class="menu-item"><span>Lobster tail</span><span class="menu-item-price">+$20</span></div>
      </article>
      <article class="menu-section-card">
        <h3>🥟 Appetizers</h3>
        <div class="menu-item"><span>Edamame</span><span class="menu-item-price">$5</span></div>
        <div class="menu-item"><span>Gyoza, pork, chicken, or vegetable</span><span class="menu-item-price">$10</span></div>
      </article>
    </div>
    <p class="pricing-note"><a class="btn" href="/menu/">Full menu</a></p>
  </div>
</section>
<section class="band band-plain"><div class="wrap">
  <div class="band-head band-head-center">
    <div>
      <p class="eyebrow">Book online</p>
      <h2>Book a private chef<br><em>in your city</em></h2>
    </div>
    <p>Select your state, then reserve a date.</p>
  </div>
  ${stateCards()}
</div></section>
<section class="band"><div class="wrap">
  <div class="band-head"><h2>Outdoor hibachi <em>notes</em></h2><a href="/blog/">All posts</a></div>
  ${blogCards(POSTS.slice(0, 3))}
</div></section>
<section class="band"><div class="wrap">
  <div class="band-head"><h2>Before you book</h2><a href="/faq/">All questions</a></div>
  ${faqList(homeFaqs)}
</div></section>`;
  return shell({ title, description, path: "/", image: HERO, extraLd: [faqLd(homeFaqs)], preload: true, main });
}

function cityPage(city) {
  const place = `${city.name}, ${city.abbr}`;
  const title = `Outdoor Hibachi in ${place} | Hibachi King`;
  const description = `${city.lead} $50 per person, $25 for kids 12 and under, $500 minimum.`;
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Locations", path: "/service-area/" }, { name: place, path: `/${city.slug}/` }]);
  const siblings = CITIES.filter((c) => c.id !== city.id && c.abbr === city.abbr);
  const more = siblings.length ? siblings : CITIES.filter((c) => c.id !== city.id).slice(0, 3);
  const localFaqs = [
    [`Do you serve ${city.areas.slice(0, 3).join(", ")}?`, `Yes. Hibachi King cooks around ${city.areas.join(", ")}. The exact address is confirmed when you book ${city.name}.`],
    ...FAQS.slice(0, 4),
  ];
  const main = `${pageIntro(crumb.html, place, `Outdoor hibachi in ${esc(city.name)}`, esc(city.lead))}
<section class="band" style="padding-top:1.5rem"><div class="wrap">
  <figure class="city-photo"><img src="${city.image}" alt="Outdoor hibachi in ${esc(city.name)}" width="1600" height="900"></figure>
  <div class="article-layout">
  <article class="prose">
    ${city.body.map((p) => `<p>${esc(p)}</p>`).join("")}
    <h2>Neighborhoods</h2>
    <p class="link-row">${city.areas.map((a) => `<span>${esc(a)}</span>`).join(" ")}</p>
    <h2>${esc(city.name)} pricing</h2>
    <p>$50 per person, $25 for a child 12 and under, $500 minimum. Gratuity is not included. <a href="/menu/">See the menu</a> or <a href="/estimation/">build an estimate</a>.</p>
    <p>More on <a href="/blog/outdoor-hibachi-catering/">outdoor hibachi catering</a>, <a href="/blog/outdoor-hibachi-cost/">what a party costs</a>, and <a href="/blog/outdoor-hibachi-party/">planning the party</a>.</p>
  </article>
  <aside class="book-panel">
    <p class="eyebrow">Reserve ${esc(city.name)}</p>
    <div class="amount">$50</div>
    <p>Per person. Kids 12 and under are $25. Every party has a $500 minimum.</p>
    <a class="btn" href="/booking/${city.booking}/">Book ${esc(city.name)}</a>
    <a class="btn btn-line" href="tel:${PHONE_TEL}">Call ${PHONE_DISP}</a>
  </aside>
  </div>
</div></section>
<section class="band"><div class="wrap">
  <div class="band-head"><h2>Questions about ${esc(city.name)}</h2></div>
  ${faqList(localFaqs)}
</div></section>
<section class="band"><div class="wrap">
  <div class="band-head"><h2>Nearby</h2></div>
  ${cityCards(more)}
</div></section>`;
  return shell({
    title, description, path: `/${city.slug}/`, image: city.image, geo: city.geo,
    extraLd: [crumb.ld, faqLd(localFaqs), {
      "@type": "Service",
      name: `Outdoor hibachi in ${place}`,
      provider: { "@id": `${SITE}/#business` },
      areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.state } },
      url: `${SITE}/${city.slug}/`,
      offers: { "@type": "Offer", price: "50.00", priceCurrency: "USD", description: "$50 per person, $25 per child 12 and under, $500 minimum. Cash. Gratuity not included." },
    }],
    main,
  });
}

function statePage(state) {
  const cities = state.ids.map((id) => cityById[id]);
  const title = `Outdoor Hibachi in ${state.name} | Hibachi King`;
  const description = state.blurb;
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Locations", path: "/service-area/" }, { name: state.name, path: `/${state.slug}/` }]);
  const main = `${pageIntro(crumb.html, state.abbr, `Outdoor hibachi in ${esc(state.name)}`, "Choose a city, then reserve a date.")}
<section class="band"><div class="wrap">${cityCards(cities)}</div></section>`;
  return shell({ title, description, path: `/${state.slug}/`, extraLd: [crumb.ld], main });
}

function menuPage() {
  const title = "Outdoor Hibachi Menu & Pricing | Hibachi King";
  const description = "Outdoor hibachi menu: $50 per person, $25 for kids 12 and under, $500 minimum. Two proteins, salad, fried rice, and vegetables. Scallops +$5, filet +$5, lobster tail +$15.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Menu", path: "/menu/" }]);
  const row = (name, price) => `<div class="menu-row"><span>${name}</span><span class="price">${price}</span></div>`;
  const main = `${pageIntro(crumb.html, "Menu", "The outdoor hibachi menu", "Two proteins, salad, fried rice, and vegetables are on the plate. Gratuity is not included.")}
<section class="band"><div class="wrap">
  ${pricingBoard()}
  <div class="sheets" style="margin-top:1.5rem">
    <article class="sheet"><h2>Proteins</h2><p class="note">Pick two</p>
      ${row("Chicken", "Included")}${row("Steak", "Included")}${row("Shrimp", "Included")}${row("Salmon", "Included")}${row("Tofu", "Included")}${row("Scallops", "+$5")}${row("Filet mignon", "+$5")}${row("Lobster tail", "+$15")}
    </article>
    <article class="sheet"><h2>Sides</h2>
      ${row("Fried rice", "+$4")}${row("Noodles", "+$4")}${row("Extra protein", "+$10")}${row("Filet mignon side", "+$15")}${row("Lobster tail side", "+$20")}
    </article>
    <article class="sheet"><h2>To start</h2>
      ${row("Edamame", "$5")}${row("Gyoza", "$10")}
      <p class="note">Gyoza is pork, chicken, or vegetable. Thirty or more adults require two chefs. Cash on the day. No deposit.</p>
    </article>
  </div>
</div></section>`;
  return shell({ title, description, path: "/menu/", extraLd: [crumb.ld, { "@type": "Menu", name: "Hibachi King party menu", url: `${SITE}/menu/` }], main });
}

function servicePage() {
  const title = "Outdoor Hibachi Service Areas | Hibachi King";
  const description = "Outdoor hibachi service areas: Austin, Dallas, Fort Worth, Houston, New York, New Jersey, Pennsylvania, Miami, Orlando, and Phoenix.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Locations", path: "/service-area/" }]);
  const main = `${pageIntro(crumb.html, "Locations", "Outdoor hibachi by state", "Six states. Pick one, then book the city. The outdoor hibachi menu is the same everywhere.")}
<section class="band"><div class="wrap">${stateCards()}</div></section>`;
  return shell({ title, description, path: "/service-area/", extraLd: [crumb.ld], main });
}

function bookHub() {
  const title = "Book Outdoor Hibachi Online | Hibachi King";
  const description = "Book outdoor hibachi online. Choose your city, then the calendar. Cash on the day. No deposit.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Book", path: "/book-online/" }]);
  const main = `${pageIntro(crumb.html, "Book", "Book outdoor hibachi", "Choose a state, then a city. A confirmation email follows.")}
<section class="band"><div class="wrap">${stateCards()}</div></section>`;
  return shell({ title, description, path: "/book-online/", extraLd: [crumb.ld], main });
}

function bookingPage(city) {
  const title = `Book Outdoor Hibachi in ${city.name}, ${city.abbr} | Hibachi King`;
  const description = `Reserve outdoor hibachi in ${city.name}, ${city.abbr}. $50 per person, $500 minimum.`;
  const src = scheduleUrl(city.appointmentType);
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Book", path: "/book-online/" }, { name: city.name, path: `/booking/${city.booking}/` }]);
  const main = `${pageIntro(crumb.html, "Reserve", `Book ${esc(city.name)}`, esc(city.lead))}
<section class="band"><div class="wrap">
  <p class="lede">Questions first? Call <a href="tel:${PHONE_TEL}">${PHONE_DISP}</a> or read the <a href="/${city.slug}/">${esc(city.name)} page</a>.</p>
  <iframe class="schedule-frame" title="Schedule Hibachi King in ${esc(city.name)}" src="${src}"></iframe>
</div></section>`;
  return shell({ title, description, path: `/booking/${city.booking}/`, robots: "noindex, follow", extraLd: [crumb.ld], main });
}

function faqPage() {
  const title = "Outdoor Hibachi FAQ | Pricing, Payment, Allergies | Hibachi King";
  const description = "Outdoor hibachi FAQ: $50 per person, $500 minimum, cash on the day, no deposit, outdoor cooking, gluten-free sauces, and tofu for vegetarian guests.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq/" }]);
  const main = `${pageIntro(crumb.html, "FAQ", "Outdoor hibachi questions", "Price, setup, allergies, payment, and how an outdoor hibachi party runs.")}
<section class="band"><div class="wrap">${faqList(FAQS)}</div></section>`;
  return shell({ title, description, path: "/faq/", extraLd: [crumb.ld, faqLd(FAQS)], main });
}

function aboutPage() {
  const title = "About Hibachi King | Outdoor Hibachi Catering";
  const description = "Hibachi King is an outdoor hibachi catering team. Chefs bring a grill to your backyard in Dallas, Austin, and other service cities.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }]);
  const main = `${pageIntro(crumb.html, "About", "Outdoor hibachi, at the house", "Birthdays, weekends, and the kind of dinner that used to require a restaurant.")}
<section class="band"><div class="wrap article-layout">
  <article class="prose">
    <p>Hibachi King is an outdoor hibachi catering service. A chef grills in the yard, with the flames and the plate service of a steakhouse, without the wait for a table.</p>
    <p>Dallas and Austin came first. The same menu now runs in Fort Worth, Houston, New York, New Jersey, Pennsylvania, Miami, Orlando, and Phoenix. Salad, hibachi vegetables, fried rice, and two proteins are on every plate.</p>
    <p>The team is licensed and insured. Cooking stays outside. You keep the guest list and the tables. <a href="/book-online/">Book a date</a> or call <a href="tel:${PHONE_TEL}">${PHONE_DISP}</a>.</p>
  </article>
  <figure class="splash-figure"><img src="/media/gallery/party-2.webp" alt="Hibachi King chef at a backyard party" width="1200" height="800"></figure>
</div></section>`;
  return shell({ title, description, path: "/about/", extraLd: [crumb.ld], main });
}

function contactPage() {
  const title = "Contact Hibachi King | Outdoor Hibachi Catering";
  const description = "Contact Hibachi King about outdoor hibachi catering. Call or text (929) 992-9932 or email Hibachikingus@gmail.com.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]);
  const main = `${pageIntro(crumb.html, "Contact", "Ask about outdoor hibachi", "Birthdays, backyards, and headcounts. The phone is fastest.")}
<section class="band"><div class="wrap contact-layout">
  <div>
    <p class="lede"><a href="tel:${PHONE_TEL}">${PHONE_DISP}</a><br><a href="sms:${PHONE_TEL}">Text message</a><br><a href="mailto:${EMAIL}">${EMAIL}</a><br><a href="${INSTAGRAM}">Instagram @king.hibachi</a></p>
    <p style="margin-top:1rem"><a class="btn" href="/book-online/">Book online</a></p>
  </div>
  <form id="contact-form">
    <div class="two">
      <label class="field"><span>Name</span><input id="c-name" name="name" required></label>
      <label class="field"><span>Phone</span><input id="c-phone" name="phone" required></label>
    </div>
    <label class="field"><span>City</span><input id="c-city" name="city" placeholder="Dallas, Austin, Miami"></label>
    <label class="field"><span>Party details</span><textarea id="c-msg" name="message" rows="5" required placeholder="Date, guest count, and city"></textarea></label>
    <button class="btn" type="submit">Email Hibachi King</button>
  </form>
</div></section>`;
  return shell({ title, description, path: "/contact/", extraLd: [crumb.ld], main });
}

function galleryPage() {
  const title = "Outdoor Hibachi Party Photos | Hibachi King";
  const description = "Photos of outdoor hibachi parties: the grill, the table, and private dinners at home.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery/" }]);
  const items = GALLERY.map(([file, alt], i) => `<button type="button" class="${i === 0 ? "wide" : ""}" data-lightbox="/media/gallery/${file}" data-alt="${esc(alt)}"><img src="/media/gallery/${file}" alt="${esc(alt)}" loading="lazy" width="800" height="600"></button>`).join("");
  const main = `${pageIntro(crumb.html, "Gallery", "Outdoor hibachi parties", "Real setups. More of them live on Instagram.")}
<section class="band"><div class="wrap">
  <div class="frames">${items}</div>
  <p style="margin-top:1.25rem"><a class="btn" href="${INSTAGRAM}">Instagram</a></p>
</div></section>`;
  return shell({ title, description, path: "/gallery/", extraLd: [crumb.ld], main });
}

function stepper(id, label) {
  return `<div class="stepper">
    <button type="button" data-step-target="${id}" data-step-delta="-1" aria-label="Decrease ${esc(label)}">−</button>
    <input type="number" id="${id}" min="0" step="1" value="0" inputmode="numeric" aria-label="${esc(label)}">
    <button type="button" data-step-target="${id}" data-step-delta="1" aria-label="Increase ${esc(label)}">+</button>
  </div>`;
}

function estimationPage() {
  const title = "Outdoor Hibachi Party Cost | Hibachi King";
  const description = "Estimate an outdoor hibachi party: $50 per adult, $25 per child 12 and under, $500 minimum, plus upgrades, noodles, appetizers, and travel.";
  const crumb = crumbs([{ name: "Home", path: "/" }, { name: "Estimate", path: "/estimation/" }]);
  const row = (id, label, price) => `<div class="est-line"><div><strong>${label}</strong><div class="note">${price}</div></div>${stepper(id, label)}</div>`;
  const main = `${pageIntro(crumb.html, "Estimate", "Outdoor hibachi party cost", "We confirm the final price for the address. Gratuity is not included.")}
<section class="band estimate"><div class="wrap estimate-layout">
  <form>
    <h2>Guests</h2>
    ${row("est-adults", "Adults", "$50 each")}
    ${row("est-kids", "Kids 12 and under", "$25 each")}
    <h2 style="margin-top:1.5rem">Upgrades</h2>
    ${row("est-scallop", "Scallops", "+$5")}
    ${row("est-filet", "Filet mignon", "+$5")}
    ${row("est-lobster", "Lobster tail", "+$15")}
    <h2 style="margin-top:1.5rem">Extras</h2>
    ${row("est-extra-protein", "Extra protein", "+$10")}
    ${row("est-noodles", "Noodles", "+$4")}
    ${row("est-edamame", "Edamame", "$5")}
    ${row("est-gyoza", "Gyoza", "$10")}
    <h2 style="margin-top:1.5rem">Travel, if any</h2>
    <div class="chips">
      <button type="button" class="is-active" data-travel-preset="0">$0</button>
      <button type="button" data-travel-preset="50">$50</button>
      <button type="button" data-travel-preset="100">$100</button>
      <button type="button" data-travel-preset="150">$150</button>
      <button type="button" data-travel-preset="200">$200</button>
    </div>
    <label class="field"><span>Custom travel amount</span><input type="number" id="est-travel" min="0" step="5" value="0"></label>
    <button type="button" class="btn btn-line" id="est-reset">Reset</button>
  </form>
  <aside>
    <div class="receipt" id="est-receipt" aria-live="polite"></div>
    <p style="margin-top:0.8rem"><button type="button" class="btn" id="est-copy">Copy estimate</button></p>
  </aside>
</div></section>`;
  return shell({ title, description, path: "/estimation/", extraLd: [crumb.ld], main });
}

function notFound() {
  const title = "Page not found | Hibachi King";
  const main = `<header class="page-intro"><div class="wrap"><h1>That page is gone</h1><p class="lede">Try the menu, a city, or the booking calendar.</p><div class="actions" style="margin-top:1rem"><a class="btn" href="/">Home</a><a class="btn btn-line" href="/book-online/">Book</a></div></div></header>`;
  return shell({ title, description: "Page not found on Hibachi King.", path: "/404.html", robots: "noindex, follow", main });
}

const pages = [
  ["index.html", homePage(), "weekly", "1.0"],
  ["menu/index.html", menuPage(), "monthly", "0.8"],
  ["service-area/index.html", servicePage(), "weekly", "0.8"],
  ["book-online/index.html", bookHub(), "weekly", "0.8"],
  ["faq/index.html", faqPage(), "monthly", "0.7"],
  ["about/index.html", aboutPage(), "monthly", "0.6"],
  ["contact/index.html", contactPage(), "monthly", "0.6"],
  ["gallery/index.html", galleryPage(), "monthly", "0.6"],
  ["estimation/index.html", estimationPage(), "monthly", "0.7"],
  ["blog/index.html", blogIndex(), "weekly", "0.7"],
  ["404.html", notFound(), null, null],
];

for (const city of CITIES) {
  pages.push([`${city.slug}/index.html`, cityPage(city), "monthly", "0.9"]);
  pages.push([`booking/${city.booking}/index.html`, bookingPage(city), null, null]);
}
for (const state of STATES) {
  pages.push([`${state.slug}/index.html`, statePage(state), "monthly", "0.7"]);
}
for (const post of POSTS) {
  pages.push([`blog/${post.slug}/index.html`, blogPost(post), "monthly", "0.6"]);
}

const urls = [];
for (const [rel, html, freq, priority] of pages) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (freq) {
    const loc = rel === "index.html" ? `${SITE}/` : `${SITE}/${rel.replace(/index\.html$/, "")}`;
    urls.push(`  <url><loc>${loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`);
  }
}

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\nAllow: /llms.txt\n`);
fs.writeFileSync(path.join(ROOT, "llms.txt"), `# Hibachi King

Official website for Hibachi King private hibachi catering.

## Canonical Domain
- ${SITE}/

## What We Offer
- Outdoor hibachi catering at your home or backyard.
- Mobile hibachi grill, food, and live cooking show.
- Cities: Austin, Dallas, Fort Worth, Houston, New York, New Jersey, Pennsylvania, Miami, Orlando, Phoenix.

## Pricing
- $50 per person.
- $25 per child 12 and under.
- $500 minimum for every party.
- Gratuity is not included. Suggested gratuity is 20%.
- Price may vary by location.
- Cash only. No deposit. Payment is due the day of the event.
- 30 or more adults require two chefs.

## Primary pages
- Home: ${SITE}/
- Service areas: ${SITE}/service-area/
- Menu: ${SITE}/menu/
- Estimate: ${SITE}/estimation/
- Book: ${SITE}/book-online/
- FAQ: ${SITE}/faq/
- Blog: ${SITE}/blog/
- Contact: ${SITE}/contact/

## Contact
- Phone: +1-929-992-9932
- Email: ${EMAIL}
- Instagram: ${INSTAGRAM}
`);

const redirects = [
  "/about-us /about/ 301",
  "/book-online-austin-texas /booking/austin-tx/ 301",
  "/book-online-dallas-texas /booking/dallas-tx/ 301",
  "/book-online-miami-florida /booking/miami-fl/ 301",
  "/new-york-backyard-catering /new-york-hibachi-at-home/ 301",
  "/new-jersey-backyard-catering /new-jersey-hibachi-at-home/ 301",
  "/culinary-history /about/ 301",
  "/our-seasonal-menu /menu/ 301",
  "/reservations /book-online/ 301",
  "/takeout /menu/ 301",
  "/our-takeout-menu /menu/ 301",
  "/newsletter /contact/ 301",
  "/home-alternate-1 / 301",
  "/restaurant-home-refactor / 301",
  "/sample-page / 301",
  "/bulletin / 301",
  "/reception-bar / 301",
  "/shop / 301",
  "/cart / 301",
  "/checkout / 301",
  "/my-account / 301",
  "/cart-2 / 301",
  "/checkout-2 / 301",
  "/my-account-2 / 301",
];
fs.writeFileSync(path.join(ROOT, "_redirects"), redirects.join("\n") + "\n");

console.log(`Wrote ${pages.length} pages and ${urls.length} sitemap URLs.`);
