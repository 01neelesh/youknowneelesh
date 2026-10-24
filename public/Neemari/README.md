# Neemari

Private B2B botanical catalogue built with HTML5, CSS and vanilla JavaScript. Open `dist/index.html` through a static web server. No install or build step is needed.

## Rotating showcase

`dist/hero.js` owns the five-position component in `#neemari-showcase`; `dist/neemari.css` provides its brand theme and responsive layout.

- Five markers spaced 72° apart; Next rotates counter-clockwise by 72°.
- GSAP transitions the disk, product photograph and copy. Draggable handles desktop rotation; velocity-based release snaps to a 72° position.
- Touch/horizontal pointer swipes use the same snap logic and preserve vertical page scrolling. Narrow viewports use this native swipe path; a native path also remains available without GSAP.
- Autoplay runs every 4.5 seconds; hover, touch interaction and keyboard focus pause it. Leaving an interaction resumes after four seconds where appropriate. A persistent Pause/Play control is provided.
- Reduced-motion preference disables autoplay and motion transitions; manual navigation remains available.
- Off-screen / background tabs stop playback.
- CTAs open the matching product dialog or populate the five-product enquiry builder.

The private site serves vendored GSAP 3.13.0 and Draggable. The single-file delivery in `deliverables/Neemari_Standalone.html` embeds the page, code and images, and includes the requested GSAP/Draggable CDN script tags. Download that HTML and open it in a browser. Network access is used only for those two CDN libraries; native interactions remain available if they do not load.

`deliverables/Neemari_Website_Source.zip` contains editable website source and assets. It excludes Git metadata, hosting identity, credentials, temporary QA pages and source reports.

## Content and privacy

Real photos identify Neelesh Chaturvedi, Deepa and Aasha according to the user's instructions. Campus tree mapping (653, comprising 427 mature and 226 semi-mature trees) is a resource count, not an inventory or yield forecast. The processing journey is team-managed from harvesting to powder and packaging.

Leaves are shade-dried. Saplings need nursery stock confirmation. Seasonal seeds need availability confirmation. Proposed manure/cake remains a development enquiry with no established formulation or available commercial stock. No unverified active-compound level, organic certification, therapeutic/pest-control outcome or nutrient value is asserted.

No enquiry transmission, payment, inventory reservation, analytics or buyer contact is enabled. Requirement drafts remain in the visitor's browser and can be reset. Prices remain conditional catalogue indications. See `SOURCE_NOTES.md` and `QA_NOTES.md`.
