# Verification — 24 October 2026

## Passed

- Desktop layout at 1348 CSS px: no horizontal overflow, all displayed images loaded.
- Responsive browser frames at 320, 390 and 768 px (content widths 305, 375 and 753 px after the browser scrollbar): no document overflow. Phone hero, product dialog, navigation and buyer form visually inspected.
- Product comparison expands and exposes the product requirements table.
- Powder and leaf product dialogs show source-backed specifications and price/availability caveats.
- Keyboard arrow navigation changes product tabs; Escape closes the native dialog.
- Process-stage selector changes the photograph and active description.
- Powder 25 kg at ₹209/kg yields ₹5,225; 12 kg requires a custom quote.
- Leaf 100 kg yields a qualified ₹3,500 indication; mesh is hidden.
- Seed 50 kg flags below-MOQ feasibility; 100 kg yields a qualified ₹4,500 indication.
- Negative quantity blocks brief generation and displays a validation error.
- Buyer brief includes the selected screen, sample preference, destination, tests, commercial exclusions and confirmation items.
- Copy works and generated text was checked in the browser clipboard.
- Draft survives a page reload; Reset restores defaults and clears the prepared output.
- Download produced a non-empty UTF-8 TXT file; content and seed material total were checked locally. The browser event-waiting API timed out after the file had downloaded; the file itself was present and correct.
- JavaScript syntax check, unique static IDs, local anchor links and asset references pass.

## Bounds

Layout checks used Chromium and constrained browser frames, not physical phone hardware. Native print UI and physical printing were not exercised. No external message, stock reservation, payment or buyer contact was performed. Authenticated private hosting is enforced by Sites, not the page's private-preview badge or noindex tag.

Temporary QA frame pages were removed before packaging. Source PDFs, reports, beneficiary records and test downloads are not in the deployed static directory.

## Neemari revision — 24 October 2026

- Corrected site and generated buyer-brief branding to Neemari, using the supplied Canva logo and sampled brand colours.
- Inspected desktop layout at 1348 CSS px and 390/320-px phone frames. The 320 frame has 305 px of content width after its scrollbar. A min-content overflow in the expanded five-product form was identified and corrected; both empty and prepared development briefs now remain within 305 px.
- Desktop Draggable rotation and the narrow-viewport native swipe path were exercised through real pointer drags. Both settle at multiples of 72°; velocity can carry a flick over more than one product.
- Timed autoplay check: leaves advanced to powder after 4.9 seconds. Hover then held powder unchanged through a further 4.9 seconds. Leaving hover resumed to saplings after approximately four seconds.
- Pause/Play, Next and direct pips were exercised. Product text, illustration/photo, marker and matching product details update together.
- Sapling CTA populates the builder and switches the unit to saplings; 2.5 plants is rejected and 25 saplings produces a correctly named brief.
- Manure/cake displays a development status and no commercial price. A development brief download was produced.
- The requested home photograph, campus-tree inset and the three named team portraits were visually inspected. A height overflow on the campus inset was found and corrected.
- Process stage six opens the actual completed sieve photograph in an accessible dialog; Escape closes it.
- Reduced-motion, off-screen/background pausing and native fallback have explicit code paths. Browser preference emulation and physical phone hardware were not used.
- No messages, payments, buyer contacts, public sharing or stock reservations were performed.
- Tablet frame at 768 px (753 px inner width) has no document overflow. Powder at 25 kg still calculates ₹5,225 as a conditional material indication.
- The 10 MB single-file HTML was served independently and exercised in Chromium. Embedded images, GSAP/Draggable from the requested CDN links, matching CTA-to-form selection, brief generation and clipboard branding passed; desktop document width stayed within the viewport.
- Source ZIP excludes temporary QA pages and hosting identity. Temporary preview pages and unreferenced image assets were removed before deployment.
